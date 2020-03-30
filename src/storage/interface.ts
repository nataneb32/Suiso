import * as fs from 'fs'

export interface StorageProvider{
    upload(readStream: fs.ReadStream): Promise<File>,
    delete(fileName: string): Boolean,
    find(fileName: string): File,
    stream(fileName: string): fs.ReadStream
}

export type File = {
    name: string,
    fileName: string,
    id: string,
    type: string
}
