import { StorageProvider, File } from './interface'
import * as fs from 'fs'
import * as path from 'path'
import * as FileType from 'stream-file-type'

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
      console.log(readStream)
      // const type = await FileType.fromStream(readStream)
      const detector = new FileType()
      const newStream = readStream.pipe(detector)

      const type = await detector.fileTypePromise()
      // const type = {
      //   ext: 'jpg',
      //   mime: 'image/jpeg'
      // }

      const mediaToken = this.generateRandomName(20)
      const fileName = `${mediaToken}.${type.ext}`
      const writeStream = fs.createWriteStream(path.join(this.storagePath, fileName))

      newStream.pipe(writeStream)
      await new Promise(resolve => readStream.pipe(writeStream).on('finish', () => resolve()))

      return <File>{
        fileName: fileName,
        type: type.mime
      }
    }

    public delete (fileName: string) {
      return false
    }

    public find (fileName: string): File {
      return null
    }

    public stream (fileName): fs.ReadStream {
      if (fs.existsSync(path.join(this.storagePath, fileName))) {
        return fs.createReadStream(path.join(this.storagePath, fileName))
      } else {
        return null
      }
    }

    public partialStream (fileName: string, end: number, start: number): fs.ReadStream {
      return fs.createReadStream(path.join(this.storagePath, fileName), { start, end })
    }

    public stat (fileName: string) {
      return fs.statSync(path.join(__dirname, fileName))
    }
}

export default LocalStorageProvider
