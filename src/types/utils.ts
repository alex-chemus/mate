export type ExcludeProperties<T, U> = {
  [Property in Exclude<keyof T, U>]: T[Property]
}
