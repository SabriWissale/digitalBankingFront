import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerId! : string ;
  customer! : Customer;
  editCustomerFormGroup! : FormGroup;

  constructor(private fb : FormBuilder, private route : ActivatedRoute, private router :Router, private customerService:CustomerService) { 
    this.customer=this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.editCustomerFormGroup=this.fb.group({
      name : this.fb.control(this.customer.name, [Validators.required, Validators.minLength(4)]),
      email : this.fb.control(this.customer.email,[Validators.required, Validators.email])
    });
  }

  handleEditCustomer() {
    let customer:Customer=this.editCustomerFormGroup.value;
    this.customerService.updateCustomer(Number(this.customerId),customer).subscribe({
      next : data=>{
        alert("Customer has been successfully updated!");
        //this.newCustomerFormGroup.reset();
        this.router.navigateByUrl("/customers");
      },
      error : err => {
        console.log(err);
      }
    });
  }

}
