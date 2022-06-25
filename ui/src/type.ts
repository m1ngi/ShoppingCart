export interface Credential {
  username: string
  password: string
}

export interface RegisterProp extends Credential {
  repeatPassword: string
  name: string
}

export interface IdentityResponse {
  jwt: string
  name: string
}

export interface ProductProp {
  id: string
  price: number
  name: string
  image: string
}

export type Products = Array<ProductProp>