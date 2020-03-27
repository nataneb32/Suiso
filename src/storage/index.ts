import LocalStorageProvider from './local'
import * as path from 'path'
const StorageProvider = new LocalStorageProvider(path.join(__dirname, '..', '..', 'files'))

export default StorageProvider
