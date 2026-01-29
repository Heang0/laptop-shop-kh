import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon],
})
export class ProfilePage {}
