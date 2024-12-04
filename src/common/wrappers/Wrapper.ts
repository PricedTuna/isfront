export interface Wrapper<T>{
  statusCode: number
  result: T[] | null
  message: string
}