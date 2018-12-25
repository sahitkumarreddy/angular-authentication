import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMsg="";
  loginUserdata = {};
  constructor(private _authService: AuthService,private _router:Router) { }

  ngOnInit() {
  }

  loginUser() {
    this._authService.loginUser(this.loginUserdata)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token',res.token)
          this._router.navigate(['/specialevents'])
        },
        err => {
          return this.errorMsg=err.statusText,console.log(err)
        }
      )
  }

}
