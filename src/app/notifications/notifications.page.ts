import { Component } from '@angular/core';
import { IonContent, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon],
})
export class NotificationsPage {}
