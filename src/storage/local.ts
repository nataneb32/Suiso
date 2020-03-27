import { StorageProvider, File } from './interface'
import * as fs from 'fs'
import * as path from 'path'

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

    public async upload (readStream: fs.ReadStream, originalName: string): Promise<File> {
      const type = path.extname(originalName)
      console.log(type)
      const mediaToken = this.generateRandomName(20)
      const fileName = `${mediaToken}${type}`
      const writeStream = fs.createWriteStream(path.join(this.storagePath, fileName))
      await new Promise(resolve => readStream.pipe(writeStream).on('finish', () => resolve()))

      return <File>{
        name: originalName,
        fileName: fileName,
        id: '',
        type: originalName.split('.').pop()
      }
    }

    public delete (file: File) {
      return false
    }

    public find (fileId: string): File {
      return null
    }

    public stream (fileName): fs.ReadStream {
      if (fs.existsSync(path.join(this.storagePath, fileName))) {
        return fs.createReadStream(path.join(this.storagePath, fileName))
      } else {
        return null
      }
    }
}

export default LocalStorageProvider
