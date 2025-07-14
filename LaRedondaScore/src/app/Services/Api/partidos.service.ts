import { Injectable} from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartidoService {
  private apiKey = 'c7c13a8d5c6dc23c02fbc5e31268ede9'; 
  private apiUrl = 'https://v3.football.api-sports.io';
  private apiUrlstanding = 'https://v3.football.api-sports.io/standings';
  private apiUrlfixture= 'https://v3.football.api-sports.io/fixtures'; 
  private apiRoundsUrl = 'https://v3.football.api-sports.io/fixtures/rounds';

  constructor(private http: HttpClient) {}




  getEventosDelPartido(id: string) {
  return this.http.get<any>(`https://v3.football.api-sports.io/fixtures/events?fixture=${id}`, {
    headers: {
      'x-apisports-key': this.apiKey
    }
  });
}
 

getPartidosDelDia(date: string): Observable<any> {
  const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey
  };

  const url = `${this.apiUrl}/fixtures?date=${date}&timezone=America/Argentina/Buenos_Aires`;

  return this.http.get<any>(url, { headers }).pipe(
    catchError(error => {
      console.error('Error al obtener los partidos del día', error);
      return throwError(() => error);
    })
  );
}


  getPartidoPorId(id: string): Observable<any> {
    const headers = {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    };

    return this.http.get<any>(`${this.apiUrl}/fixtures?id=${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener los detalles del partido', error);
        return throwError(error);
      })
    );
  }

   // Método para obtener todos los países
   getCountries(): Observable<any> {
    const headers = {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    };
    return this.http.get<any>(`${this.apiUrl}/countries`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener los países', error);
        return throwError(error);
      })
    );
  }

  getleagues():Observable<any>
  {

    const headers = {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    };
    return this.http.get<any>(`${this.apiUrl}/leagues`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener las ligas', error);
        return throwError(error);
      })
    );

  }


  getEquiposPorNombre(teamName: string): Observable<any> {
    const headers = {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': this.apiKey
    };

    return this.http.get<any>(`${this.apiUrl}/teams?name=${teamName}`, { headers }).pipe(
        catchError(error => {
            console.error('Error al obtener el equipo', error);
            return throwError(error);
        })
    );
}

getEquiposPorID(id: string): Observable<any> {
  const headers = {
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
  };

  return this.http.get<any>(`${this.apiUrl}/teams?id=${id}`, { headers }).pipe(
      catchError(error => {
          console.error('Error al obtener el equipo', error);
          return throwError(error);
      })
  );
}

getLeagueDetails(id: string): Observable<any> {
  const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey
  };

  return this.http.get<any>(`${this.apiUrl}/leagues?id=${id}`, { headers }).pipe(
    catchError(error => {
      console.error('Error al obtener los detalles de la liga', error);
      return throwError(error);
    })
  );
}

getSeasonStats(id: string): Observable<any> {
  const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey
  };

  return this.http.get<any>(`${this.apiUrl}/leagues?id=${id}`, { headers }).pipe(
        catchError(error => {
      console.error('Error al obtener las estadísticas de la temporada', error);
      return throwError(error);
    })
  );
}


getPartidosPorLiga(leagueId: number, season: string): Observable<any> {
  const headers = new HttpHeaders({
    'x-rapidapi-key': this.apiKey, 
  });

  return this.http.get<any>(`${this.apiUrl}/fixtures?league=${leagueId}&season=${season}`, { headers });
}

getAvailableSeasons(): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/leagues/seasons`);
}



getStandings(leagueId: number, season: string): Observable<any> {
  const headers = new HttpHeaders({
    'x-rapidapi-key': this.apiKey, 
  });

  return this.http.get<any>(`${this.apiUrl}/standings?league=${leagueId}&season=${season}`, { headers });
}



// Nuevo metodo para buscar jugadores por nombre :)
getJugadoresPorNombre(name: string): Observable<any> {
  const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey
  };

  return this.http.get<any>(`${this.apiUrl}/players/profiles?search=${name}`, { headers }).pipe(
    tap(data => console.log('Datos obtenidos:', data)),
    catchError(error => {
      console.error('Error al obtener el jugador', error);
      return throwError(error);
    })
  );
}


getJugadoresPorID(id: string): Observable<any> {
  const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey
  };

  return this.http.get<any>(`${this.apiUrl}/players/profiles?player=${id}`, { headers }).pipe(
    tap(data => console.log('Datos obtenidos:', data)),
    catchError(error => {
      console.error('Error al obtener el jugador', error);
      return throwError(error);
    })
  );
}

getDtPorNombre(name: string): Observable<any> {
  const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey
  };

  return this.http.get<any>(`${this.apiUrl}/coachs?search=${name}`, { headers }).pipe(
    tap(data => console.log('Datos obtenidos:', data)),
    catchError(error => {
      console.error('Error al obtener el jugador', error);
      return throwError(error);
    })
  );
}

getDtPorID(id: string): Observable<any> {
  const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey
  };

  return this.http.get<any>(`${this.apiUrl}/coachs?id=${id}`, { headers }).pipe(
    tap(data => console.log('Datos obtenidos:', data)),
    catchError(error => {
      console.error('Error al obtener el jugador', error);
      return throwError(error);
    })
  );
}


  // Obtener las rondas disponibles para una liga y temporada
  getRounds(leagueId: number, season: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });
    const url = `${this.apiRoundsUrl}?season=${season}&league=${leagueId}`;
    return this.http.get<any>(url, { headers });
  }

  // Obtener los partidos de una liga, temporada y ronda específicos
  getPartidosPorRonda(leagueId: number, season: string, round: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-rapidapi-host': 'v3.football.api-sports.io',
      'x-rapidapi-key': this.apiKey
    });
    const url = `${this.apiUrlfixture}?season=${season}&league=${leagueId}&round=${round}`;
    return this.http.get<any>(url, { headers });
  }


getFixtureStatistics(fixtureId: string, usarHalf: boolean): Observable<any> {
  const headers = new HttpHeaders({
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': this.apiKey
  });

  let params = new HttpParams().set('fixture', fixtureId.toString());

  if (usarHalf) {
    params = params.set('half', 'true'); // Pide estadísticas con Fulltime, primer y segundo tiempo
  }

  return this.http.get<any>(`${this.apiUrl}/fixtures/statistics`, { headers, params }).pipe(
    catchError(error => {
      console.error('Error al obtener estadísticas del fixture', error);
      return throwError(() => error);
    })
  );
}


  
}


