import { ReadStream } from 'fs'
import { FileUpload } from 'graphql-upload'

export type ICourse = {
    name: string,
    thumbnail: ReadStream,
    sellerId: number,
    price: number,
    description: string
}

function isFileUpload (file: Promise<FileUpload>| ReadStream): file is Promise<FileUpload> {
  return (<Promise<FileUpload>>file).then !== undefined
}

export async function createCourseObject (
  { name, thumbnail, sellerId, price, description }:{name: string, thumbnail: ReadStream | Promise<FileUpload>, sellerId: number, price: number, description: string }
): Promise<ICourse> {
  if (isFileUpload(thumbnail)) {
    const file = await thumbnail
    return <ICourse>{ name, thumbnail: file.createReadStream(), sellerId, price, description }
  } else {
    return <ICourse>{ name, thumbnail, sellerId, price, description }
  }
}
