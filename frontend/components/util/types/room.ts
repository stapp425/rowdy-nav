export type Room = {
  readonly id: string
  room: string 
  roomName: string
  isOccupied: boolean
  occupancy: {
    current: number
    max: number
  }
  types: string[]
  floor?: number
}

const r230: Room = {
  id: "abc1234",
  room: "R230",
  roomName: "San Pedro I Floor 2, Room 230",
  isOccupied: true,
  occupancy: {
    current: 50,
    max: 71
  },
  types: ["a", "b", "c"]
}