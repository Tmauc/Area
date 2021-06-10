import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService: HttpClient, private router: Router) {}

  // Http Options
  private httpOptions = {
    headers: new HttpHeaders({
    })
  };

  // Urls for REST Api server
  private httpUrl = 'http://localhost:8080/';
  private httpUrlRegister = this.httpUrl + 'register';
  private httpUrlLogin = this.httpUrl + 'login';
  private httpUrlAuthFacebook = this.httpUrl + 'auth/facebook';
  private httpUrlAddWidget = this.httpUrl + 'addwidget';
  private httpUrlSetUsernameGithub = this.httpUrl + 'setgithubusername';

  // Login & Register functions
  public userLogin(email, password) {
    const bodyRequest = {
      'email': email,
      'password': password
    };
    return this.httpService.post(this.httpUrlLogin, bodyRequest);
  }

  public userAddWidget(email, action, reaction, data) {
    const bodyRequest = {
      'email': email,
      'action': action,
      'reaction': reaction,
      'data': data
    };
    return this.httpService.post(this.httpUrlAddWidget, bodyRequest, this.httpOptions);
  }

  public userSetUsernameGithub(email, data) {
    const bodyRequest = {
      'email': email,
      'data': data
    };
    return this.httpService.post(this.httpUrlSetUsernameGithub, bodyRequest, this.httpOptions);
  }

  public userRegister(email, password, name, lastname) {
    const bodyRequest = {
      'email': email,
      'password': password,
      'name': name,
      'lastname': lastname
    };
    return this.httpService.post(this.httpUrlRegister, bodyRequest, this.httpOptions);
  }

  public userLogout() {
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  public updateUser() {
    const bodyRequest = {
      'email': this.getUser().email
    };
    this.httpService.post('http://localhost:8080/getuser', bodyRequest).subscribe(res => {
      console.log(res);
      sessionStorage.setItem('currentUser', JSON.stringify(res['user']));
    });
  }

  public setUserToFacebook(body) {
    return this.httpService.post(this.httpUrlAuthFacebook, body, this.httpOptions);
  }

  public getTwitterRedirectUrl() {
    return this.httpService.get('http://localhost:0/auth/twitter/connect');
  }

  public  getTwitterAccessToken(oauthToken: string, oauthVerifier: string) {
    return this.httpService.get('http://localhost:8080/auth/twitter/save?oauth_token='
      + oauthToken + '&oauth_verifier=' + oauthVerifier);
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }
  

}
