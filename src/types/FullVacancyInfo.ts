import { FileInfo } from './FileInfo'

export type FullVacancyInfo = {
  id: number,
  title: string,
  description: string,
  media: FileInfo[],
  skills: string,
  themeID: number,
  projectID: number,
  date: {
    date: string,
    unixTime: number,
    timeZone: string
  },
  views: number[],
  viewsNumber: number,
  likes: number[],
  likesNumber: number,
  lastEditingInfo: {
    userID: number,
    date: {
      date: string,
      unixTime: number,
      timeZone: string
    },
    unixDate: number
  },
  isLiked: false,
  themeName: string,
  isViewed: boolean
}
