import { importProvidersFrom, NgModule } from '@angular/core';

import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { provideHttpClient, HttpClientModule, withFetch, HttpClient } from '@angular/common/http';
import { DatabaseService } from './services/database.service';
import { HomePageRoutingModule } from './home/home-routing.module';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, IonicModule.forRoot(),
    // RouterModule.forRoot([]),

    //Material
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatDividerModule,
    MatCardModule,

    HomePageRoutingModule,
    AppRoutingModule,



    //Firebase:
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },


    AngularFireDatabase,


    AngularFireDatabase,
    DatabaseService,
  provideHttpClient() // Substitui HttpClientModule

  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'favorite',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/favorite.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'arrow_back',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow_back.svg'),
    );

    this.matIconRegistry.addSvgIcon(
      'arrow_forward',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/arrow_forward.svg'),
    );

  }
}
