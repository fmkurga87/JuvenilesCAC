import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PlayersListComponent } from './players/players-list/players-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { PlayerDetailComponent } from './players/player-detail/player-detail.component';
import { PlayerDetailResolver } from './_resolvers/player-detail.resolver';
import { PlayerListResolver } from './_resolvers/player-list.resolver';
import { PlayerEditComponent } from './players/player-edit/player-edit.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PlayerEditResolver } from './_resolvers/player-edit.resolver';
import { PlayerNewComponent } from './players/player-new/player-new.component';

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
            // Video 97
            // Ojo, en el curso no lo hace porque ahi no es necesario, pero hay que pasar el id del jugador.
            // Lo dejo para mas adelante editarlo.
            { path: 'player/edit/:id', component: PlayerEditComponent, resolve: {player: PlayerEditResolver},
                canDeactivate: [PreventUnsavedChanges] },
            // FMK - Ver el tema del resolver y del canDeactivate
            { path: 'player/new', component: PlayerNewComponent } ,
                // canDeactivate: [PreventUnsavedChanges] },

            // Video 97
            // Para que el usuario pueda editar su propia info.
            { path: 'member/edit', component: MemberEditComponent, resolve: {user: MemberEditResolver},
                canDeactivate: [PreventUnsavedChanges] },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListsComponent },
        ]
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
