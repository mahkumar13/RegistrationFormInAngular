import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'
import { UserHttpService } from './Helper/user-http.service';
import{observable} from'rxjs';
import { Userdata } from './Helper/userdata';
import { DbOpration } from './Helper/dbOpration';
import { mustMatch } from './Helper/mustmatch.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'registrationapp';
   RegisterForm:FormGroup;
   users:Userdata[]=[];
   submitted:boolean=false;
  ButtonText:string="Submit";
dbops:DbOpration;

     constructor(private _fb:FormBuilder,private _userHttp:UserHttpService,private _toastr:ToastrService){}
  ngOnInit(): void {
    this.setFormState();
    this.getAllUser();
  }

     setFormState(){
      this.ButtonText="Submit";
      this.dbops=DbOpration.creation;
      this.RegisterForm=this._fb.group({
        id:[0],
        title:['',Validators.required],
        firstName:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])],
        lastName:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(10)])],
        email:['',Validators.compose([Validators.required,Validators.email])],
         dob:['',Validators.compose([Validators.required])],
        password:['',Validators.compose([Validators.required,Validators.minLength(3),Validators.maxLength(6)]) ],
        confirmPassword:['',Validators.required],
        acceptTerm:[false,Validators.requiredTrue]
      },{
        validators:mustMatch("password","confirmPassword")
      })
     }

     Submit(){
       this.submitted=true;
      if(this.RegisterForm.invalid){
        return;
      }
      switch(this.dbops){
        case DbOpration.creation:
          this._userHttp.addUser(this.RegisterForm.value).subscribe(res=>{
            this._toastr.success("USER SUCCESSFULLY Added");
            this.getAllUser();
            this.cancel();
          })

          break;
          case DbOpration.update:
            this._userHttp.updateUser(this.RegisterForm.value).subscribe(res=>{
              this._toastr.success("USER SUCCESSFULLY DELETED");
              this.getAllUser();
              this.cancel();
            })
            break;

      }
     }

     cancel(){
      this.RegisterForm.reset();
      this.ButtonText="Submit";
      this.dbops=DbOpration.creation;
      this.submitted=false;
     }

     getAllUser(){
      this._userHttp.getAllUser().subscribe(res=>{
       this.users=res;
      })
     }

     edit(userid:number){
      this.ButtonText="Update";
      this.dbops=DbOpration.update;
      let user= this.users.find((u:Userdata)=>u.id===userid);
      this.RegisterForm.patchValue(user);
      this.RegisterForm.get('password').setValue("");
      this.RegisterForm.get('confirmPassword').setValue("");
     }

     getUserById(id:number){

     }
     get ctrl(){
      return this.RegisterForm.controls;
     }
     delete(Id:number){
      // this._userHttp.deleteUser(Id).subscribe(res=>{
      //   this.getUser();
      //   this._toastr.success("Record has been deleted successfully")
      // })
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success me-3',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
         this._userHttp.deleteUser(Id).subscribe(res=>{
        this.getAllUser();
        this._toastr.success("Record has been deleted successfully")
      })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
     }
}
