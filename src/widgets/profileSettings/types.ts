export type AccountInfo = {
  firstName: string,
  lastName: string,
  avatar: {
    avatar: string,
    avatarCompressed: string,
    avatarShiftX: number,
    avatarShiftY: number,
    avatarScale: number
  },
  email: string
}

export type Tab = 'general' | 'profile' | 'project' | 'privacy'
