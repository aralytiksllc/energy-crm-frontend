import { IMeteringPoint } from './metering-points';
import { IContract } from './contracts';

export interface IConsumptionFile {
  id: number;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  description?: string | null;

  consumptions: IConsumption[];
}

export interface IConsumption {
  id: number;
  timestamp: Date;
  timeframe: string;
  electricityConsumptionKwh?: string | null;

  meteringPointId: number;
  contractId?: number | null;
  consumptionFileId?: number | null;

  meteringPoint: IMeteringPoint;
  contract?: IContract;
  consumptionFile?: IConsumptionFile;
}
