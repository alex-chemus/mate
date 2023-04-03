import { FileInfo } from './FileInfo'

export type FullUserPostInfo = {
  id: number,
  authorID: number,
  title: string,
  description: string,
  media: FileInfo[],
  likes: number[],
  likesNumber: number,
  dislikes: number[],
  dislikesNumber: number,
  date: {
    date: string,
    unixTime: number,
    timeZone: string
  },
  lastEditingInfo: {
    date: {
      date: string,
      unixTime: number,
      timeZone: string,
    },
    unixDate: number
  },
  isLiked: boolean,
  isDisliked: boolean
}
