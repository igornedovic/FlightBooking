import { FlightStatus } from "./flight.model";

export enum ReservationStatus {
    Pending = "Pending",
    Rejected = "Rejected",
    Accepted = "Accepted"
}

export interface ReservationInterface {
    numberOfSeats: number,
    status: ReservationStatus,
    userId: number,
    flightId: number
}

export class Reservation {
    constructor(
        public reservationId: number,
        public firstName: string,
        public lastName: string,
        public flyingFromName: string,
        public flyingToName: string,
        public date: Date,
        public flightStatus: FlightStatus,
        public numberOfSeats: number,
        public status: ReservationStatus
      ) {}
}