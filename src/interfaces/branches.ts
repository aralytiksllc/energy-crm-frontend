export interface IBranch {
  id: number;

  branchName: string;

  peakLoadKw?: number;

  weatherDataLinkage?: string;

  customerId: number;
}
