export class PagedList {
   currentPage: number = 0;
   totalPages: number = 0;
   pageSize: number = 0;
   totalCount: number = 0;
   hasPrevious: boolean = false;
   hasNext: boolean = false;
   data: any[] = [];
}