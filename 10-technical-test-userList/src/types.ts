declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[]
  }
}

export const SortBy = {
  NONE: 'none',
  NAME: 'name',
  COUNTRY: 'country',
  LAST: 'last',
}

export type SortBy = typeof SortBy[keyof typeof SortBy]

export interface APIResults {
  results: User[]
  info: Info
}

export interface Info {
  seed: string
  results: number
  page: number
  version: string
}

export interface User {
  gender: string
  name: Name
  location: Location
  email: string
  login: Login
  dob: Dob
  registered: Dob
  phone: string
  cell: string
  id: ID
  picture: Picture
  nat: string
}

export interface Dob {
  date: Date
  age: number
}

export interface ID {
  name: string
  value: null
}

export interface Location {
  street: Street
  city: string
  state: string
  country: string
  postcode: number
  coordinates: Coordinates
  timezone: Timezone
}

export interface Coordinates {
  latitude: string
  longitude: string
}

export interface Street {
  number: number
  name: string
}

export interface Timezone {
  offset: string
  description: string
}

export interface Login {
  uuid: string
  username: string
  password: string
  salt: string
  md5: string
  sha1: string
  sha256: string
}

export interface Name {
  title: string
  first: string
  last: string
}

export interface Picture {
  large: string
  medium: string
  thumbnail: string
}
