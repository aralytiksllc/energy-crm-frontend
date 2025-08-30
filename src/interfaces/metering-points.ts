// External

// Internal

export interface IMeteringPoint {
  id: number;

  deliveryAddress?: string;

  locationAddress?: string;

  cityOrLocality?: string;

  country?: string;

  tariffGroup?: string;

  technicalContactName?: string;

  technicalContactTitle?: string;

  technicalContactPhone?: string;

  technicalContactEmail?: string;

  contractedCapacityValue?: number;

  contractedCapacityUnit?: string;

  voltageLevel?: string;

  meterType?: string;

  connectionSpecs?: string;

  agreedMaxDemandKw?: number;

  notes?: string;

  meteringPointStatus?: string;

  utilityProvider?: string;

  gpsCoordinates?: string;

  registeredAddress?: string;

  operationalStatus?: string;

  installationDate?: Date;

  contractEndDate?: Date;

  branchId?: number;
}
