import { FormProps } from 'antd';
import { MemberValue, TransformedMember } from '@modules/projects/types';

export const transformProjectFormValues = (values: any): any => {
  const transformedValues = { ...values };

  if (Array.isArray(transformedValues.members)) {
    transformedValues.members = transformedValues.members
      .filter((m: MemberValue) => m && m.userId && m.role)
      .map(
        (m: MemberValue): TransformedMember => ({
          userId: Number(m.userId),
          role: m.role as string,
          isActive: m.isActive !== false,
        }),
      );
  } else {
    transformedValues.members = [];
  }

  return transformedValues;
};

export const augmentProjectFormProps = (formProps: FormProps): FormProps => {
  const { onFinish, initialValues, ...restFormProps } = formProps;

  const handleFinish = async (values: any) => {
    const transformedValues = transformProjectFormValues(values);
    if (onFinish) {
      await onFinish(transformedValues);
    }
  };

  const augmentedInitialValues = initialValues
    ? {
        ...initialValues,
        members: (() => {
          if (!initialValues.members || initialValues.members.length === 0) {
            return [{ isActive: true }];
          }
          return initialValues.members.map((m: any) => {
            const userId = m.userId || (m.user ? Number(m.user.id) : undefined);
            return {
              userId,
              role: m.role,
              isActive: m.isActive !== false,
            };
          });
        })(),
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
