import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import {
  searchOutline,
  laptopOutline,
  desktopOutline,
  tabletPortraitOutline,
  hardwareChipOutline,
  heart,
  bagOutline,
  homeOutline,
  heartOutline,
  notificationsOutline,
  personOutline,
  checkmark,
  addOutline,
  removeOutline,
  trashOutline,
  chevronForwardOutline,
  settingsOutline,
  helpCircleOutline,
  informationCircleOutline,
} from 'ionicons/icons';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

addIcons({
  'search-outline': searchOutline,
  'laptop-outline': laptopOutline,
  'desktop-outline': desktopOutline,
  'tablet-portrait-outline': tabletPortraitOutline,
  'hardware-chip-outline': hardwareChipOutline,
  heart,
  'bag-outline': bagOutline,
  'home-outline': homeOutline,
  'heart-outline': heartOutline,
  'notifications-outline': notificationsOutline,
  'person-outline': personOutline,
  checkmark,
  'add-outline': addOutline,
  'remove-outline': removeOutline,
  'trash-outline': trashOutline,
  'chevron-forward-outline': chevronForwardOutline,
  'settings-outline': settingsOutline,
  'help-circle-outline': helpCircleOutline,
  'information-circle-outline': informationCircleOutline,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
