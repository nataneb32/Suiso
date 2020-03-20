import * as jwt from 'jsonwebtoken'
export const config = {
  secret: 's3cr3t'
}

export function createToken (payload: any): string {
  return jwt.sign(payload, config.secret)
}

export function verify (token: any): string | object | Boolean {
  try {
    return jwt.verify(token, config.secret)
  } catch (err) {
    return false
  }
}
