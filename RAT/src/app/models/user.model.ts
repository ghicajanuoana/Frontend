import { Role } from "./role.model";

export class User {
    userId: number = 0;
    username?: string = "";
    isActive?: boolean;
    role?: Role = new Role();
}