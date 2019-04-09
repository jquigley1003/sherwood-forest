export interface PetParents {
  firstPetParent?: string;
  secondPetParent?: string;
}

export interface Pet {
  petName?: string;
  animal?: string;
  breed?: string;
  color?: string;
  petParents?: PetParents;
}