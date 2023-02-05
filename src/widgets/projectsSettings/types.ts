export type SettingsTab = 'settings' | 'members'

// export type ProjectTab = {
//   id: number,
//   name: string
// }

export type Member = {
  avatar?: string,
  fullName: string,
  textID: string,
  findcreekID: number,
  role: 'founder' | 'administrator' | 'editor'
}

export type ProjectMembers = {
  administrators: number[],
  editors: number[],
  founder: number | null
}
