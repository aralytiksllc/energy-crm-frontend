// External

// Internal
import { IBranch } from './branches';
import { IContract } from './contracts';

export enum Stage {
  LEAD = 'LEAD',
  QUALIFIED = 'QUALIFIED',
  PROPOSAL = 'PROPOSAL',
  NEGOTIATION = 'NEGOTIATION',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST',
}

export interface ICustomer {
  id: number;

  companyName: string;

  registeredAddress?: string;

  legalNoticeEmail?: string;

  phone?: string;

  defaultOperationalEmail?: string;

  defaultEscalationEmail?: string;

  registrationNumber?: string;

  businessType?: string;

  registrationDate?: Date;

  registeredCapital?: number;

  companyStatus?: string;

  mainActivity?: string;

  legalId?: string;

  legalStatus?: string;

  companyCode?: string;

  companyType?: string;

  companyDescription?: string;

  cityRegion?: string;

  authorizedRepresentative?: string;

  companyRole?: string;

  sectorPrimary?: string;

  sectorSecondary?: string;

  clientStatus?: string;

  preferredCommunicationLanguage?: string;

  branches?: IBranch[];

  Contract?: IContract[];
}
