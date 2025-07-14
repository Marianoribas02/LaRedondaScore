import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {


  urlbase:string='http://localhost:3000'

  



  // Constructor
  constructor(private http:HttpClient, private router:Router) { }


    // Método para registrar un nuevo usuario
    register(username: string, password: string,userData?: any): Observable<any> {
      // Primero, buscamos si el usuario ya está registrado
      return this.http.get<any[]>(`${this.urlbase}/users?username=${username}`).pipe(
        map(users => {
          // Si hay usuarios con ese nombre de usuario, lanzamos un error
          if (users && users.length > 0) {
            throw new Error('El usuario ya existe');
          }
        

          return this.http.post(`${this.urlbase}/users`, userData).subscribe();
        }),
        catchError((error) => {
          // Si hubo un error, lo devolvemos para manejarlo en el componente
          throw error;
        })
      );
    }
  
   // Método para hacer login
  login(username: string, password: string): Observable<any> {
    // Aquí buscamos al usuario por su username y password
    
    return this.http.get<any[]>(`http://localhost:3000/users?username=${username}&password=${password}&loginTipo=manual`);

  }

  // Método para hacer logout
  logout(): void {
    localStorage.removeItem('userId');  // Elimina el ID del usuario de localStorage
    this.router.navigate(['/login-page']);  // Redirige al usuario al login
    localStorage.removeItem('currentUserId');
  }


  addGoogleUser(userData: any) {
    return this.http.post(`${this.urlbase}`, userData); 
  }
  
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlbase}/users`);  // Asegúrate de que esta URL sea correcta
  }
  
  
 
// Actualizar contraseña del usuario
updatePassword(userId: string, newPassword: string): Observable<any> {
  return this.http.patch(`${this.urlbase}/users/${userId}`, { password: newPassword });
}


// Obtener el usuario logueado por ID
getUserById(id: string): Observable<any> {
  return this.http.get<any>(`${this.urlbase}/users/${id}`);
}

// Obtener sus favoritos por ID de usuario
getFavoritosByUserId(userId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.urlbase}/favoritos?userId=${userId}`);
}


}
