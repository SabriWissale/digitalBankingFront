import { CustomerDTO } from "./customerPageable.model";

export interface Account {
    type:         string;
    id:           string;
    balance:      number;
    createdAt:    Date;
    status:       null;
    customerDTO:  CustomerDTO;
    interestRate: number;
  }