export interface SingleWrapper<T>{
  responseCode: number
  result: T | null
  message: string
}