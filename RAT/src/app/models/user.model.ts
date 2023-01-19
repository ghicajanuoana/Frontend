import { Role } from "./role.model";

export class User {
    userId: number = 0;
    username?: string = "";
    isActive?: boolean = true;
    role?: Role = new Role();
}