export type FullProduct = {
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
