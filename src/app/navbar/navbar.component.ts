import { Component, OnInit } from '@angular/core';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less']
})
export class NavbarComponent {

  constructor(public navigationService: NavigationService) {
  }
}
