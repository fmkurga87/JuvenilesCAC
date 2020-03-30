import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayersListComponent } from './players/players-list/players-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { PlayerDetailComponent } from './players/player-detail/player-detail.component';
import { PlayerDetailResolver } from './_resolvers/player-detail.resolver';
import { PlayerListResolver } from './_resolvers/player-list.resolver';

// Video 63
export const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        // Video 67
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'players', component: PlayersListComponent, resolve: {players: PlayerListResolver} },
            { path: 'players/:id', component: PlayerDetailComponent, resolve: {player: PlayerDetailResolver} },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListsComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
