import { SocialMedia } from './SocialMedia'
import { FullProductInfo } from './FullProductInfo'
import { AvatarInfo } from './AvatarInfo'

export type FullProjectInfo = {
  id: number,
  founderID: number,
  textID: string,
  name: string,
  avatar: AvatarInfo,
  profileCover: {
    profileCover: string,
    profileCoverCompressed: string,
    profileCoverShiftX: number,
    profileCoverShiftY: number,
    profileCoverScale: number
  },
  slogan: string,
  description: string,
  contacts: {
    emailAddress: {
      id: number,
      emailAddress: string
    }[],
    phoneNumbers: {
      phoneNumber: string,
      id: number
    }[],
    socialNetworks: SocialMedia[]
  },
  subscribers: number[],
  subscribersNumber: number,
  partners: number[],
  foundationDate: string,
  products: FullProductInfo[],
  links: string[],
  administrators: number[],
  editors: number[],
  themeID: number,
  isSubscribed: boolean
}
