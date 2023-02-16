export type SocialMedia = {
  id: number,
  url: string,
  service: string,
  user: string,
  logo?: string
}

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
  avatar: {
    avatar: string,
    avatarCompressed: string,
    avatarShiftX: number,
    avatarShiftY: number,
    avatarScale: number
  },
  birthday: string,
  accountBanned: boolean,
  accountDeleted: boolean,
  sex: 1 | 2,
  registrationDate: string
}

export type FullProductInfo = {
  id: number,
  name: string,
  description: string,
  image: string,
  link: string,
  creatorID: number | null,
  creationDate: string,
  lastEditor: null | number,
  lastEditDate: string
}

export type FullProjectInfo = {
  id: number,
  founderID: number,
  textID: string,
  name: string,
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
  slogan: string,
  description: string,
  // contacts: {
  //   findcreek: string,
  //   [index: string]: string,
  // },
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
  themeID: number
}

export type FileInfo = {
  ownerID: number,
  fileName: string,
  serverFileName: string,
  additionalData: {
    fileFormal: string,
    fileExtension: string,
    fileSize: number,
    fileType: string,
    uploadDate: string,
    urlToFile: string,
    fileStatus: string
  },
  fileID: number
}

export type Specialty = {
  id: number,
  rusName: string,
  engName: string
}

export type SpecialtiesList = {
  id: number,
  rusName: string,
  engName: string,
  specialties: Specialty[]
}[]

export type Location = {
  endpointName: string,
  countryID: number,
  regionID: number,
  cityID: number
}
