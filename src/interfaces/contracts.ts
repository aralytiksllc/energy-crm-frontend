// External

// Internal
import { ICustomer } from './customers';

export interface IContract {
  id: number;

  contractNumber: string;

  effectiveDate?: Date;

  supplyStartDate?: Date;

  initialTermYears?: number;

  maturityDate?: Date;

  renewalTermYears?: number;

  contractQuantity?: string;

  pricePerMwh?: number;

  includesNetworkTariffs?: boolean;

  includesVat?: boolean;

  paymentTermsDays?: number;

  securityDepositAmount?: number;

  terminationNoticeDays?: number;

  earlyTerminationFee?: string;

  disputeResolutionMethod?: string;

  forecastDeadlineDaysBeforeMonth?: number;

  customerId?: number;

  customer?: ICustomer;
}
