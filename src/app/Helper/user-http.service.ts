import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Userdata } from './userdata';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {
 // BASE_API_PATH:string="http://localhost:4200/api/";
  BASE_API_PATH:string="/api/users";
  constructor(private httpClient:HttpClient) { }
   getAllUser():Observable<Userdata[]>{
     return this.httpClient.get<Userdata[]>(this.BASE_API_PATH );
   }
   getUser(id:number){
    this.httpClient.get(`${this.BASE_API_PATH}/users/${id}`)
   }
   deleteUser(id:number){
    return this.httpClient.delete(this.BASE_API_PATH +"/"+id);
   }
   addUser(user:Userdata):Observable<Userdata>{
    // return this.httpClient.post(`${this.BASE_API_PATH}users/`,user);
       return this.httpClient.post<Userdata>(this.BASE_API_PATH,user)

   }
   updateUser(user:Userdata):Observable<Userdata>{
    return this.httpClient.put<Userdata>(this.BASE_API_PATH+"/"+user.id,user)
   }

}
