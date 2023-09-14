import { FileInfo, Comment, Avatar } from "@/shared/types"

type Date = {
  date: string,
  unixTime: number,
  timeZone: string
}

export type ProjectPost = {
  id: number,
  projectID: number,
  authorID: number,
  description: string,
  media: FileInfo[],
  likes: number[],
  likesNumber: number,
  dislikes: number,
  dislikesNumber: number,
  date: Date,
  lastEditingInfo: {
    userID: number,
    date: Date
  },
  isLiked: boolean,
  isDisliked: boolean,
  comments: Comment[],
  projectData: {
    id: number,
    textID: string,
    name: string,
    avatar: Avatar,
    profileCover: string,
    slogan: string,
    isSubscribed: boolean
  },
  postType: 'projectPost'
}

export type UserPost = {
  id: number,
  authorID: number,
  title: string,
  description: string,
  media: FileInfo[],
  likes: number[],
  likesNumber: number,
  dislikes: number[],
  dislikesNumber: number,
  date: Date,
  lastEditingInfo: {
    date: Date,
    unixDate: number
  },
  isLiked: boolean,
  isDisliked: boolean,
  comments: Comment[],
  authorData: {
    profileCover: string,
    findcreekID: number,
    isSubscribed: boolean,
    firstName: string,
    lastName: string,
    patronymic: string,
    textID: string,
    avatar: Avatar
  },
  postType: 'userPost'
}

