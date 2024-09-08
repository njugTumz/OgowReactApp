// types.ts
export interface HealthFacility {
    id?: number;
    name: string;
    district: string;
    region: string;
    state: string;
    country: string;
  }
  
  export interface FacilityFData  {
    id?: number;
    name: string;
    district: string;
    region: string;
    state: string;
    country: string;
  }

  // models/types.ts
export interface HealthWorker {
  id: number;
  name: string;
  designation: string;
  email: string;
  phoneNumber: string;
  healthFacilityId: number;
  healthFacilityName?: string;
}

// models/types.ts
export interface Patient {
  id: number;
  name: string;
  gender: string;
  address: string;
  healthFacilityId: number;
}


  