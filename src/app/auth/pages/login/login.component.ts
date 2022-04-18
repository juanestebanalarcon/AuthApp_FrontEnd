import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  loginForm:FormGroup=this.fb.group({
    email:['test2@test.com',[Validators.required,Validators.email]],
    password:['12345678910',[Validators.required,Validators.minLength(6)]]
  });

  login(){
    const {email,password}=this.loginForm.value;
    this.authService.login(email,password).subscribe(ok=>{
      console.log(ok);
      if(ok===true){
        this.router.navigateByUrl('/dashboard');
      }else{
        //TODO mostrar mensaje de error 
        Swal.fire('Error',ok,'error');
      }
    });
  }

  constructor(private fb: FormBuilder,private router:Router, private authService: AuthService) { }


}
