import { SocialMedia } from './SocialMedia'
import { FullProduct } from './FullProduct'
import { Avatar } from './Avatar'

export type FullProject = {
  id: number,
  founderID: number,
  textID: string,
  name: string,
  avatar: Avatar,
  // profileCover: {
  //   profileCover: string,
  //   profileCoverCompressed: string,
  //   profileCoverShiftX: number,
  //   profileCoverShiftY: number,
  //   profileCoverScale: number
  // },
  profileCover: string,
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
  products: FullProduct[],
  links: string[],
  administrators: number[],
  editors: number[],
  themeID: number,
  isSubscribed: boolean
}
