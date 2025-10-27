import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';  //, provideBrowserGlobalErrorListeners
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFirestore(() => getFirestore()),
    // provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyBAh_OzufIkom4uY7CExGyorOYux1_Vvrc",
      authDomain: "ring-of-fire-2bce9.firebaseapp.com",
      projectId: "ring-of-fire-2bce9",
      storageBucket: "ring-of-fire-2bce9.firebasestorage.app",
      messagingSenderId: "778105502348",
      appId: "1:778105502348:web:03c52d667bab111f1959a9"
    })),


  ]
};
