export enum FlightStatus {
    Active = "Active",
    Cancelled = "Cancelled"
}

export interface FlightInterface {
    date: Date,
    numberOfSeats: number,
    layoverNumber: number,
    status: FlightStatus,
    flyingFromId: number,
    flyingToId: number
}

export class Flight {
    constructor(
        public flightId: number,
        public flyingFromName: string,
        public flyingToName: string,
        public date: Date,
        public status: FlightStatus,
        public numberOfSeats: number,
        public layoverNumber: number,
      ) {}
}