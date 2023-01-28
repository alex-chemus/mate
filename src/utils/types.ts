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
  projectsMember: number[],
  projectsSubscriber: number[],
  contacts: {
    email: string,
    phone: string,
    social: {
      findcreek: string,
      [index: string]: string
    }
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
  additionalData: {
    birthday: string,
    banned: boolean,
    deleted: boolean,
    sex: 1 | 2,
    registrationDate: string
  }
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
