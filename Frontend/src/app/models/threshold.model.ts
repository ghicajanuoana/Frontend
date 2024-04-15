import { DeviceReadingType } from "./device-reading-types";
import { DeviceTypes } from "./device-type.model";

export class Threshold {
    id?: number = 0;
    deviceTypeId?: number = 0;
    deviceReadingTypeId?: number = 0;
    deviceType?: DeviceTypes = new DeviceTypes();
    deviceReadingType?: DeviceReadingType = new DeviceReadingType();
    minValue: number = 0;
    warningValue: number = 0;
    criticalValue: number = 0;
    maxValue: number = 0;
}