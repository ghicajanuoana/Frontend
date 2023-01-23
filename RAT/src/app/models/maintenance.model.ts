
export class Maintenance {
    id?: number;
    deviceId: number = 0;
    description?: string;
    outcome?: string;
    status: string;
    scheduledDate: any[] = [];
    actualdate?: any[] = [];
    createdAt: any[] = [];
    createdBy: string = "admin";
}
