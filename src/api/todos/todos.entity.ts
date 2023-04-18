export class Todo {
  id: number
  title: string
  isComplete: boolean
  isArchive: boolean
  user_id: number
  created_at: string
  updated_at: string

  constructor(data: {
    id: number
    title: string
    isComplete: boolean
    isArchive: boolean
    user_id: number
    created_at: string
    updated_at: string
  }) {
    this.id = data.id
    this.title = data.title
    this.isComplete = data.isComplete
    this.isArchive = data.isArchive
    this.user_id = data.user_id
    this.created_at = data.created_at
    this.updated_at = data.updated_at
  }
}