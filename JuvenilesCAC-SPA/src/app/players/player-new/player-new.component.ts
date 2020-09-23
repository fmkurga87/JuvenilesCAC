import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Player } from 'src/app/_models/player';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { PlayerService } from 'src/app/_services/player.service';

@Component({
  selector: 'app-player-new',
  templateUrl: './player-new.component.html',
  styleUrls: ['./player-new.component.css']
})
export class PlayerNewComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  player: Player;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private playerService: PlayerService, private alertify: AlertifyService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-dark-blue'
    };
    this.createPlayerForm();
  }

  createPlayerForm() {
    this.registerForm = this.fb.group({
      surname: ['', Validators.required],
      name: ['', Validators.required],
      dateOfBirth: [''],
    });
  }

  create() {
    if (this.registerForm.valid) {
      this.player = Object.assign({}, this.registerForm.value);
      this.playerService.newPLayer(this.player).subscribe(() => {
        this.alertify.success('Registro exitoso.');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(['/players']);
      });
    }
  }

  // cancel() {
  //   this.cancelRegister.emit(false);
  //   console.log('Cancelado');
  // }

}
