import { Component, OnInit, Inject} from '@angular/core';
import { UserService } from '../user-service/user.service';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

declare var jQuery: any;
var globalId = 0;

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  animal: string;
  name: string;
  constructor(private userService: UserService, private authService: AuthService, public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AreaModal, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
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

  deleteWidget(id) {
    document.getElementById(id).remove();
  }

  logoutArea() {
    this.userService.userLogout();
  }

  createNewActionReactionHtml(div, str1, str2) {
    let div2 = document.createElement("div");
    div2.className = "overview-box clearfix";
    div.appendChild(div2);

    let div3 = document.createElement("div");
    div3.className = "icon";
    div2.appendChild(div3);

    let i = document.createElement("i");
    i.className = "fas fa-arrow-right";
    div3.appendChild(i);

    let div4 = document.createElement("div");
    div4.className = "text";
    div2.appendChild(div4);

    let h2 = document.createElement("h2");
    h2.textContent = str1;
    div4.appendChild(h2);

    let span = document.createElement("span");
    span.textContent = str1;
    div4.appendChild(span);
  }

  createIconDeleteEditHtml(div, idWidget) {
    let div2 = document.createElement("div");
    div2.className = "icon";
    div2.style.cssText = "color:white;font-size: 25px;margin-bottom:10px";
    div.appendChild(div2);

    let i = document.createElement("i");
    i.addEventListener("click", (e:Event) => this.deleteWidget(idWidget));
    i.className = "fas fa-trash-alt icon-widget";
    div2.appendChild(i);

    let div3 = document.createElement("div");
    div3.className = "icon";
    div3.style.cssText = "color:white;font-size: 25px";
    div.appendChild(div3);

    let i2 = document.createElement("i");
    i2.addEventListener("click", (e:Event) => this.deleteWidget(idWidget));
    i2.className = "fas fa-pencil-alt icon-widget";
    div3.appendChild(i2);
  }

  createNewWidget(idWidget) {

    let divP = document.createElement("div");
    divP.className = "col-sm-6 col-lg-4";
    divP.id = idWidget

    let div = document.createElement("div");
    div.className = "overview-item overview-item--c2";
    divP.appendChild(div);

    let div2 = document.createElement("div");
    div2.className = "row";
    div2.style.cssText = "padding-bottom: 10px;";
    div.appendChild(div2);

    let div3 = document.createElement("div");
    div3.className = "column";
    div3.style.cssText = "margin: auto;";
    div2.appendChild(div3);

    let div4 = document.createElement("div");
    div4.className = "overview__inner";
    div3.appendChild(div4);

    this.createNewActionReactionHtml(div4, "Facebook", "Nouveau post");
    this.createNewActionReactionHtml(div4, "Instagram", "Envoie un mail");

    let div5 = document.createElement("div");
    div5.className = "column-icon-widget";
    div5.style.cssText = "height: 100%;padding:10% 10px 10% 15px;border-left: #ffffff;border-left-style: dashed;border-left-width: 1px;"
    div2.appendChild(div5);

    this.createIconDeleteEditHtml(div5, idWidget)

    return divP;
  }

  addNewWidget() {
    var d1 = document.getElementById('widgetContainer');
    var htmlText = this.createNewWidget("idWidget" + globalId)
    d1.appendChild(htmlText);
    globalId += 1;
    //console.log(d1);
  }
}
@Component({
  selector: 'area-modal',
  templateUrl: 'area.modal.html',
})
export class AreaModal {

  constructor(
    public dialogRef: MatDialogRef<AreaModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
