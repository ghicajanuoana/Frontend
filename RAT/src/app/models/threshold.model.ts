import { DeviceTypes } from "./device-type.model";
import { DeviceReadingType } from "./device-reading-types";

export class Threshold {
    thresholdId: number = 0;
    deviceType: DeviceTypes = new DeviceTypes();
    deviceReadingType: DeviceReadingType = new DeviceReadingType;
    minValue: number = 0;
    warningValue: number = 0;
    criticalValue: number = 0;
    maxValue: number = 0;
}