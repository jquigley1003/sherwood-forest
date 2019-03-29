export interface Roles {
  pendingMember?: boolean;
  approvedMember?: boolean;
  admin?: boolean;
}

export interface User {
  uid: string;
  displayName?: string;
  photoURL?: string;
  email: string;
  roles: Roles;
}