import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse  } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";
  
  constructor(private http:HttpClient,private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl,user)
    .pipe(catchError(this.errorHandler));
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl,user)
    .pipe(catchError(this.errorHandler));
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/regularevents'])
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  errorHandler(error : HttpErrorResponse){
    return throwError(error);
  }
}
