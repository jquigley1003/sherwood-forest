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

export interface SpousePartner {
  firstName?: string;
  lastName?: string;
  uid?: string;
}

export interface Roles {
  nonMember?: boolean;
  pendingMember?: boolean;
  approvedMember?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  displayName: DisplayName;
  // displayName?: string;
  address?: Address;
  photoURL?: string;
  phone?: number;
  email?: string;
  birthDate?: Date;
  occupation?: string;
  duesPaid?: boolean;
  roles?: Roles;
  residentSince?: Date;
  spousePartner?: SpousePartner;
}