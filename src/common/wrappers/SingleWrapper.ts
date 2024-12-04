export interface SingleWrapper<T>{
  statusCode: number
  result: T | null
  message: string
}