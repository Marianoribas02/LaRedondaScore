import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import{initializeApp} from 'firebase/app';
import{AngularFireModule} from '@angular/fire/compat';
import{AngularFirestoreModule} from '@angular/fire/compat/firestore';


import { routes } from './app.routes';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';


const firebaseConfig = {
  apiKey: "AIzaSyAEaNwkzAM2m9qYI2xR9YXmNhST1XogJb8",
  authDomain: "laredondascore.firebaseapp.com",
  projectId: "laredondascore",
  storageBucket: "laredondascore.firebasestorage.app",
  messagingSenderId: "224131712672",
  appId: "1:224131712672:web:781a817c21d9195bd1ebc5",
  measurementId: "G-VRG7HQWZJX"
};


initializeApp(firebaseConfig);


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(),importProvidersFrom(HttpClientModule,AngularFireModule.initializeApp(firebaseConfig),AngularFirestoreModule)] 
};
