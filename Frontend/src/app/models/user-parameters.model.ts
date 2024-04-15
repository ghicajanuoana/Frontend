export class UserParameters {
    username: string = "";
    isActive?: boolean;
    roleId: number;
    pageNumber: number;
    pageSize: number;
    orderBy: string = "";
    orderDescending: boolean = false;
}