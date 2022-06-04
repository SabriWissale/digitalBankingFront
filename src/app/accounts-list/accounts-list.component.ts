import { Component, OnInit } from '@angular/core';
import {AccountsService} from "../services/accounts.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {CustomerAccounts, BankAccountDTO} from "../model/customerAccounts.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.css']
})
export class AccountsListComponent implements OnInit {

  errorMessage!: string;
  searchFormGroup : FormGroup | undefined;

  accountPage! : CustomerAccounts
  currentPage : number =0;
  pageSize : number =2;

  constructor(private accountService : AccountsService, private fb : FormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchAccounts();
  }

  handleSearchAccounts() {
    let kw=this.searchFormGroup?.value.keyword;
    this.accountService.searchAccounts(kw, this.currentPage, this.pageSize).subscribe({
      next: data =>{
        this.accountPage = data
      }
    })
  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.handleSearchAccounts();
  }


  handleDeleteCustomer(bankAccount: BankAccountDTO ) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.accountService.deleteAccount(bankAccount.id).subscribe({
      next : (resp) => {
        for (let i = 0; i < this.accountPage.bankAccountDTOS.length; i++) 
        {
          let index=this.accountPage.bankAccountDTOS.indexOf(bankAccount);
          this.accountPage.bankAccountDTOS.slice(index,1)
        }
        this.handleSearchAccounts();
      },
      error : err => {
        console.log(err);
      }
    })
  }



  handleEditAccount(BankAccount: BankAccountDTO ) {
    this.router.navigateByUrl("/edit-account/"+BankAccount.id,{state :BankAccount});
  }

}
