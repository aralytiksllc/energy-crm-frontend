import { FormProps } from 'antd';

interface MemberValue {
  userId?: string | number;
  role?: string;
  isActive?: boolean;
}

interface TransformedMember {
  userId: number;
  role: string;
  isActive: boolean;
}

interface ProjectFormValues {
  name?: string;
  customerId?: string | number;
  startDate?: string;
  deadline?: string;
  budget?: string | number;
  progress?: string | number;
  status?: string;
  priority?: string;
  isArchived?: boolean;
  isPrivate?: boolean;
  members?: MemberValue[];
  [key: string]: any;
}

interface TransformedProjectValues {
  name: string;
  customerId: number;
  startDate: string;
  deadline?: string;
  budget?: number;
  progress: number;
  status: string;
  priority: string;
  isArchived: boolean;
  isPrivate: boolean;
  members?: TransformedMember[];
  [key: string]: any;
}

const DEFAULT_VALUES = {
  status: 'NotStarted',
  priority: 'Medium',
  progress: 0,
  isArchived: false,
  isPrivate: false,
} as const;

const REQUIRED_FIELDS = ['name', 'customerId', 'startDate'] as const;

const cleanEmptyValues = (values: Record<string, any>): Record<string, any> => {
  const cleaned = { ...values };

  Object.keys(cleaned).forEach((key) => {
    if (cleaned[key] === undefined || cleaned[key] === '') {
      delete cleaned[key];
    }
  });

  return cleaned;
};

const validateRequiredFields = (values: Record<string, any>): void => {
  REQUIRED_FIELDS.forEach((field) => {
    if (!values[field]) {
      throw new Error(`${field} is required`);
    }
  });
};

const transformNumericField = (
  value: string | number | undefined,
  fieldName: string,
  options: { min?: number; max?: number } = {},
): number | undefined => {
  if (value === undefined) return undefined;

  const numValue = Number(value);

  if (isNaN(numValue)) {
    throw new Error(`Invalid ${fieldName}`);
  }

  if (options.min !== undefined && numValue < options.min) {
    throw new Error(`${fieldName} must be at least ${options.min}`);
  }

  if (options.max !== undefined && numValue > options.max) {
    throw new Error(`${fieldName} must be at most ${options.max}`);
  }

  return numValue;
};

const transformDateField = (
  dateValue: string | undefined,
): string | undefined => {
  if (!dateValue) return undefined;

  const date = new Date(dateValue);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }

  return date.toISOString();
};

const transformMembers = (
  members: MemberValue[] | undefined,
): TransformedMember[] => {
  if (!Array.isArray(members)) return [];

  return members
    .filter((member) => member?.userId && member?.role)
    .map((member) => ({
      userId: Number(member.userId),
      role: member.role,
      isActive: member.isActive !== false,
    }));
};

const applyDefaultValues = (
  values: Record<string, any>,
): Record<string, any> => {
  const result = { ...values };

  Object.entries(DEFAULT_VALUES).forEach(([key, defaultValue]) => {
    if (result[key] === undefined) {
      result[key] = defaultValue;
    }
  });

  return result;
};

export const transformProjectFormValues = (
  values: ProjectFormValues,
): TransformedProjectValues => {
  const cleanedValues = cleanEmptyValues(values);

  validateRequiredFields(cleanedValues);

  const transformedValues = { ...cleanedValues };

  // Transform numeric fields
  transformedValues.customerId = transformNumericField(
    transformedValues.customerId,
    'customerId',
    { min: 1 },
  )!;

  if (transformedValues.budget !== undefined) {
    transformedValues.budget = transformNumericField(
      transformedValues.budget,
      'budget',
      { min: 0 },
    );
  }

  if (transformedValues.progress !== undefined) {
    transformedValues.progress = transformNumericField(
      transformedValues.progress,
      'progress',
      { min: 0, max: 100 },
    );
  }

  // Transform date fields
  transformedValues.startDate = transformDateField(
    transformedValues.startDate,
  )!;

  if (transformedValues.deadline) {
    transformedValues.deadline = transformDateField(transformedValues.deadline);
  }

  // Transform members
  const transformedMembers = transformMembers(transformedValues.members);
  if (transformedMembers.length > 0) {
    transformedValues.members = transformedMembers;
  } else {
    delete transformedValues.members;
  }

  // Apply default values
  const finalValues = applyDefaultValues(transformedValues);

  return finalValues as TransformedProjectValues;
};

const createInitialMembers = (existingMembers?: any[]): MemberValue[] => {
  if (!existingMembers || existingMembers.length === 0) {
    return [{ isActive: true }];
  }

  return existingMembers.map((member) => ({
    userId: member.userId || (member.user ? Number(member.user.id) : undefined),
    role: member.role,
    isActive: member.isActive !== false,
  }));
};

export const augmentProjectFormProps = (formProps: FormProps): FormProps => {
  const { onFinish, initialValues, ...restFormProps } = formProps;

  const handleFinish = async (values: ProjectFormValues): Promise<void> => {
    const transformedValues = transformProjectFormValues(values);

    if (onFinish) {
      await onFinish(transformedValues);
    }
  };

  const augmentedInitialValues = initialValues
    ? {
        ...initialValues,
        members: createInitialMembers(initialValues.members),
      }
    : {
        members: [{ isActive: true }],
      };

  return {
    ...restFormProps,
    onFinish: handleFinish,
    initialValues: augmentedInitialValues,
  };
};
