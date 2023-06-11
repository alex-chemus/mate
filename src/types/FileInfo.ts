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
