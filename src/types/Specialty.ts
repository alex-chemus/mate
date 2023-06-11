export type Specialty = {
  id: number,
  rusName: string,
  engName: string
}

export type SpecialtiesList = {
  id: number,
  rusName: string,
  engName: string,
  specialties: Specialty[]
}[]
