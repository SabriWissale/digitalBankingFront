import { CustomerDTO } from "./customerPageable.model";

export interface CustomerAccounts {
    currentPage:     number;
    totalPages:      number;
    pageSize:        number;
    bankAccountDTOS: BankAccountDTO[];
}

export interface BankAccountDTO {
    type:          string;
    id:            string;
    balance:       number;
    createdAt:     Date;
    status:        null;
    customerDTO:   CustomerDTO;
    interestRate?: number;
    overDraft?:    number;
}

