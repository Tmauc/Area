import { Component, OnInit, Inject, ViewEncapsulation} from '@angular/core';
import { UserService } from '../user-service/user.service';
import { AuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

declare var jQuery: any;
let globalId = 0;
let selectedActionService : string;
let selectedAction : string;
let selectedReactionService : string;
let selectedReaction : string;
let selectedData : string;


export interface DialogData {
  actionService: string;
  action: string;
  reaction: string;
  reactionService: string;
}

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AreaComponent implements OnInit {
  action: string;
  reaction: string;
  reactionService: string;
  constructor(private userService: UserService, private authService: AuthService, public dialog: MatDialog) {}

  openActionModal(tmpActionService, tmpAction): void {
    selectedActionService = tmpActionService;
    selectedAction= tmpAction;
    const dialogRef = this.dialog.open(AreaModalAction, {
      width: '450px',
      data: {actionService: selectedActionService, action: selectedAction}
    });
  }

  openReactionModal(tmpReaction): void {
    selectedReaction = tmpReaction;
    const dialogRef = this.dialog.open(AreaModalReaction, {
      width: '450px',
      data: {actionService: selectedActionService, action: selectedAction, reaction: tmpReaction}
    });
  }

  ngOnInit() {
    const nameUser = document.getElementsByClassName('nameUser');
    const emailUser = document.getElementsByClassName('emailUser');
    this.userService.updateUser()
    const tmpUser = this.userService.getUser()
    for (let i = 0; i < nameUser.length; i++) {
      nameUser[i].textContent = tmpUser.lastname + ' ' + tmpUser.name;
    }
    for (let i = 0; i < emailUser.length; i++) {
      emailUser[i].textContent = tmpUser.email;
    }
    for (let i = 0; i < tmpUser.widgets.length; i++) {
      console.log(tmpUser.widgets[i])
      this.getGoodAction(tmpUser.widgets[i].action);
      this.getGoodReaction(tmpUser.widgets[i].reaction);
      this.actNewWidget()
    }
    (function($) {
      // USE STRICT

      // Dropdown
      try {
        var menu = $('.js-item-menu');
        var sub_menu_is_showed = -1;
        for (let i = 0; i < menu.length; i++) {
          $(menu[i]).on('click', function(e) {
            e.preventDefault();
            $('.js-right-sidebar').removeClass('show-sidebar');
            if (jQuery.inArray(this, menu) == sub_menu_is_showed) {
              $(this).toggleClass('show-dropdown');
              sub_menu_is_showed = -1;
            } else {
              for (let i = 0; i < menu.length; i++) {
                $(menu[i]).removeClass('show-dropdown');
              }
              $(this).toggleClass('show-dropdown');
              sub_menu_is_showed = jQuery.inArray(this, menu);
            }
          });
        }
        $('.js-item-menu, .js-dropdown').click(function(event) {
          event.stopPropagation();
        });

        $('body,html').on('click', function() {
          for (let i = 0; i < menu.length; i++) {
            menu[i].classList.remove('show-dropdown');
          }
          sub_menu_is_showed = -1;
        });

      } catch (error) {
        console.log(error);
      }

      const wW = $(window).width();
        // Right Sidebar
      const right_sidebar = $('.js-right-sidebar');
      const sidebar_btn = $('.js-sidebar-btn');

      sidebar_btn.on('click', function(e) {
          e.preventDefault();
          for (let i = 0; i < menu.length; i++) {
            menu[i].classList.remove('show-dropdown');
          }
          sub_menu_is_showed = -1;
          right_sidebar.toggleClass('show-sidebar');
        });

      $('.js-right-sidebar, .js-sidebar-btn').click(function(event) {
          event.stopPropagation();
        });

      $('body,html').on('click', function() {
          right_sidebar.removeClass('show-sidebar');

        });
    })(jQuery);
  }

  deleteWidget(id) {
    document.getElementById(id).remove();
  }

  logoutArea() {
    this.userService.userLogout();
  }

  createNewActionReactionHtml(div, str1, str2, nameIcon) {
    const div2 = document.createElement('div');
    div2.className = 'overview-box clearfix';
    div.appendChild(div2);

    const div3 = document.createElement('div');
    div3.className = 'icon';
    div2.appendChild(div3);

    const i = document.createElement('i');
    i.className = nameIcon;
    div3.appendChild(i);

    const div4 = document.createElement('div');
    div4.className = 'text';
    div2.appendChild(div4);

    const h2 = document.createElement('h2');
    h2.textContent = str1;
    div4.appendChild(h2);

    const span = document.createElement('span');
    span.textContent = str2;
    div4.appendChild(span);
  }

  createIconDeleteEditHtml(div, idWidget) {
    const div2 = document.createElement('div');
    div2.className = 'icon';
    div2.style.cssText = 'color:white;font-size: 25px;margin-bottom:10px';
    div.appendChild(div2);

    const i = document.createElement('i');
    i.addEventListener('click', (e: Event) => this.deleteWidget(idWidget));
    i.className = 'fas fa-trash-alt icon-widget';
    div2.appendChild(i);

    const div3 = document.createElement('div');
    div3.className = 'icon';
    div3.style.cssText = 'color:white;font-size: 25px';
    div.appendChild(div3);

    const i2 = document.createElement('i');
    i2.addEventListener('click', (e: Event) => this.deleteWidget(idWidget));
    i2.className = 'fas fa-pencil-alt icon-widget';
    div3.appendChild(i2);
  }

  chooseFacebookDesign(div, reaction) {
    if (reaction === 'Facebook') {
      div.className = 'overview-item overview-item--facebook';
    } else if (reaction === 'Github') {
      div.className = 'overview-item overview-item--facebookGithub';
    } else if (reaction === 'Weather') {
      div.className = 'overview-item overview-item--facebookMeteo';
    } else if (reaction === 'Money') {
      div.className = 'overview-item overview-item--facebookMoney';
    } else if (reaction === 'Reddit') {
      div.className = 'overview-item overview-item--facebookReddit';
    } else if (reaction === 'Nasa') {
      div.className = 'overview-item overview-item--facebookNasa';
    } else if (reaction === 'Youtube') {
      div.className = 'overview-item overview-item--facebookYoutube';
    } else if (reaction === 'Mail') {
      div.className = 'overview-item overview-item--facebookMail';
    }
  }

  chooseGithubDesign(div, reaction) {
    if (reaction === 'Facebook') {
      div.className = 'overview-item overview-item--githubFacebook';
    } else if (reaction === 'Github') {
      div.className = 'overview-item overview-item--github';
    } else if (reaction === 'Weather') {
      div.className = 'overview-item overview-item--githubMeteo';
    } else if (reaction === 'Money') {
      div.className = 'overview-item overview-item--githubMoney';
    } else if (reaction === 'Reddit') {
      div.className = 'overview-item overview-item--githubReddit';
    } else if (reaction === 'Nasa') {
      div.className = 'overview-item overview-item--githubNasa';
    } else if (reaction === 'Youtube') {
      div.className = 'overview-item overview-item--githubYoutube';
    } else if (reaction === 'Mail') {
      div.className = 'overview-item overview-item--githubMail';
    }
  }

  chooseMeteoDesign(div, reaction) {
    if (reaction === 'Facebook') {
      div.className = 'overview-item overview-item--meteoFacebook';
    } else if (reaction === 'Github') {
      div.className = 'overview-item overview-item--meteoGithub';
    } else if (reaction === 'Weather') {
      div.className = 'overview-item overview-item--meteo';
    } else if (reaction === 'Money') {
      div.className = 'overview-item overview-item--meteoMoney';
    } else if (reaction === 'Reddit') {
      div.className = 'overview-item overview-item--meteoReddit';
    } else if (reaction === 'Nasa') {
      div.className = 'overview-item overview-item--meteoNasa';
    } else if (reaction === 'Youtube') {
      div.className = 'overview-item overview-item--meteoYoutube';
    } else if (reaction === 'Mail') {
      div.className = 'overview-item overview-item--meteoMail';
    }
  }

  chooseMoneyDesign(div, reaction) {
    if (reaction === 'Facebook') {
      div.className = 'overview-item overview-item--moneyFacebook';
    } else if (reaction === 'Github') {
      div.className = 'overview-item overview-item--moneyGithub';
    } else if (reaction === 'Weather') {
      div.className = 'overview-item overview-item--moneyMeteo';
    } else if (reaction === 'Money') {
      div.className = 'overview-item overview-item--money';
    } else if (reaction === 'Reddit') {
      div.className = 'overview-item overview-item--moneyReddit';
    } else if (reaction === 'Nasa') {
      div.className = 'overview-item overview-item--moneyNasa';
    } else if (reaction === 'Youtube') {
      div.className = 'overview-item overview-item--moneyYoutube';
    } else if (reaction === 'Mail') {
      div.className = 'overview-item overview-item--moneyMail';
    }
  }

  chooseRedditDesign(div, reaction) {
    if (reaction === 'Facebook') {
      div.className = 'overview-item overview-item--redditFacebook';
    } else if (reaction === 'Github') {
      div.className = 'overview-item overview-item--redditGithub';
    } else if (reaction === 'Weather') {
      div.className = 'overview-item overview-item--redditMeteo';
    } else if (reaction === 'Money') {
      div.className = 'overview-item overview-item--redditMoney';
    } else if (reaction === 'Reddit') {
      div.className = 'overview-item overview-item--reddit';
    } else if (reaction === 'Nasa') {
      div.className = 'overview-item overview-item--redditNasa';
    } else if (reaction === 'Youtube') {
      div.className = 'overview-item overview-item--redditYoutube';
    } else if (reaction === 'Mail') {
      div.className = 'overview-item overview-item--redditMail';
    }
  }

  chooseNasaDesign(div, reaction) {
    if (reaction === 'Facebook') {
      div.className = 'overview-item overview-item--nasaFacebook';
    } else if (reaction === 'Github') {
      div.className = 'overview-item overview-item--nasaGithub';
    } else if (reaction === 'Weather') {
      div.className = 'overview-item overview-item--nasaMeteo';
    } else if (reaction === 'Money') {
      div.className = 'overview-item overview-item--nasaMoney';
    } else if (reaction === 'Reddit') {
      div.className = 'overview-item overview-item--nasaReddit';
    } else if (reaction === 'Nasa') {
      div.className = 'overview-item overview-item--nasa';
    } else if (reaction === 'Youtube') {
      div.className = 'overview-item overview-item--nasaYoutube';
    } else if (reaction === 'Mail') {
      div.className = 'overview-item overview-item--nasaMail';
    }
  }

  chooseYoutubeDesign(div, reaction) {
    if (reaction === 'Facebook') {
      div.className = 'overview-item overview-item--youtubeFacebook';
    } else if (reaction === 'Github') {
      div.className = 'overview-item overview-item--youtubeGithub';
    } else if (reaction === 'Weather') {
      div.className = 'overview-item overview-item--youtubeMeteo';
    } else if (reaction === 'Money') {
      div.className = 'overview-item overview-item--youtubeMoney';
    } else if (reaction === 'Reddit') {
      div.className = 'overview-item overview-item--youtubeReddit';
    } else if (reaction === 'Nasa') {
      div.className = 'overview-item overview-item--youtubeNasa';
    } else if (reaction === 'Youtube') {
      div.className = 'overview-item overview-item--youtube';
    } else if (reaction === 'Mail') {
      div.className = 'overview-item overview-item--youtubeMail';
    }
  }
  chooseDesignWidget(div, action, reaction) {
    if (action === 'Facebook') {
      this.chooseFacebookDesign(div, reaction);
    } else if (action === 'Github') {
      this.chooseGithubDesign(div, reaction);
    } else if (action === 'Weather') {
      this.chooseMeteoDesign(div, reaction);
    } else if (action === 'Money') {
      this.chooseMoneyDesign(div, reaction);
    } else if (action === 'Reddit') {
      this.chooseRedditDesign(div, reaction);
    } else if (action === 'Nasa') {
      this.chooseNasaDesign(div, reaction);
    } else if (action === 'Youtube') {
      this.chooseYoutubeDesign(div, reaction);
    }
  }

  createNewWidget(idWidget, serviceAction, action, serviceReaction, reaction) {

    const divP = document.createElement('div');
    divP.className = 'col-sm-6 col-lg-4';
    divP.id = idWidget;

    const div = document.createElement('div');
    this.chooseDesignWidget(div, serviceAction, serviceReaction);
    divP.appendChild(div);

    const div2 = document.createElement('div');
    div2.className = 'row';
    div2.style.cssText = 'padding-bottom: 10px;';
    div.appendChild(div2);

    const div3 = document.createElement('div');
    div3.className = 'column';
    div3.style.cssText = 'margin: auto;';
    div2.appendChild(div3);

    const div4 = document.createElement('div');
    div4.className = 'overview__inner';
    div3.appendChild(div4);

    this.createNewActionReactionHtml(div4, serviceAction, action, 'fas fa-arrow-right');
    this.createNewActionReactionHtml(div4, serviceReaction , reaction, 'fas fa-arrow-left');

    const div5 = document.createElement('div');
    div5.className = 'column-icon-widget';
    div5.style.cssText = 'height: 100%;padding:10% 10px 10% 15px;border-left: #ffffff;border-left-style: dashed;border-left-width: 1px;';
    div2.appendChild(div5);

    this.createIconDeleteEditHtml(div5, idWidget);

    return divP;
  }

  public async addNewWidget() {
    const d1 = document.getElementById('widgetContainer');
    const htmlText = this.createNewWidget('idWidget' + globalId, selectedActionService, selectedAction, selectedReactionService, selectedReaction);
    d1.appendChild(htmlText);
    globalId += 1;
    await this.userService.userAddWidget(this.userService.getUser().email, this.getGoodIDAction(), this.getGoodIDReaction(), selectedData).subscribe(res => {
      if (res['data'] === null) {
        alert(res['message']);
      } else {
        alert(res['message']);
      }
    });
  }

  public async actNewWidget() {
    const d1 = document.getElementById('widgetContainer');
    const htmlText = this.createNewWidget('idWidget' + globalId, selectedActionService, selectedAction, selectedReactionService, selectedReaction);
    d1.appendChild(htmlText);
    globalId += 1;
  }

  getGoodAction(action) {
    if (action == 0) {
      selectedActionService = "Facebook"
      selectedAction = "new_post"
    } else if (action == 1) {
      selectedActionService = "Facebook"
      selectedAction = "new_relationship"
    } else if (action == 2) {
      selectedActionService = "Weather"
      selectedAction = "temperature"
    } else if (action == 3) {
      selectedActionService = "Money"
      selectedAction = "course"
    } else if (action == 4) {
      selectedActionService = "Youtube"
      selectedAction = "like"
    } else if (action == 5) {
      selectedActionService = "Youtube"
      selectedAction = "dislike"
    } else if (action == 6) {
      selectedActionService = "Youtube"
      selectedAction = "views"
    } else if (action == 7) {
      selectedActionService = "Youtube"
      selectedAction = "comment"
    } else if (action == 8) {
      selectedActionService = "Reddit"
      selectedAction = "new_post"
    } else if (action == 9) {
      selectedActionService = "Github"
      selectedAction = "new_follower"
    } else if (action == 10) {
      selectedActionService = "Github"
      selectedAction = "new_following"
    } else if (action == 11) {
      selectedActionService = "Github"
      selectedAction = "request_repos"
    } else if (action == 12) {
      selectedActionService = "Github"
      selectedAction = "request_stash"
    } else if (action == 13) {
      selectedActionService = "Nasa"
      selectedAction = "earth_speed"
    }
  }

  getGoodIDAction() {
    if (selectedActionService == "Facebook" && selectedAction == "new_post") {
      return 0
    } else if (selectedActionService == "Facebook" && selectedAction == "new_relationship") {
      return 1
    } else if (selectedActionService == "Weather" && selectedAction == "temperature") {
      return 2
    } else if (selectedActionService == "Money" && selectedAction == "course") {
      return 3
    } else if (selectedActionService == "Youtube" && selectedAction == "like") {
      return 4
    } else if (selectedActionService == "Youtube" && selectedAction == "dislike") {
      return 5
    } else if (selectedActionService == "Youtube" && selectedAction == "views") {
      return 6
    } else if (selectedActionService == "Youtube" && selectedAction == "comment") {
      return 7
    } else if (selectedActionService == "Reddit" && selectedAction == "new_post") {
      return 8
    } else if (selectedActionService == "Github" && selectedAction == "new_follower") {
      return 9
    } else if (selectedActionService == "Github" && selectedAction == "new_following") {
      return 10
    } else if (selectedActionService == "Github" && selectedAction == "request_repos") {
      return 11
    } else if (selectedActionService == "Github" && selectedAction == "request_stash") {
      return 12
    } else if (selectedActionService == "Nasa" && selectedAction == "earth_speed") {
      return 13
    }
  }

  getGoodIDReaction() {
    if (selectedReactionService == "Facebook" && selectedReaction == "new_post") {
      return 2
    } else if (selectedReactionService == "Facebook" && selectedReaction == "new_link") {
      return 1
    } else if (selectedReactionService == "Mail") {
      return 0
    }
  }

  getGoodReaction(reaction) {
    if (reaction == 2) {
      selectedReactionService = "Facebook"
      selectedReaction = "new_post"
    } else if (reaction == 1) {
      selectedReactionService = "Facebook"
      selectedReaction = "new_link"
    } else if (reaction == 0) {
      selectedReactionService = "Mail"
      selectedReaction = "sendMail"
    }
  }

  addNewWidgetExample() {
    const d1 = document.getElementById('widgetContainer');
    const htmlTextF1 = this.createNewWidget('idWidget' + globalId, 'Facebook', 'Nouveau post', 'Facebook', 'Envoie un mail');
    const htmlTextF2 = this.createNewWidget('idWidget' + globalId, 'Facebook', 'Nouveau post', 'Github', 'Envoie un mail');
    const htmlTextF3 = this.createNewWidget('idWidget' + globalId, 'Facebook', 'Nouveau post', 'Weather', 'Envoie un mail');
    const htmlTextF4 = this.createNewWidget('idWidget' + globalId, 'Facebook', 'Nouveau post', 'Money', 'Envoie un mail');
    const htmlTextF5 = this.createNewWidget('idWidget' + globalId, 'Facebook', 'Nouveau post', 'Reddit', 'Envoie un mail');
    const htmlTextF6 = this.createNewWidget('idWidget' + globalId, 'Facebook', 'Nouveau post', 'Nasa', 'Envoie un mail');
    const htmlTextF7 = this.createNewWidget('idWidget' + globalId, 'Facebook', 'Nouveau post', 'Youtube', 'Envoie un mail');
    
    const htmlTextG1 = this.createNewWidget('idWidget' + globalId, 'Github', 'Nouveau post', 'Facebook', 'Envoie un mail');
    const htmlTextG2 = this.createNewWidget('idWidget' + globalId, 'Github', 'Nouveau post', 'Github', 'Envoie un mail');
    const htmlTextG3 = this.createNewWidget('idWidget' + globalId, 'Github', 'Nouveau post', 'Weather', 'Envoie un mail');
    const htmlTextG4 = this.createNewWidget('idWidget' + globalId, 'Github', 'Nouveau post', 'Money', 'Envoie un mail');
    const htmlTextG5 = this.createNewWidget('idWidget' + globalId, 'Github', 'Nouveau post', 'Reddit', 'Envoie un mail');
    const htmlTextG6 = this.createNewWidget('idWidget' + globalId, 'Github', 'Nouveau post', 'Nasa', 'Envoie un mail');
    const htmlTextG7 = this.createNewWidget('idWidget' + globalId, 'Github', 'Nouveau post', 'Youtube', 'Envoie un mail');

    const htmlTextM1 = this.createNewWidget('idWidget' + globalId, 'Weather', 'Nouveau post', 'Facebook', 'Envoie un mail');
    const htmlTextM2 = this.createNewWidget('idWidget' + globalId, 'Weather', 'Nouveau post', 'Github', 'Envoie un mail');
    const htmlTextM3 = this.createNewWidget('idWidget' + globalId, 'Weather', 'Nouveau post', 'Weather', 'Envoie un mail');
    const htmlTextM4 = this.createNewWidget('idWidget' + globalId, 'Weather', 'Nouveau post', 'Money', 'Envoie un mail');
    const htmlTextM5 = this.createNewWidget('idWidget' + globalId, 'Weather', 'Nouveau post', 'Reddit', 'Envoie un mail');
    const htmlTextM6 = this.createNewWidget('idWidget' + globalId, 'Weather', 'Nouveau post', 'Nasa', 'Envoie un mail');
    const htmlTextM7 = this.createNewWidget('idWidget' + globalId, 'Weather', 'Nouveau post', 'Youtube', 'Envoie un mail');

    const htmlTextMo1 = this.createNewWidget('idWidget' + globalId, 'Money', 'Nouveau post', 'Facebook', 'Envoie un mail');
    const htmlTextMo2 = this.createNewWidget('idWidget' + globalId, 'Money', 'Nouveau post', 'Github', 'Envoie un mail');
    const htmlTextMo3 = this.createNewWidget('idWidget' + globalId, 'Money', 'Nouveau post', 'Weather', 'Envoie un mail');
    const htmlTextMo4 = this.createNewWidget('idWidget' + globalId, 'Money', 'Nouveau post', 'Money', 'Envoie un mail');
    const htmlTextMo5 = this.createNewWidget('idWidget' + globalId, 'Money', 'Nouveau post', 'Reddit', 'Envoie un mail');
    const htmlTextMo6 = this.createNewWidget('idWidget' + globalId, 'Money', 'Nouveau post', 'Nasa', 'Envoie un mail');
    const htmlTextMo7 = this.createNewWidget('idWidget' + globalId, 'Money', 'Nouveau post', 'Youtube', 'Envoie un mail');

    const htmlTextR1 = this.createNewWidget('idWidget' + globalId, 'Reddit', 'Nouveau post', 'Facebook', 'Envoie un mail');
    const htmlTextR2 = this.createNewWidget('idWidget' + globalId, 'Reddit', 'Nouveau post', 'Github', 'Envoie un mail');
    const htmlTextR3 = this.createNewWidget('idWidget' + globalId, 'Reddit', 'Nouveau post', 'Weather', 'Envoie un mail');
    const htmlTextR4 = this.createNewWidget('idWidget' + globalId, 'Reddit', 'Nouveau post', 'Money', 'Envoie un mail');
    const htmlTextR5 = this.createNewWidget('idWidget' + globalId, 'Reddit', 'Nouveau post', 'Reddit', 'Envoie un mail');
    const htmlTextR6 = this.createNewWidget('idWidget' + globalId, 'Reddit', 'Nouveau post', 'Nasa', 'Envoie un mail');
    const htmlTextR7 = this.createNewWidget('idWidget' + globalId, 'Reddit', 'Nouveau post', 'Youtube', 'Envoie un mail');

    const htmlTextRT1 = this.createNewWidget('idWidget' + globalId, 'Nasa', 'Nouveau post', 'Facebook', 'Envoie un mail');
    const htmlTextRT2 = this.createNewWidget('idWidget' + globalId, 'Nasa', 'Nouveau post', 'Github', 'Envoie un mail');
    const htmlTextRT3 = this.createNewWidget('idWidget' + globalId, 'Nasa', 'Nouveau post', 'Weather', 'Envoie un mail');
    const htmlTextRT4 = this.createNewWidget('idWidget' + globalId, 'Nasa', 'Nouveau post', 'Money', 'Envoie un mail');
    const htmlTextRT5 = this.createNewWidget('idWidget' + globalId, 'Nasa', 'Nouveau post', 'Reddit', 'Envoie un mail');
    const htmlTextRT6 = this.createNewWidget('idWidget' + globalId, 'Nasa', 'Nouveau post', 'Nasa', 'Envoie un mail');
    const htmlTextRT7 = this.createNewWidget('idWidget' + globalId, 'Nasa', 'Nouveau post', 'Youtube', 'Envoie un mail');

    const htmlTextY1 = this.createNewWidget('idWidget' + globalId, 'Youtube', 'Nouveau post', 'Facebook', 'Envoie un mail');
    const htmlTextY2 = this.createNewWidget('idWidget' + globalId, 'Youtube', 'Nouveau post', 'Github', 'Envoie un mail');
    const htmlTextY3 = this.createNewWidget('idWidget' + globalId, 'Youtube', 'Nouveau post', 'Weather', 'Envoie un mail');
    const htmlTextY4 = this.createNewWidget('idWidget' + globalId, 'Youtube', 'Nouveau post', 'Money', 'Envoie un mail');
    const htmlTextY5 = this.createNewWidget('idWidget' + globalId, 'Youtube', 'Nouveau post', 'Reddit', 'Envoie un mail');
    const htmlTextY6 = this.createNewWidget('idWidget' + globalId, 'Youtube', 'Nouveau post', 'Nasa', 'Envoie un mail');
    const htmlTextY7 = this.createNewWidget('idWidget' + globalId, 'Youtube', 'Nouveau post', 'Youtube', 'Envoie un mail');

    d1.appendChild(htmlTextF1);
    d1.appendChild(htmlTextF2);
    d1.appendChild(htmlTextF3);
    d1.appendChild(htmlTextF4);
    d1.appendChild(htmlTextF5);
    d1.appendChild(htmlTextF6);
    d1.appendChild(htmlTextF7);

    d1.appendChild(htmlTextG1);
    d1.appendChild(htmlTextG2);
    d1.appendChild(htmlTextG3);
    d1.appendChild(htmlTextG4);
    d1.appendChild(htmlTextG5);
    d1.appendChild(htmlTextG6);
    d1.appendChild(htmlTextG7);

    d1.appendChild(htmlTextM1);
    d1.appendChild(htmlTextM2);
    d1.appendChild(htmlTextM3);
    d1.appendChild(htmlTextM4);
    d1.appendChild(htmlTextM5);
    d1.appendChild(htmlTextM6);
    d1.appendChild(htmlTextM7);

    d1.appendChild(htmlTextMo1);
    d1.appendChild(htmlTextMo2);
    d1.appendChild(htmlTextMo3);
    d1.appendChild(htmlTextMo4);
    d1.appendChild(htmlTextMo5);
    d1.appendChild(htmlTextMo6);
    d1.appendChild(htmlTextMo7);

    d1.appendChild(htmlTextR1);
    d1.appendChild(htmlTextR2);
    d1.appendChild(htmlTextR3);
    d1.appendChild(htmlTextR4);
    d1.appendChild(htmlTextR5);
    d1.appendChild(htmlTextR6);
    d1.appendChild(htmlTextR7);

    d1.appendChild(htmlTextRT1);
    d1.appendChild(htmlTextRT2);
    d1.appendChild(htmlTextRT3);
    d1.appendChild(htmlTextRT4);
    d1.appendChild(htmlTextRT5);
    d1.appendChild(htmlTextRT6);
    d1.appendChild(htmlTextRT7);

    d1.appendChild(htmlTextY1);
    d1.appendChild(htmlTextY2);
    d1.appendChild(htmlTextY3);
    d1.appendChild(htmlTextY4);
    d1.appendChild(htmlTextY5);
    d1.appendChild(htmlTextY6);
    d1.appendChild(htmlTextY7);
    globalId += 1;
  }
}



@Component({
  selector: 'area-modal-action',
  templateUrl: 'area.modalAction.html',
})

export class AreaModalAction {

  constructor(
    private areaComponent: AreaComponent,
    public dialogRef: MatDialogRef<AreaModalAction>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  closeModal(): void {
    this.dialogRef.close();
    selectedAction = "";
  }
  
  nextModal(): void {
    this.dialogRef.close();
    this.areaComponent.openReactionModal('...');
  }

  selectAction(selectedTmpAction :string, selectedTmpData :string,)
  {
    const selectButtonAction = document.getElementById('selectButtonAction');
    if (selectedTmpData) {
      selectButtonAction.textContent = selectedTmpAction + "->" + selectedTmpData;
    } else {
      selectButtonAction.textContent = selectedTmpAction;
    }
    selectedAction = selectedTmpAction;
      selectedData = selectedTmpData;
  }

  whatSelectedAction(str :string) {
    if (selectedActionService == 'Facebook') {
      return 1
    } else if (selectedActionService == 'Github') {
      return 2
    } else if (selectedActionService == 'Weather') {
      return 3
    } else if (selectedActionService == 'Money') {
      return 4
    } else if (selectedActionService == 'Nasa') {
      return 5
    } else if (selectedActionService == 'Reddit') {
      return 6
    } else if (selectedActionService == 'Youtube') {
      return 7
    } else {
      return 0
    }
  }
  disabledButton() {
    if (selectedAction == '...') {
      return true
    } else {
      return false
    }
  }
}

@Component({
  selector: 'area-modal-reaction',
  templateUrl: 'area.modalReaction.html',
})

export class AreaModalReaction{

  constructor(
    private areaComponent: AreaComponent,
    public dialogRef: MatDialogRef<AreaModalReaction>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
  endModal(): void {
    this.dialogRef.close();
    this.areaComponent.addNewWidget();
    selectedReaction = "";
  }

  backModal(): void {
    this.dialogRef.close();
    this.areaComponent.openActionModal(selectedActionService, selectedAction);
  }

  selectReaction(tmpReactionService :string, tmpReaction :string) {
    const selectButtonReaction = document.getElementById('selectButtonReaction');
    selectButtonReaction.textContent = tmpReactionService + " -> " + tmpReaction;
    selectedReactionService = tmpReactionService
    selectedReaction = tmpReaction
  }
  disabledButton() {
    if (selectedReaction == '...') {
      return true
    } else {
      return false
    }
  }
}
