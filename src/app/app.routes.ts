import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs.page').then(m => m.TabsPage),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage),
      },
      {
        path: 'favorites',
        loadComponent: () => import('./favorites/favorites.page').then(m => m.FavoritesPage),
      },
      {
        path: 'cart',
        loadComponent: () => import('./cart/cart.page').then(m => m.CartPage),
      },
      {
        path: 'notifications',
        loadComponent: () => import('./notifications/notifications.page').then(m => m.NotificationsPage),
      },
      {
        path: 'profile',
        loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  { path: '', redirectTo: '/tabs/home', pathMatch: 'full' },
];
