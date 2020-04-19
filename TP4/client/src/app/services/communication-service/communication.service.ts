import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, Observable,concat, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Movie } from "../../models/Movie";
import { Membre } from "../../models/Membre";
import { Nomination } from '../../models/nomination'
import { Participant } from '../../models/participant'
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CommunicationService {

    DBcreated: boolean = false;
    private activeDBcreated = new BehaviorSubject(this.DBcreated);
    obsDB = this.activeDBcreated.asObservable();

    setDBcreated(created: boolean) {
      this.activeDBcreated.next(created);
    }

    getDBcreated() {
      return this.activeDBcreated.value;
    }

    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor(private http: HttpClient) { }

    private _listners: any = new Subject<any>();


    public listen(): Observable<any> {
       return this._listners.asObservable();
    }

    public filter(filterBy: string): void {
       this._listners.next(filterBy);
    }


    public setUpDatabase(): Observable<any> {
      return concat(this.http.post<any>(this.BASE_URL + "/createSchema", []),
                    this.http.post<any>(this.BASE_URL + "/populateDb", []));
    }


    public login(email: string, password: string): Observable<Membre[]> {
      return this.http.get<Membre[]>(this.BASE_URL + `/login?email=${email}&password=${password}`).pipe(
        catchError(this.handleError<Membre[]>("login")),
      );
    }


    public getMovies(): Observable<any[]> {
        return this.http.get<Movie[]>(this.BASE_URL + "/movies").pipe(
            catchError(this.handleError<Movie[]>("getMovies")),
        );
    }


    public getMembres(): Observable<any[]> {
      return this.http.get<Movie[]>(this.BASE_URL + "/membres").pipe(
          catchError(this.handleError<Movie[]>("getMembres")),
      );
    }


    public getNominations(ID_film: number): Observable<any[]> {
      return this.http.get<Nomination[]>(this.BASE_URL + `/nominations?id=${ID_film}`).pipe(
          catchError(this.handleError<Nomination[]>("getNominations")),
      );
    }

    public getDistribution(ID_film: number): Observable<any[]> {
      return this.http.get<Participant[]>(this.BASE_URL + `/distribution?id=${ID_film}`).pipe(
          catchError(this.handleError<Participant[]>("getDistribution")),
      );
    }


    public insertMovie(movie: any): Observable<number> {
      return this.http.post<number>(this.BASE_URL + "/movies/insert", movie).pipe(
          catchError(this.handleError<number>("insertMovie")),
      );
    }

    public insertMembre(membre: Membre): Observable<number> {
      return this.http.post<number>(this.BASE_URL + "/membres/insert", membre).pipe(
          catchError(this.handleError<number>("insertMembre")),
      );
    }

    public editMovie(movie: Movie): Observable<number> {
      return this.http.put<number>(this.BASE_URL + "/movies/edit", movie).pipe(
        catchError(this.handleError<number>("editMovie")),
      );
    }


    public deleteMovie(ID_film: number): Observable<number> {
        return this.http.delete<number>(this.BASE_URL + `/movies/delete?id=${ID_film}`).pipe(
          catchError(this.handleError<number>("deleteMovie")),
      );
    }


    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {
      return (error: Error): Observable<T> => {
          return of(result as T);
      };
    }

}
