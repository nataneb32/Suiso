import server from './server'
import { createConnection } from 'typeorm'
import StorageProvider from './storage/index'

createConnection().then(() => {
  server.start(() => {
    console.log('Servidor iniciou na porta 3333')
  })
  server.express.get('/stream/:filename', (req, res) => {
    const readStream = StorageProvider.stream(req.params.filename)
    readStream.pipe(res)
  })
})
