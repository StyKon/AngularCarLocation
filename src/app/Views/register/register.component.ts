import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {
    username: null,
    email: null,
    password: null,
    role: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService , private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    const { username, email, password, role} = this.form;
    this.authService.register(username, email, password, JSON.parse(role)).subscribe(
      data => {
        console.log(data);
        console.log(role);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.route.navigate(['login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        console.log(role);
      }
    );
  }

}
