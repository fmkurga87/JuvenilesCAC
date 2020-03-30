import { Injectable } from '@angular/core';
import { Player } from '../_models/player';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { PlayerService } from '../_services/player.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class PlayerListResolver implements Resolve<Player[]> {
    constructor(private playerService: PlayerService, private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Player[]> {
        return this.playerService.getPlayers().pipe(
            catchError(error => {
                this.alertify.error('Hubo un problema recuperando los datos.');
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}
