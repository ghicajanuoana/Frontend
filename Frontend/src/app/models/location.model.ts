export class Location {
    locationId?: number = 0;
    country: string = "";
    city: string = "";
    emailAlertsActive: boolean = true;
    name: string = "";
    address: string = "";
    // emailRecipient: string = "";
    emailRecipient: any;
    contactEmail: string = "";
    latitude?: number | undefined;
    longitude?: number | undefined;
}