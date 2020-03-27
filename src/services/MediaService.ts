import StorageProvider from '../storage'
import { FileUpload } from 'graphql-upload'
import { Media } from '../entity/Media'

class MediaService {
    private acceptedTypes
    constructor () {
      this.acceptedTypes = ['jpg', 'png', 'txt']
    }

    public async store (fileUpload: FileUpload) {
      const { filename, createReadStream } = await fileUpload
      const file = await StorageProvider.upload(createReadStream(), filename)
      const media = new Media()
      media.name = file
    }
}

export default new MediaService()
