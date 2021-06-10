import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service/user.service';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';

declare var jQuery: any;
var globalId = 0;

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  private githubUsername = '';

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private authService: AuthService, public dialog: MatDialog) {
    this.activatedRoute.queryParams.subscribe(params => {
      const oauthVerifier = params.oauth_verifier;
      const oauthToken = params.oauth_token;
      if (oauthToken && oauthVerifier) {
        this.saveAccessToken(oauthToken, oauthVerifier);
      }
    });
  }

  ngOnInit() {
    var nameUser = document.getElementsByClassName("nameUser");
    var emailUser = document.getElementsByClassName("emailUser");

    for (var i = 0; i < nameUser.length; i++) {
      nameUser[i].textContent = this.userService.getUser().lastname + " " + this.userService.getUser().name;
    }
    for (var i = 0; i < emailUser.length; i++) {
      emailUser[i].textContent = this.userService.getUser().email;
    }
    console.log(this.userService.getUser());
    (function ($) {
      // USE STRICT

      // Dropdown
      try {
        var menu = $('.js-item-menu');
        var sub_menu_is_showed = -1;

        for (var i = 0; i < menu.length; i++) {
          $(menu[i]).on('click', function (e) {
            e.preventDefault();
            $('.js-right-sidebar').removeClass("show-sidebar");
            if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
              $(this).toggleClass('show-dropdown');
              sub_menu_is_showed = -1;
            }
            else {
              for (var i = 0; i < menu.length; i++) {
                $(menu[i]).removeClass("show-dropdown");
              }
              $(this).toggleClass('show-dropdown');
              sub_menu_is_showed = jQuery.inArray(this, menu);
            }
          });
        }
        $(".js-item-menu, .js-dropdown").click(function (event) {
          event.stopPropagation();
        });

        $("body,html").on("click", function () {
          for (var i = 0; i < menu.length; i++) {
            menu[i].classList.remove("show-dropdown");
          }
          sub_menu_is_showed = -1;
        });

      } catch (error) {
        console.log(error);
      }

      var wW = $(window).width();
        // Right Sidebar
        var right_sidebar = $('.js-right-sidebar');
        var sidebar_btn = $('.js-sidebar-btn');

        sidebar_btn.on('click', function (e) {
          e.preventDefault();
          for (var i = 0; i < menu.length; i++) {
            menu[i].classList.remove("show-dropdown");
          }
          sub_menu_is_showed = -1;
          right_sidebar.toggleClass("show-sidebar");
        });

        $(".js-right-sidebar, .js-sidebar-btn").click(function (event) {
          event.stopPropagation();
        });

        $("body,html").on("click", function () {
          right_sidebar.removeClass("show-sidebar");

        });
    })(jQuery);
  }

  logoutArea() {
    this.userService.userLogout();
  }

  /* API Section */

  signInWithFB(): void {
    const currentUser = this.userService.getUser();
    if (currentUser.services) {
      if (confirm('You have already an access token. Do you want to update him ?')) {
        this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
          console.log(user);
          const body = {
            userEmail: currentUser.email,
            userId: user.id,
            authToken: user.authToken
          };
          this.userService.setUserToFacebook(body).subscribe(obj => {
            console.log(obj);
            sessionStorage.setItem('currentUser', JSON.stringify(obj['data']));
          });
        });
      }
    } else {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
        const body = {
          userEmail: currentUser.email,
          userId: user.id,
          authToken: user.authToken
        };
        this.userService.setUserToFacebook(body).subscribe(obj => {
          console.log(obj);
          sessionStorage.setItem('currentUser', JSON.stringify(obj['data']));
        });
      });
    }
  }
  saveAccessToken(oauthToken: string, oauthVerifier: string): void {
    this.userService.getTwitterAccessToken(oauthToken, oauthVerifier).subscribe(res => {
      console.log(res);
      //sessionStorage.setItem('currentUser', JSON.stringify(res['data']));
    });
  }

  signInWithTwitter(): void {
    this.userService.getTwitterRedirectUrl().subscribe((res: any) => {
      location.href = res.redirectUrl;
    });
  }

  verifConnectFacebook(): boolean {
    if (this.userService.getUser().services.facebook.accessToken == "") {
      return false;
    } else {
      return true;
    }
  }

  verifConnectGithub(): boolean {
    console.log(this.userService.getUser().services.github);
    if (this.userService.getUser().services.github.username === '') {
      return false;
    } else {
      return true;
    }
  }

  public async connectGithub() {
    await this.userService.userSetUsernameGithub(this.userService.getUser().email, this.githubUsername).subscribe(res => {
      this.userService.updateUser();
      //alert(res.message);
    });
  }
}
