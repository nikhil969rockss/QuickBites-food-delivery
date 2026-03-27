import { JwtPayload } from 'jsonwebtoken'

export type signupData = {
  fullName: string
  email: string
  password: string
  mobile: string
  role: string
}
export type loginData = {
  email: string
  password: string
}

export type TLoggedInUser = {
  id: string
  email: string
  mobile: string
  role: string
}

export interface Token extends JwtPayload {
  id: string
  email: string
  role: string
}
