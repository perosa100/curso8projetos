class Task {
  private id: number
  private name: string
  private done: boolean

  constructor(id: number, name: string, done: boolean) {
    this.id = id
    this.name = name
    this.done = done
  }
}

export { Task }
