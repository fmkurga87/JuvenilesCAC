import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from '../_models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.baseUrl + 'players');
  }

  getPlayer(id): Observable<Player> {
    return this.http.get<Player>(this.baseUrl + 'players/' + id);
  }

  newPLayer(player: Player) {
    return this.http.post(this.baseUrl + 'players/new', player);
  }

  updatePlayer(id: number, player: Player) {
    return this.http.put(this.baseUrl + 'players/' + id, player);
  }

  setMainPhoto(playerId: number, id: number) {
    return this.http.post(this.baseUrl + 'players/' + playerId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(playerId: number, id: number) {
    return this.http.delete(this.baseUrl + 'players/' + playerId + '/photos/' + id);
  }
}
