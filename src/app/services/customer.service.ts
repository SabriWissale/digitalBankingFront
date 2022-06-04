import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";
import {environment} from "../../environments/environment";
import { CustomerPageable } from '../model/customerPageable.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http:HttpClient) { }

  public getCustomers(page : number, size : number):Observable<CustomerPageable>{
    return this.http.get<CustomerPageable>(environment.backendHost+"/customers?page="+page+"&size="+size);
  }

  public searchCustomers(keyword : string, page : number, size : number):Observable<CustomerPageable>{
    return this.http.get<CustomerPageable>(environment.backendHost+"/customers/search?keyword="+keyword+"&page="+page+"&size="+size)
  }
  public saveCustomer(customer: Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.backendHost+"/customers",customer);
  }
  public deleteCustomer(id: number){
    return this.http.delete(environment.backendHost+"/customers/"+id);
  }

  public updateCustomer(id: number,customer : Customer){
    return this.http.put(environment.backendHost+"/customers/"+id, customer);
  }

  public getCustomer(customerId : number):Observable<Customer>{
    return this.http.get<Customer>(environment.backendHost+"/customers/"+customerId);
  }

  public getCustomersForInput():Observable<Customer[]>{
    return this.http.get<Customer[]>(environment.backendHost+"/customers");
  }
}
