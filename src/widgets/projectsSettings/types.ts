export type SettingsTab = 'settings' | 'members'

// export type ProjectTab = {
//   id: number,
//   name: string
// }

export type Role = 'founder' | 'administrator' | 'editor' | 'user'

export type Member = {
  avatar: {
    avatar: string,
    avatarCompressed: string,
    avatarShiftX: number,
    avatarShiftY: number,
    avatarScale: number
  }
  firstName: string,
  lastName: string,
  textID: string,
  findcreekID: number,
  role: Role
}

export type ProjectMembers = {
  administrators: number[],
  editors: number[],
  founder: number | null
}
