import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule } from 'ngx-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { PlayersListComponent } from './players/players-list/players-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { PlayerCardComponent } from './players/player-card/player-card.component';
import { PlayerDetailComponent } from './players/player-detail/player-detail.component';
import { PlayerDetailResolver } from './_resolvers/player-detail.resolver';
import { PlayerListResolver } from './_resolvers/player-list.resolver';
import { PlayerEditComponent } from './players/player-edit/player-edit.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './players/photo-editor/photo-editor.component';
import { PlayerEditResolver } from './_resolvers/player-edit.resolver';
import { PlayerNewComponent } from './players/player-new/player-new.component';


export function fxTokenGetter() {
   return localStorage.getItem('token');
}

// Video 94
export class CustomHammerConfig extends HammerGestureConfig {
   overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
   };
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      PlayersListComponent,
      ListsComponent,
      MessagesComponent,
      PlayerCardComponent,
      PlayerDetailComponent,
      PlayerEditComponent,
      PlayerNewComponent,
      MemberEditComponent,
      PhotoEditorComponent
   ],
   imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BsDatepickerModule.forRoot(),
      TabsModule.forRoot(),
      BrowserAnimationsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxGalleryModule,
      FileUploadModule,
      JwtModule.forRoot({
         config: {
            tokenGetter: fxTokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/api/auth']
         }
      })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      PlayerDetailResolver,
      PlayerListResolver,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig },
      MemberEditResolver,
      PreventUnsavedChanges,
      PlayerEditResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
