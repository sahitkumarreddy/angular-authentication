import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private _regularEventsUrl = "http://localhost:3000/api/regularevents";
  private _specialEventsUrl = "http://localhost:3000/api/specialevents";
  constructor(private http:HttpClient) { }

  getRegularEvents(){
    return this.http.get<any>(this._regularEventsUrl)
    .pipe(catchError(this.errorHandler))
  }

  getSpecialEvents(){
    return this.http.get<any>(this._specialEventsUrl)
    .pipe(catchError(this.errorHandler))
  }

  errorHandler(error : HttpErrorResponse){
    return throwError(error);
  }
}
