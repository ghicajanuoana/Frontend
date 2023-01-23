import { Devices } from "./device.model";

export class Maintenance{
    id?: number = 0;
    device?: Devices = new Devices();
    deviceId: number = 0;
    description?: string;
    outcome?: string;
    status: string;
    scheduledDate: any[] = [];
    actualdate?: any[] = [];
    createdAt: any[] = [];
    createdBy: string = "admin";
}