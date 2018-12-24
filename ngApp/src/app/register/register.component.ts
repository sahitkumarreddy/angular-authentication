import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserdata = {};
  constructor(private _authService: AuthService, private _router:Router) { }

  ngOnInit() {
  }

  registerUser() {
    this._authService.registerUser(this.registerUserdata)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token',res.token)
          this._router.navigate(['/specialevents'])
        },
        err => console.log(err)
      )
  }

}
