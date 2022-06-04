import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {Account} from "../model/accountCustomer.model";
import {CustomerAccounts} from "../model/customerAccounts.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http : HttpClient) { }

  public getAccount(accountId : string, page : number, size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendHost+"/accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }
  public debit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.backendHost+"/accounts/debit",data);
  }
  public credit(accountId : string, amount : number, description:string){
    let data={accountId : accountId, amount : amount, description : description}
    return this.http.post(environment.backendHost+"/accounts/credit",data);
  }
  public transfer(accountSource: string,accountDestination: string, amount : number, description:string){
    let data={accountSource, accountDestination, amount, description }
    return this.http.post(environment.backendHost+"/accounts/transfer",data);
  }

  public getCustomerFromAccount(accountId : string):Observable<Account>{
    return this.http.get<Account>(environment.backendHost+"/accounts/"+accountId);
  }

  public getAccountsFromCustomer(customerId : number, page : number, size : number):Observable<CustomerAccounts>{
    return this.http.get<CustomerAccounts>(environment.backendHost+"/accounts/customer/"+customerId + "?page="+page+"&size="+size);
  }

  public getAccounts(page : number, size : number):Observable<CustomerAccounts>{
    return this.http.get<CustomerAccounts>(environment.backendHost+"/accounts?page="+page+"&size="+size);
  }

  public searchAccounts(keyword : string, page : number, size : number):Observable<CustomerAccounts>{
    return this.http.get<CustomerAccounts>(environment.backendHost+"/accounts/search?keyword="+keyword+"&page="+page+"&size="+size)
  }

  public deleteAccount(id: string)
  {
    return this.http.delete(environment.backendHost+"/accounts/delete/"+id);
  }

  public saveCurrentAccount(account: Account):Observable<Account>{
    return this.http.post<Account>(environment.backendHost+"/accounts/currentAccount",account);
  }

  public saveSavingAccount(account: Account):Observable<Account>{
    return this.http.post<Account>(environment.backendHost+"/accounts/savingAccount",account);
  }

}
