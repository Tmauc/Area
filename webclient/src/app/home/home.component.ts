import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {UserService} from '../user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  // Variables for Login
  emailLogin: string;
  passwordLogin: string;

  // Variables for Register
  emailRegister: string;
  passwordRegister: string;
  passwordBisRegister: string;
  name: string;
  lastname: string;

  ngOnInit() {}

  public loginVisu(): void {
    const register = document.getElementById('register-form');
    const login = document.getElementById('login-form');
    const loginT = document.getElementById('login-form-link');
    const registerT = document.getElementById('register-form-link');

    register.style.display = 'none';
    registerT.style.color = '#666';
    loginT.style.color = '#ce2828';
    login.style.display = 'block';
  }

  public registerVisu(): void {
    const register = document.getElementById('register-form');
    const login = document.getElementById('login-form');
    const loginT = document.getElementById('login-form-link');
    const registerT = document.getElementById('register-form-link');

    register.style.display = 'block';
    registerT.style.color = '#ce2828';
    login.style.display = 'none';
    loginT.style.color = '#666';
  }

  public checkRegisterInputs(): boolean {
    if (this.name !== undefined) {
      if (this.lastname !== undefined) {
        if (this.emailRegister !== undefined) {
          if (this.passwordRegister !== undefined) {
            if (this.passwordBisRegister !== undefined) {
              if (this.passwordRegister !== this.passwordBisRegister) {
                alert('Not the same passwords');
                return false;
              } else {
                return true;
              }
            } else {
              alert('You must fill confirm password');
              return false;
            }
          } else {
            alert('You must fill password');
            return false;
          }
        } else {
          alert('You must fill email');
          return false;
        }
      } else {
        alert('You must fill lastname');
        return false;
      }
    } else {
      alert('You must fill name');
      return false;
    }
  }

  public async login() {
    await this.userService.userLogin(this.emailLogin, this.passwordLogin).subscribe(res => {
      console.log(res);
      if (res['data'] === null) {
        alert(res['message']);
      } else {
        const user = res['data'];
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigate(['area']);
      }
    });
  }

  public async register() {
    if (this.checkRegisterInputs() === false) {
      return false;
    }
    await this.userService.userRegister(this.emailRegister, this.passwordRegister, this.name, this.lastname).subscribe(res => {
      if (res['data'] === null) {
        alert(res['message']);
      } else {
        alert(res['message']);
      }
    });
    return true;
  }
}
