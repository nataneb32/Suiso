import { StorageProvider, File } from './interface'
import * as fs from 'fs'
import * as path from 'path'
import { Media } from '../entity/Media'
import { getRepository } from 'typeorm'

class LocalStorageProvider implements StorageProvider {
    private storagePath: string;
    constructor (storagePath: string) {
      this.storagePath = storagePath
    }

    private generateRandomName (size: number) {
      var result = []
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (var i = 0; i < size; i++) {
        result[i] = characters[Math.floor(Math.random() * characters.length)]
      }
      return result.join('')
    }

    public async upload (readStream: fs.ReadStream): Promise<File> {
      const type = path.extname(<string>readStream.path)
      const mediaToken = this.generateRandomName(20)
      const fileName = `${mediaToken}${type}`
      const writeStream = fs.createWriteStream(path.join(this.storagePath, fileName))
      readStream.pipe(writeStream)
      await writeStream.close()

      // create a image on database
      const media = new Media()
      media.name = path.basename(<string>readStream.path)
      media.type = type.replace('.', '')
      media.fileName = fileName
      await getRepository(Media).save(media)

      return <File>{
        name: '',
        fileName: '',
        id: '',
        type: ''
      }
    }

    public delete (file: File) {
      return false
    }

    public find (fileId: string): File {
      return null
    }

    public stream (file): fs.ReadStream {
      return null
    }
}

export default LocalStorageProvider
