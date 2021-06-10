import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from './core/material.module';
import {FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AreaComponent, AreaModalAction, AreaModalReaction } from './area/area.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { ServicesComponent } from './services/services.component';
import { HttpModule } from '@angular/http';
import { ApkComponent } from './apk/apk.component';


const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('208702597192087')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AreaComponent,
    ProfileComponent,
    AreaModalAction,
    AreaModalReaction,
    ServicesComponent,
    ApkComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule.initialize(config),
    HttpModule
  ],
  entryComponents: [AreaComponent, AreaModalAction, AreaModalReaction],
  providers: [AreaComponent, {
    provide: AuthServiceConfig,
    useFactory: provideConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
