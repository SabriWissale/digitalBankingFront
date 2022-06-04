import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import { CustomerPageable } from '../model/customerPageable.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  //customers! : Observable<Array<Customer>>;
  errorMessage!: string;
  searchFormGroup : FormGroup | undefined;

  customerPage! : CustomerPageable
  currentPage : number =0;
  pageSize : number =2;


  //customerObservable! : Observable<CustomerPageable>
  
  constructor(private customerService : CustomerService, private fb : FormBuilder, private router : Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword : this.fb.control("")
    });
    this.handleSearchCustomers();
  }
  handleSearchCustomers() {
    let kw=this.searchFormGroup?.value.keyword;
    this.customerService.searchCustomers(kw, this.currentPage, this.pageSize).subscribe({
      next: data =>{
        this.customerPage = data
      }
    })
  }

  gotoPage(page: number) {
    this.currentPage=page;
    this.handleSearchCustomers();
  }

  handleDeleteCustomer(c: Customer) {
    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next : (resp) => {
        for (let i = 0; i < this.customerPage.customerDTOS.length; i++) 
        {
          let index=this.customerPage.customerDTOS.indexOf(c);
          this.customerPage.customerDTOS.slice(index,1)
        }
        this.handleSearchCustomers();
      },
      error : err => {
        console.log(err);
      }
    })
  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("/customer-accounts/"+customer.id,{state :customer});
  }

  handleEditCustomer(customer: Customer) {
    this.router.navigateByUrl("/edit-customer/"+customer.id,{state :customer});
  }
}
