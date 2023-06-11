import { FileInfo } from './FileInfo'
import { ReplyInfo } from './ReplyInfo'

export type CommentInfo = {
  id: number,
  authorID: number,
  postType: 'user' | 'project',
  postID: number,
  answerToCommentID: 0,
  rootCommentID: 0,
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
  },
  answers?: ReplyInfo[],
}
