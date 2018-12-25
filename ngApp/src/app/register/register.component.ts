import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMsg="";
  registerUserdata = {};
  constructor(private _authService: AuthService, private _router:Router) { }

  ngOnInit() {
  }

  registerUser() {
    this._authService.registerUser(this.registerUserdata)
      .subscribe(
        res => {
          console.log(res)
          if(res.status == 'error'){
            var errors = '';
            for (let error of res.message) {
                  errors = errors + error.msg;
                 }
            return this.errorMsg=errors,console.log(errors)
          }else{
          localStorage.setItem('token',res.token)
          this._router.navigate(['/specialevents'])
          }
        },
        err => {
          return this.errorMsg=err.statusText,console.log(err)
        }
      )
  }

}
