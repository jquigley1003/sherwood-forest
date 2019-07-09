export interface DisplayName {
  firstName?: string;
  lastName?: string;
}

export interface JuniorResident {
  displayName?: DisplayName;
  birthDate?: Date;
  parents?: string[];
}