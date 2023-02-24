export type Partner = {
  link: string,
  img?: string,
  id: number
}

export type Subscription = {
  subscribers: {
    users: number[]
  },
  id: number,
  name: string,
  avatar: {
    avatar: string,
    avatarCompressed: string | null,
    avatarShiftX: number,
    avatarShiftY: number,
    avatarScale: number
  }
}
