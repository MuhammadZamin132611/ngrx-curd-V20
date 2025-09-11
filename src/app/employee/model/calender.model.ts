export interface CalenderModel {
    id?: string;
    title: string;
    participants: string[];
    startDate: Date;
    startTime: string;
    endDate: Date;
    endTime: string;
    location: string;
    details: string;
    repeat: string;
    bypassLobby: string;
    presenter: string;
}