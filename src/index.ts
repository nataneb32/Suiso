import server from './server'
import { createConnection } from 'typeorm'

createConnection().then(() => {
  server.start(() => {
    console.log('Servidor iniciou na porta 3333')
  })
})
