import { Userdata } from './userdata';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService  implements InMemoryDbService{

  constructor() { }
  createDb(){
   let users:Userdata[]=[
    {id:1, title:"Mr",firstName:"Mahendra",lastName:"Kumar",email:"mahi123@gmail.com",dob:"25-02-1997",password:"mahi123" ,acceptTerm:false},
    {id:2, title:"Mr",firstName:"Dashrath",lastName:"Kumar",email:"dashu123@gmail.com",dob:"25-02-1997",password:"dashu123" ,acceptTerm:false},

   ]
   return{users};
  }
}
