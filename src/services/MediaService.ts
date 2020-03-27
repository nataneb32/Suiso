import StorageProvider from '../storage'
import { FileUpload } from 'graphql-upload'
import { Media } from '../entity/Media'
import { getRepository } from 'typeorm'

class MediaService {
    private acceptedTypes
    constructor () {
      this.acceptedTypes = ['jpg', 'png', 'txt']
    }

    public async store (fileUpload: FileUpload): Promise<Media> {
      const { filename, createReadStream } = await fileUpload
      const file = await StorageProvider.upload(createReadStream(), filename)
      const media = new Media()
      media.name = file.fileName
      media.type = file.type
      const a = await getRepository(Media).save(media)
      return getRepository(Media).findOne(a.id)
    }
}

export default new MediaService()
