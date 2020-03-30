import { Component, OnInit } from '@angular/core';
import { Player } from '../../_models/player';
import { AlertifyService } from '../../_services/alertify.service';
import { PlayerService } from '../../_services/player.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.css']
})
export class PlayersListComponent implements OnInit {
  players: Player[];

  constructor(private playerService: PlayerService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.players = data['players'];
    });
    // this.loadPlayers();
  }

  // loadPlayers() {
  //   this.playerService.getPlayers().subscribe((players: Player[]) => {
  //     this.players = players;
  //   }, error => {
  //     this.alertify.error(error);
  //   });
  // }
}
