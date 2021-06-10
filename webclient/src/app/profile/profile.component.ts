import { Component, OnInit } from '@angular/core';
import {UserService} from '../user-service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
    let servicesNumber = 0
    var nameUser = document.getElementsByClassName("nameUser");
    var emailUser = document.getElementsByClassName("emailUser");
    var servicesUser = document.getElementsByClassName("servicesNumber");
    var actionsUser = document.getElementsByClassName("actionsNumber");

    for (var i = 0; i < nameUser.length; i++) {
      nameUser[i].textContent = this.userService.getUser().lastname + " " + this.userService.getUser().name;
    }
    for (var i = 0; i < emailUser.length; i++) {
      emailUser[i].textContent = this.userService.getUser().email;
    }
    if (this.userService.getUser().services.facebook.accessToken != "") {
      servicesNumber += 1;
    }
    for (var i = 0; i < servicesUser.length; i++) {
      servicesUser[i].textContent = servicesNumber.toString();
    }
    console.log(servicesUser)
    console.log(this.userService.getUser())
    console.log(servicesNumber)
  }
}
