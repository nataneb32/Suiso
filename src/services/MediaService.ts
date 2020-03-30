import StorageProvider from '../storage'
import { Media } from '../entity/Media'
import { getRepository } from 'typeorm'
import { ReadStream } from 'fs'

class MediaService {
    private acceptedTypes = ['jpg', 'png', 'txt']

    public async store (stream: ReadStream): Promise<Media> {
      const file = await StorageProvider.upload(stream)
      const media = new Media()
      media.name = file.fileName
      media.type = file.type
      const a = await getRepository(Media).save(media)
      return getRepository(Media).findOne(a.id)
    }
}

export default new MediaService()
