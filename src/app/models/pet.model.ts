export interface Address {
  streetNumber?: string;
  streetName?: string;
  subAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface Pet {
  petName?: string;
  animal?: string;
  breed?: string;
  color?: string;
  age?: number;
  address?: Address;
  petParents?: string[];
  petParentIDs?: string[];
}