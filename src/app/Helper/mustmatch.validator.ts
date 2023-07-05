import { FormGroup } from "@angular/forms";

export  function mustMatch(password:string,confirmPassword:string){
   return (formgroup:FormGroup)=>{
    const passwordControl=formgroup.controls[password];
    const confirmPasswordControl=formgroup.controls[confirmPassword]
    if(confirmPasswordControl.errors&& !confirmPasswordControl.errors['mustMatch']){
      return;
    }
    if(passwordControl.value!=confirmPasswordControl.value){
      confirmPasswordControl.setErrors({mustMatch:true})
    }
    else confirmPasswordControl.setErrors(null)
   }
}
