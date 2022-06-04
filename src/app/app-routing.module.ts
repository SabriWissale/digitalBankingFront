import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {EditCustomerComponent} from "./edit-customer/edit-customer.component";
import {AccountsListComponent} from "./accounts-list/accounts-list.component";
import {NewAccountComponent} from "./new-account/new-account.component";
import {NewSavingAccountComponent} from "./new-saving-account/new-saving-account.component";
import {EditAccountComponent} from "./edit-account/edit-account.component";
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path :"customers", component : CustomersComponent},
  { path :"accounts", component : AccountsComponent},
  { path :"new-customer", component : NewCustomerComponent},
  { path :"customer-accounts/:id", component : CustomerAccountsComponent},
  { path :"edit-customer/:id", component : EditCustomerComponent},
  { path :"accountsList", component : AccountsListComponent},
  { path :"new-CurrentAccount", component : NewAccountComponent},
  { path :"new-SavingAccount", component : NewSavingAccountComponent},
  { path :"edit-account/:id", component : EditAccountComponent},
  { path :"", component : HomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
