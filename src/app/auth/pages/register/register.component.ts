import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  registerForm:FormGroup=this.fb.group({

    name:['Test 4',[Validators.required,Validators.minLength(6)]],
    email:['test4@test.com',[Validators.required,Validators.email]],
    password:['123456789',[Validators.required,Validators.minLength(6)]]
  });

  register(){
    const {name,email,password} = this.registerForm.value;
    this.authService.registro(name,email,password).subscribe(ok=>{
      console.log(ok);
      if(ok===true){
        this.router.navigateByUrl('/auth/login');
      }else{
        Swal.fire('Error',ok,'error');
      }
    })
    //this.router.navigateByUrl('/dashboard');
  }


  constructor(private fb:FormBuilder,private router:Router, private authService:AuthService) { }


}
