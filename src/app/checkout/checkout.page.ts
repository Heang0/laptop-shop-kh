import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IonContent, IonIcon, IonToast } from '@ionic/angular/standalone';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonContent, IonIcon, IonToast, NgIf, RouterLink],
})
export class CheckoutPage {
  paid = false;
  toastOpen = false;

  payNow() {
    this.paid = true;
    this.toastOpen = true;
  }
}
