import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { MarkdownModule } from 'ngx-markdown';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClient } from '@angular/common/http';
import { MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { FirebaseApp, getApp, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth, initializeAuth, indexedDBLocalPersistence } from '@angular/fire/auth';
import { Capacitor } from '@capacitor/core';


/**
 * angular fire
 */

const initFirebaseAuth = () => {
  if (Capacitor.isNativePlatform()) {
    return initializeAuth(getApp(), {
      persistence: indexedDBLocalPersistence
    });
  } else {
    return getAuth();
  }
};

// const initFirebase = ()=> {
//   const app = initializeApp(environment.firebase);
//   //if (Capacitor.isNativePlatform) {
//     initializeAuth(app, {
//       persistence: indexedDBLocalPersistence
//     });
//   //}
//   // this.firestore = getFirestore(app);
//   return app;
// }


// const myGetAuth = ()=>{
//   const app = initializeApp(environment.firebase);
//   return initializeAuth(app, {
//       persistence: indexedDBLocalPersistence
//   });
// }

//end angular fire
// using specific option with FactoryProvider

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase))),
    importProvidersFrom(provideAuth(() => initFirebaseAuth())),
    // importProvidersFrom(provideFirebaseApp(() => initializeApp(environment.firebase) ), provideAuth(() => initFirebaseAuth())),
    importProvidersFrom(MarkdownModule.forRoot({
      loader: HttpClient,
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory,
      },
    })),
  ],
  
});



// function that returns `MarkedOptions` with renderer override
export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  renderer.table = (header, body) => {
    if (body) body = `<tbody>${body}</tbody>`;

    return '<div class="table-wrapper">\n'
      +'<table>\n'
      + '<thead>\n'
      + header
      + '</thead>\n'
      + body
      + '</table>\n'
      + '</div>\n';
  }
  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false,
  };
}
