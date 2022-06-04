import { Customer } from "./customer.model";

export interface CustomerPageable {
    currentPage:  number;
    totalPages:   number;
    pageSize:     number;
    customerDTOS: CustomerDTO[];
}

export interface CustomerDTO {
    id:    number;
    name:  string;
    email: string;
}

