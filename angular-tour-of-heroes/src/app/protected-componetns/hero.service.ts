import { Injectable } from '@angular/core';

import { Hero } from '../shared/models/hero';

import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesBaseUrl = 'http://localhost:5050/api/heroes';

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  getHeroes(token: string): Observable<Hero[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    return this.http.get<Hero[]>(this.heroesBaseUrl, httpOptions).pipe(
      tap(_ => this.messageService.add('HeroService: fetched heroes')),
      catchError(this.handleError<Hero[]>(`getHeroes`))
    );
  }

  getHero(id: number, token: string): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    const url = `${this.heroesBaseUrl}/${id}`;

    return this.http.get<Hero>(url, httpOptions).pipe(
      tap(_ => this.messageService.add(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero, token: string): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    const url = `${this.heroesBaseUrl}/${hero.id}`;

    return this.http.put<Hero>(url, hero, httpOptions).pipe(
      tap(_ => this.messageService.add(`updated hero id=${hero.id}`)),
      catchError(this.handleError<Hero>(`updateHero id=${hero.id}`))
    );
  }

  addHero(hero: Hero, token: string): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    return this.http.post<Hero>(this.heroesBaseUrl, hero, httpOptions).pipe(
      tap(_ => this.messageService.add(`updated hero id=${hero.id}`)),
      catchError(this.handleError<Hero>(`addHero id=${hero.id}`))
    );
  }

  deleteHero(id: number, token: string): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': token
      })
    };

    const url = `${this.heroesBaseUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.messageService.add(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>(`deleteHero id=${id}`))
    );
  }

private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
