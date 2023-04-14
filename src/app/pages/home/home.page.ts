import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,  RouterModule]
})
export class HomePage implements OnInit {

  angularFireAuthToken: string | null = '';
  customFireAuthToken: string  | null = '';

  constructor(
    private authService: AuthService,
    private readonly router: Router 
  ) { }

  ngOnInit() {
  }



  ionViewWillEnter(){
    this.authService.getIdTokenAngularFirebase().then((token)=>{
      this.angularFireAuthToken = token;
    } );

    this.authService.getIdTokenCustom().then((token)=>{
      this.customFireAuthToken = token;
    } );

  }

  public logout() {
    this.authService.logout()
    .then(() => this.router.navigate(['/login']))
    .catch((e) => console.log("error en logout", e));
  }




}
