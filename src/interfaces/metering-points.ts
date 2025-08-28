// External
import { Nullable } from './common';

// Internal

export interface IMeteringPoint {
  id: number;
  deliveryAddress: Nullable<string>;
  locationAddress: Nullable<string>;
  cityOrLocality: Nullable<string>;
  country: Nullable<string>;
  tariffGroup: Nullable<string>;
  technicalContactName: Nullable<string>;
  technicalContactTitle: Nullable<string>;
  technicalContactPhone: Nullable<string>;
  technicalContactEmail: Nullable<string>;
  contractedCapacityValue: Nullable<number>;
  contractedCapacityUnit: Nullable<string>;
  voltageLevel: Nullable<string>;
  meterType: Nullable<string>;
  connectionSpecs: Nullable<string>;
  agreedMaxDemandKw: Nullable<number>;
  notes: Nullable<string>;
  meteringPointStatus: Nullable<string>;
  utilityProvider: Nullable<string>;
  gpsCoordinates: Nullable<string>;
  registeredAddress: Nullable<string>;
  operationalStatus: Nullable<string>;
  installationDate: Nullable<Date>;
  contractEndDate: Nullable<Date>;
  branchId: Nullable<number>;
}
