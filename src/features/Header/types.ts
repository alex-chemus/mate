import { Specialty } from '@/shared/types'

// временный тип, с появлением api переделаю
export type Notice = {
  // что сделал (подписался, запрос на проект, присоединился к проекту)
  type: 'subscribed' | 'joined' | 'request'
  // человек, просто имя
  person: string,
  personAvatar?: string,
  // объект оповещения (юзер или его проект)
  subject: string
  subjectUrl: string,
  date: string
}

export type Account = {
  firstName: string,
  lastName: string,
  avatar: {
    avatar: string,
    avatarCompressed: string,
    avatarShiftX: number,
    avatarShiftY: number,
    avatarScale: number
  },
  email: string,
  findcreekID: number
}

export type Tab = 'profile' | 'vacancies' | 'projects' | null

// export type SearchItem = {
//   avatar?: string;
//   fullName: string,
//   textID: string,
//   description: string,
//   banner?: string,
//   id: number
// }

type SearchUserFields = {
  findcreekID: number,
  firstName: string,
  lastName: string,
  bio: string,
  profileCover: string,
  specialties: Specialty[],
  textID: string,
  avatar: {
    avatar: string,
    avatarCompressed: string,
    avatarShiftX: number,
    avatarShiftY: number,
    avatarScale: number
  },
  isSubscribed: boolean
}

type SearchProjectFields = {
  name: string,
  textID: string,
  avatar: {
    avatar: string,
    avatarCompressed: string,
    avatarShiftX: number,
    avatarShiftY: number,
    avatarScale: number
  },
  profileCover: {
    profileCover: string,
    profileCoverCompressed: string,
    profileCoverShiftX: number,
    profileCoverShiftY: number,
    profileCoverScale: number
  },
  description: string,
  id: number,
  isSubscribed: boolean
}

export type SearchItem = SearchUserFields | SearchProjectFields

export type KeyedUserFields = SearchUserFields & {
  searchID: number
}

export type KeyedProjectFields = SearchProjectFields & {
  searchID: number
}

export type KeyedSearchItem = KeyedUserFields | KeyedProjectFields

export type SearchFilters = 'users' | 'projects'
