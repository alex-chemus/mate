import { FileInfo } from './FileInfo'

export type ReplyInfo = {
  id: number,
  authorID: number,
  postType: 'user' | 'project',
  postID: number,
  answerToCommentID: number,
  rootCommentID: number,
  text: string,
  media: FileInfo[],
  likes: number[],
  likesNumber: number,
  dislikes: number[],
  dislikesNumber: number,
  date: {
    date: string,
    unixTime: number,
    timezone: string
  },
  answersNumber: number,
  isLiked: boolean,
  isDisliked: boolean,
  authorData: {
    findcreekID: number,
    firstName: string,
    lastName: string,
    avatar: {
      avatar: string,
      avatarCompressed: string,
      avatarShiftX: number,
      avatarShiftY: number,
      avatarScale: number
    },
    textID: string
  }
}
