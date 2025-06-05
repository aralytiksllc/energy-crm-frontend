export interface IAuditable {
  createdAt: Date;

  createdById: string | null;

  updatedAt: Date;

  updatedById: string | null;
}
