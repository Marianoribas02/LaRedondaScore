import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    const auth = getAuth();
    
    return new Observable<boolean>((observer) => {
      onAuthStateChanged(auth, (user) => {
        if (user && localStorage.getItem('userId')) {
          // El usuario está autenticado, permite el acceso
                    console.log(localStorage.getItem('userId'));

          observer.next(true);
        } else {
          // El usuario no está autenticado, redirige al login
          this.router.navigate(['/login-page']);
          observer.next(false);
          console.log(localStorage.getItem('userId'));
        }
        observer.complete();
      });
    });
  }
}
