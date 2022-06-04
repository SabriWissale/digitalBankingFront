import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {Account} from "../model/accountCustomer.model";
import {CustomerService} from "../services/customer.service";
import {AccountsService} from "../services/accounts.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  newAccountFormGroup! : FormGroup;
  customers! : Customer[]
  constructor(private fb : FormBuilder, private accountService:AccountsService, private customerService:CustomerService, private router:Router) { }

  ngOnInit(): void {
    this.handleSearchCustomers();
    this.newAccountFormGroup=this.fb.group({
      balance : this.fb.control(0.0, [Validators.required]),
      overDraft : this.fb.control(0.0,[Validators.required]),
      customerInput : ['']
      
    });
  }

  handleSearchCustomers() {
    this.customerService.getCustomersForInput().subscribe({
      next: data =>{
        this.customers = data
      }
    })
  }

  handleSaveAccount() {
    let account:Account=this.newAccountFormGroup.value;
    account.type="CurrentAccount";
    this.accountService.saveCurrentAccount(account).subscribe({
      next : data=>{
        alert("Account has been successfully saved!");
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl("/accountsList");
      },
      error : err => {
        console.log(err);
      }
    });
  }

}
