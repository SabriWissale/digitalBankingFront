import { CustomerDTO } from "./customerPageable.model";

export interface SavingAccount {
    type:         string;
    id:           string;
    balance:      number;
    createdAt:    Date;
    status:       null;
    customerDTO:  CustomerDTO;
    interestRate: number;
  }

export interface CurrentAccount {
    type:         string;
    id:           string;
    balance:      number;
    createdAt:    Date;
    status:       null;
    customerDTO:  CustomerDTO;
    overDraft: number;
  }