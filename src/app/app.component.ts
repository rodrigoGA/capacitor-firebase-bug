import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { MarkdownModule } from 'ngx-markdown';
import { Preferences } from '@capacitor/preferences';

//register swiper
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule,   ],

})
export class AppComponent {
  constructor() {
    //set dark mode
    Preferences.get({ key: 'darkMode' }).then((value) => {
      document.body.classList.toggle('dark', (value.value == 'true'));
    });
  }
}
