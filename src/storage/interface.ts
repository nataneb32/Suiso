import * as fs from 'fs'

interface StorageProvider{
    upload(): File,
    delete(file: File): Boolean,
    find(fileId: string): File,
    stream(file: File): fs.ReadStream
}

type File = {
    name: string,
    url: string,
    id: string,
    type: string
}

class LocalStorageProvider implements StorageProvider {
  public upload (): File {
    return <File>{
      name: '',
      url: '',
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
