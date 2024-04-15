import { Devices } from "./device.model";

export class Maintenance {
    id: number = 0;   //era id?: number;
    //deviceId: any;  //number = 0     SAU Devices???? 
    device: any;
    //device: Devices = new Devices();
    description?: string;
    outcome?: string;
    status?: string;
    scheduledDate: any[] = [];
    actualdate?: any[] = [];
    createdAt?: any[] = [];
    createdBy?: string = "admin";
}
