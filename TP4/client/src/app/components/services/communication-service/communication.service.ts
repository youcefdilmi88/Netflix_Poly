import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
//import {Hotel} from "../../../../common/tables/Hotel";
//import {Room} from "../../../../common/tables/Room";
import { of, Observable,concat, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Movie } from "../../../models/Movie";
import { Membre } from "../../../models/Membre";
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


    public getMovies(): Observable<any[]> {

        return this.http.get<Movie[]>(this.BASE_URL + "/movies").pipe(
            catchError(this.handleError<Movie[]>("getMovies")),
        );
    }


    public getMembres(): Observable<any[]> {

      return this.http.get<Movie[]>(this.BASE_URL + "/membres").pipe(
          catchError(this.handleError<Movie[]>("getMovies")),
      );
  }

    public login(email: string, password: string): Observable<Membre[]> {
        return this.http.get<Membre[]>(this.BASE_URL + `/login?email=${email}&password=${password}`).pipe(
          catchError(this.handleError<Membre[]>("login")),
    );

    }



    public getHotelPKs(): Observable<string[]> {

        return this.http.get<string[]>(this.BASE_URL + "/hotel/hotelNo").pipe(
            catchError(this.handleError<string[]>("getHotelPKs")),
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


    // public insertRoom(room: Room): Observable<number> {
    //     return this.http.post<number>(this.BASE_URL + "/rooms/insert", room).pipe(
    //         catchError(this.handleError<number>("inserHotel")),
    //     );
    // }

    public deleteHotel(): void {
    }


    public setUpDatabase(): Observable<any> {
        return concat(this.http.post<any>(this.BASE_URL + "/createSchema", []),
                      this.http.post<any>(this.BASE_URL + "/populateDb", []));
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
