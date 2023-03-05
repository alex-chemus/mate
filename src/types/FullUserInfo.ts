import { SocialMedia } from './SocialMedia'
import { AvatarInfo } from './AvatarInfo'

export type FullUserInfo = {
  findcreekID: number,
  roles: string[],
  address: {
    countryID: number,
    countryRusName: string,
    countryEngName: string,
    regionID: number,
    regionRusName: string,
    regionEngName: string,
    cityID: number,
    cityRusName: string,
    cityEngName: string,
  },
  online: {
    lastOnlineDate: number,
    online: boolean
  },
  contacts: {
    emailAddresses: {
      id: number,
      emailAddress: string
    }[],
    phoneNumbers: {
      id: number,
      phoneNumber: string
    }[],
    socialNetworks: SocialMedia[]
  },
  bio: string,
  profileCover: string,
  specialties: {
    id: number,
    rusName: string,
    engName: string
  }[],
  skills: string,
  subscriptions: {
    users: number[],
    projects: number[],
  },
  subscriptionsNumber: number,
  subscribers: {
    users: number[]
  },
  subscribersNumber: number,
  projectsManagement: {
    founder: number[],
    administrator: number[],
    editor: number[]
  },
  isSubscribed: boolean,
  firstName: string,
  lastName: string,
  patronymic: string,
  textID: string,
  avatar: AvatarInfo,
  birthday: string,
  accountBanned: boolean,
  accountDeleted: boolean,
  sex: 1 | 2,
  registrationDate: string
}
