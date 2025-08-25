type Nullable<T> = T | null;

export interface Branch {
  // Primary & scalar fields
  id: number;
}

export interface Contract {
  // Primary & scalar fields
  id: number;
}

export interface ICustomer {
  id: number;
  companyName: string;
  registeredAddress: Nullable<string>;
  legalNoticeEmail: Nullable<string>;
  phone: Nullable<string>;
  defaultOperationalEmail: Nullable<string>;
  defaultEscalationEmail: Nullable<string>;
  registrationNumber: Nullable<string>;
  businessType: Nullable<string>;
  registrationDate: Nullable<Date>;
  registeredCapital: Nullable<number>;
  companyStatus: Nullable<string>;
  mainActivity: Nullable<string>;
  legalId: Nullable<string>;
  legalStatus: Nullable<string>;
  companyCode: Nullable<string>;
  companyType: Nullable<string>;
  companyDescription: Nullable<string>;
  cityRegion: Nullable<string>;
  authorizedRepresentative: Nullable<string>;
  companyRole: Nullable<string>;
  sectorPrimary: Nullable<string>;
  sectorSecondary: Nullable<string>;
  clientStatus: Nullable<string>;
  preferredCommunicationLanguage: Nullable<string>;

  branches?: Branch[];
  Contract?: Contract[];
}
