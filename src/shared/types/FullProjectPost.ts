import { FileInfo } from './FileInfo'

export type FullProjectPost = {
  id: number,
  projectID: number,
  authorID: number,
  // title: string,
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
    userID: number,
    date: {
      date: string,
      unixTime: number,
      timeZone: string,
    },
    unixDate: number
  },
  isLiked: boolean,
  isDisliked: boolean,
  comments: any[]
}
