import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/_models/player';
import { PlayerService } from 'src/app/_services/player.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {
  player: Player;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private playerService: PlayerService, private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadPlayer();
    this.route.data.subscribe(data => {
      this.player = data['player'];
    });

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.player.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
        description: photo.description
      });
    }
    return imageUrls;
  }

  // loadPlayer() {
  //   // El + es para hacer que el parametro sea un int (en la url viene como string)
  //   this.playerService.getPlayer(+this.route.snapshot.params['id']).subscribe(
  //                                                                 (player: Player) => { this.player = player; },
  //                                                                 error => { this.alertify.error(error); }
  //                                                                 );
  // }

}
