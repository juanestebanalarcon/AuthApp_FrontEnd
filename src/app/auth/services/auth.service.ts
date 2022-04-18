import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/auth.interface';
import {catchError, map, tap} from 'rxjs/operators';
import { of, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl:string=environment.baseUrl;
  private _usuario!:Usuario;
  get usuario(){
    return {...this._usuario};
  }
  constructor(private http:HttpClient) { }

  registro(name:string,email:string,password:string){
    const url:string=`${this.baseUrl}/auth/new`;
    const body={name,email,password};
    return this.http.post<AuthResponse>(url,body)
    .pipe(
      tap(({ok,token})=>{
        if(ok){
          localStorage.setItem('TokenAuth',token!);
          /* 
          this._usuario={
            name:resp.name!,
            uid:resp.uid!,
            email:resp.email!
          }
          */          
        }
      }),
      map(resp=>resp.ok),
      catchError(err=>of(err.error.msg))
    )    
    ;
  }

  login(email:string,password:string){
    const url:string=`${this.baseUrl}/auth`;
    const body={email,password};
    return this.http.post<AuthResponse>(url,body)
    .pipe(
      tap(resp=>{
        if(resp.ok){
          localStorage.setItem('TokenAuth',resp.token!);
          /* 
            this._usuario={
            name:resp.name!,
            uid:resp.uid! //"!" para decir que si viene la info.
          }
          */
        }
      }),
      map(resp=>resp.ok),
      catchError(err=>of(err.error.msg)) );
  }
  validarToken():Observable<boolean>{
    const url=`${this.baseUrl}/auth/renew`;
    const headers=new HttpHeaders().set('TokenAuth',localStorage.getItem('TokenAuth') || '');
    return this.http.get<AuthResponse>(url,{headers}).pipe(
      map(resp=>{
        localStorage.setItem('TokenAuth',resp.token!);
        //Aquí mando a traer la info que quiero mostrar:
        this._usuario={
            name:resp.name!,
            uid:resp.uid!, //"!" para decir que si viene la info.
            email:resp.email!
          }
        return resp.ok;
      }),
      catchError(err=>of(false))
    )
    ;
  }
  logout(){
    localStorage.removeItem('TokenAuth');
  }
}
 