import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AreaComponent} from './area/area.component';
import {ProfileComponent} from './profile/profile.component';
import {ServicesComponent} from './services/services.component';
import {AuthGuard} from './auth.guard';
import {ApkComponent} from './apk/apk.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'area', component: AreaComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'services', component: ServicesComponent, canActivate: [AuthGuard]},
  {path: 'client.apk', component: ApkComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
