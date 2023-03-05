import { SocialMedia } from './SocialMedia'
import { AvatarInfo } from './AvatarInfo'

export type FullAccountInfo = {
  findcreekID: number,
  roles: ('user' | 'admin' | 'active_person')[],
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
  subscriptions: {
    users: number[],
    projects: number[]
  },
  subscriptionsNumber: number,
  subscribers: {
    users: number[]
  },
  projectsManagement: {
    founder: number[],
    administrator: number[],
    editor: number[]
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
  firstName: string,
  lastName: string,
  patronymic: string,
  textID: string,
  email: string,
  avatar: AvatarInfo,
  birthday: string,
  accountBanned: boolean,
  accountDeleted: boolean,
  sex: 1 | 2,
  registrationDate: string
}
