import * as bcrypt from 'bcrypt'
export const config = {
  salt: 10
}

export async function hash (password: string): Promise<string> {
  return bcrypt.hash(password, config.salt)
}

export async function compareWithHash (password: string, hash: string): Promise<Boolean> {
  return bcrypt.compare(password, hash)
}
