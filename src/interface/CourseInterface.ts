import { ReadStream } from 'fs'
import { FileUpload } from 'graphql-upload'

export type ICourse = {
    name: string,
    thumbnail: ReadStream,
    sellerId: number,
    price: number,
    description: string
}

function isFileUpload (file: FileUpload | ReadStream): file is FileUpload {
  return (<FileUpload>file).filename !== undefined
}

export function createCourseObject (
  { name, thumbnail, sellerId, price, description }:
    {name: string, thumbnail: ReadStream | FileUpload, sellerId: number, price: number, description: string}): ICourse {
  if (isFileUpload(thumbnail)) {
    return <ICourse>{ name, thumbnail: thumbnail.createReadStream(), sellerId, price, description }
  } else {
    return <ICourse>{ name, thumbnail, sellerId, price, description }
  }
}
