import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/photo';
import { Player } from 'src/app/_models/player';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PlayerService } from 'src/app/_services/player.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getPlayerPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  response: string;
  player: Player;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor(private route: ActivatedRoute, private playerService: PlayerService, private alertify: AlertifyService) {
    this.hasBaseDropZoneOver = false;

    this.response = '';

    // this.uploader.response.subscribe( res => this.response = res );
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.player = data['player'];
    });

    this.initializeUploader();
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    // Ver Video 111
    this.uploader = new FileUploader({
      url: this.baseUrl + 'players/' + this.player.id + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024 // ,
      /*disableMultipart: true, // 'DisableMultipart' must be 'true' for formatDataFunction to be called.
      formatDataFunctionIsAsync: true,
      formatDataFunction: async (item) => {
        return new Promise( (resolve, reject) => {
          resolve({
            name: item._file.name,
            length: item._file.size,
            contentType: item._file.type,
            date: new Date()
          });
        });
      }*/
    });

    // Video 112
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          main: res.main
        };
        this.photos.push(photo);
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.playerService.setMainPhoto(this.player.id, photo.id).subscribe(() => {
      // Video 115
      this.currentMain = this.photos.filter(p => p.main === true)[0];
      this.currentMain.main = false;
      photo.main = true;
      // Video 116
      this.getPlayerPhotoChange.emit(photo.url);
    }, error => {
      this.alertify.error(error);
    });
  }

  // Video 121
  deletePhoto(id: number) {
    this.alertify.confirm('Seguro que desea eliminar la foto?', () => {
      this.playerService.deletePhoto(this.player.id, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('La foto fue eliminada');
      }, error => {
        this.alertify.error('Error al eliminar la foto');
      });
    });
  }

}
