import { Routes } from '@angular/router';

import { CardListComponent } from './components/card-list/card-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';

export const routes: Routes = [
    { path: 'random-list', component: CardListComponent },
    { path: 'favorites', component: FavoriteListComponent },
    { path: '**', redirectTo: 'random-list', pathMatch: 'full' }
];
