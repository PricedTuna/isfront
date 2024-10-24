export interface Wrapper<T>{
  responseCode: number
  result: T[] | null
  message: string
}