import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {CustomerAccounts} from "../model/customerAccounts.model";
import {catchError, map, Observable, throwError} from "rxjs";
import {AccountsService} from "../services/accounts.service";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerId! : string ;
  customer! : Customer;
  customerAccountsPage! : CustomerAccounts
  errorMessage!: string;
  currentPage : number =0;
  pageSize : number =2;

  constructor(private route : ActivatedRoute, private router :Router, private accountService : AccountsService) {
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.handleSearchCustomerAccounts();

  }

  handleSearchCustomerAccounts() {
    this.accountService.getAccountsFromCustomer(Number(this.customerId), this.currentPage, this.pageSize).subscribe({
      next: data =>{
        this.customerAccountsPage = data
      }
    })
  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.handleSearchCustomerAccounts();
  }

  handleAccountOperations(b : String) {
    this.router.navigateByUrl("/accounts",{state :b});
  }


}
