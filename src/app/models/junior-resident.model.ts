export interface DisplayName {
  firstName?: string;
  lastName?: string;
}
export interface Address {
  streetNumber?: string;
  streetName?: string;
  subAddress?: string;
  city?: string;
  state?: string;
  zipCode?: string;
}

export interface JuniorResident {
  displayName?: DisplayName;
  address?: Address;
  age?: number;
  parents?: string[];
  parentIDs?: string[];
}