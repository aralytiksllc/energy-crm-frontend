export enum Stage {
  LEAD = 'LEAD',
  QUALIFIED = 'QUALIFIED',
  PROPOSAL = 'PROPOSAL',
  NEGOTIATION = 'NEGOTIATION',
  CLOSED_WON = 'CLOSED_WON',
  CLOSED_LOST = 'CLOSED_LOST',
}

export enum FunctionalArea {
  AREA1 = 'AREA1',
  AREA2 = 'AREA2',
}

export interface IUser {
  id: number;
  name: string;
}

export interface ITask {
  id: number;
  title: string;
}

export interface IDocument {
  id: number;
  name: string;
}

export interface INote {
  id: number;
  content: string;
}

export interface IProject {
  id: number;
  name: string;
  stage: Stage;
  functionalArea: FunctionalArea;
  toPlan?: boolean;
  commercialRegion?: string;
  commercialCountry?: string;
  customerType?: string;
  customerDetails?: {
    address?: string;
    name?: string;
    contact?: string;
  };
  pWin?: number;
  pGo?: number;
  totalContractValue?: number;
  division?: string;
  expectedRfpDate?: Date;
  expectedRfqDate?: Date;
  expectedSubmissionDate?: Date;
  expectedAwardDate?: Date;
  expectedContractStartDate?: Date;
  description?: string;
  owner?: IUser;
  ownerId?: number;
  createdBy?: IUser;
  createdById?: number;
  tasks?: ITask[];
  documents?: IDocument[];
  notes?: INote[];
  createdAt?: Date;
  updatedAt?: Date;
}
