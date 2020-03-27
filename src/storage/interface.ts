import * as fs from 'fs'

export interface StorageProvider{
    upload(readStream: fs.ReadStream, originalName: string): Promise<File>,
    delete(file: File): Boolean,
    find(fileId: string): File,
    stream(fileName: string): fs.ReadStream
}

export type File = {
    name: string,
    fileName: string,
    id: string,
    type: string
}
