import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { LoginPage } from './login.page';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public identityIsSet: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  removeIdentity(): void {
    this.storageService.remove('identity');
    this.identityIsSet = false;
    console.log(this.storageService.get('identity'));
  };

  async presentModal() {
    const modal = await this.modalController.create({
      component: LoginPage,
      animated: true
    });

    modal.onDidDismiss().then(
      (modalData) => {
        let data = modalData.data || {};
        this.identityIsSet = !!data.token;
        console.log(this.storageService.get('identity'));
      }
    );

    return await modal.present();
  }

}
