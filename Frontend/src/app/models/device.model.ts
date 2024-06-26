export class Devices {
    deviceId: number = 0;
    name: string = "";
    serialNumber: string = "";
    deviceType: any;
    location: any;
    description?: string = "";
    softwareVersion?: string = "";
    firmwareVersion?: string = "";
    alias?: string = "";
    emails?: string = "";
    imageFile: File;
    imageBytes: string = "";
}