export class User {
  id: number
  name: string
  password: string

  constructor(data: {
    id: number
    name: string
    password: string
  }) {
    this.id = data.id
    this.name = data.name
    this.password = data.password
  }
}
