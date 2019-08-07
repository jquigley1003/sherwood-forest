export interface DisplayName {
  firstName?: string;
  lastName?: string;
}

export interface JuniorResident {
  displayName?: DisplayName;
  age?: number;
  parents?: string[];
}