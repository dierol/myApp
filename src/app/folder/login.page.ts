import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  model = {
    username: null,
    password: null,
    token: null
  };
  isLoading: boolean = false;

  constructor(
    private storageService: StorageService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
  }

  login() {
    this.isLoading = true;
    setTimeout(() => {
      this.model.token = Math.random();
      this.storageService.setObject('identity', this.model);
      this.modalController.dismiss(this.model);
      this.isLoading = false;
    }, 1000);
  };
}
