import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {





  urlbase: string = 'http://localhost:3000';

  currentUserId: number | null = null; 

  // Constructor
  constructor(private http: HttpClient) {}



     // Método para obtener el id de la sesión activa
  getUserId(): number | null {
    return this.currentUserId; 
  }

      // Método para agregar un equipo a la lista de favoritos de la sesion activa
  addFavoriteTeam(userId: string, teamName: string, teamImage: string, teamId: string): Observable<any> {
    return this.http.get<any[]>(`${this.urlbase}/favoritos/?userId=${userId}`).pipe(
      switchMap(favoritos => {
        if (favoritos.length > 0) {
          const favorito = favoritos[0];
          const equipoYaExiste = Object.values(favorito.equipos).some(
            (equipo: any) => equipo.nombre === teamName
          );
  
          if (!equipoYaExiste) {
            const newId = Object.keys(favorito.equipos).length + 1;
            favorito.equipos[newId] = {
              nombre: teamName,
              imagen: teamImage,
              id: teamId
            };
  
            return this.http.put(`${this.urlbase}/favoritos/${favorito.id}`, favorito);
          } else {
            return of({ message: 'El equipo ya está en tus favoritos' });
          }
        } else {
          const nuevoFavorito = {
            userId: userId,
            equipos: {
              1: {
                nombre: teamName,
                imagen: teamImage,
                id: teamId
              }
            }
          };
  
          return this.http.post(`${this.urlbase}/favoritos`, nuevoFavorito);
        }
      })
    );
  }
  
        // Método para eliminar equipo a la lista de favoritos de la sesion activa
  removeFavoriteTeam(userId: string, teamName: string): Observable<any> {
    return this.http.get<any[]>(`${this.urlbase}/favoritos/?userId=${userId}`).pipe(
      switchMap(favoritos => {
        if (favoritos.length > 0) {
          const favorito = favoritos[0];
          
          // Buscar el equipo en los favoritos
          const equipoId = Object.keys(favorito.equipos).find(key => favorito.equipos[key].nombre === teamName);

          if (equipoId) {
            // Eliminar el equipo
            delete favorito.equipos[equipoId];

            // Actualizar los favoritos del usuario en la base de datos
            return this.http.put(`${this.urlbase}/favoritos/${favorito.id}`, favorito);
          } else {
            return of({ message: 'El equipo no está en tus favoritos' });
          }
        } else {
          return of({ message: 'No se encontraron favoritos para el usuario' });
        }
      })
    );
  }

      // Método para obtener la lista de favoritos de la sesion activa
  getFavoriteTeams(userId: string): Observable<{ [key: string]: { nombre: string; imagen: string; id:string} }> {
    return this.http.get<any[]>(`${this.urlbase}/favoritos/?userId=${userId}`).pipe(
      map(favoritos => {
        if (favoritos.length > 0) {
          return favoritos[0].equipos; // Devuelve el objeto "equipos" con nombre e imagen
        }
        return {}; // Si no existe el usuario, devuelve un objeto vacío
      })
    );
  }


}
