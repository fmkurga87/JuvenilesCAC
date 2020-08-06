import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Player } from 'src/app/_models/player';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { PlayerService } from 'src/app/_services/player.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {
  @ViewChild('editForm', {static: true}) editForm: NgForm;
  player: Player;
  // Video 100. Para que le salte un mensaje al usuario si quiere cerrar la pestaña sin guardar.
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private alertify: AlertifyService,
              private playerService: PlayerService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.player = data['player'];
    });
  }

  updatePlayer(playerId: number) {
    this.playerService.updatePlayer(this.player.id, this.player).subscribe(
      next => {
        this.alertify.success('Jugador actualizado correctamente');
        // Video 99, para ocultar mensaje de no guardado y deshabilitar el boton guardar.
        this.editForm.reset(this.player);
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  // Video 116
  updateMainPhoto(photoUrl) {
    this.player.photoUrl = photoUrl;
  }

}
