import server from './server'
import { createConnection } from 'typeorm'

createConnection().then(() => {
  server.listen(3333, () => {
    console.log('Servidor iniciou na porta 3333')
  })
})
