export interface MemberValue {
  userId?: number;
  role?: string;
  isActive?: boolean;
}

export interface TransformedMember {
  userId: number;
  role: string;
  isActive: boolean;
}
