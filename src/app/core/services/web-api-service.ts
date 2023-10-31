import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WebApiService {
  base: string;
  constructor(private httpClient: HttpClient) {
    this.base = 'https://localhost:7067/';  
  }
  get<T>(url: string, params: any = null): any {
    const token = localStorage.getItem('jwt');
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token != null) {
      // header = new HttpHeaders({ 'Content-Type': 'application/json' }).set(
      //   'Authorization',
      //   'Bearer ' + token
      // );

      header= new HttpHeaders({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization : "Bearer "  + localStorage.getItem("jwt"),
      })
    }
    if (!params) {
      return this.httpClient.get<T>(this.base + url, { headers: header });
    } else {
      return this.httpClient.get<T>(this.base + url + params, {
        headers: header,
      });
    }
  }
  post<T>(url: string, params: any = null): any {
    if (params) {
      const token = localStorage.getItem('jwt');
      let header = new HttpHeaders({ 'Content-Type': 'application/json' });
      if (token != null) {
        header = new HttpHeaders({ 'Content-Type': 'application/json' }).set(
          'Authorization',
          'Bearer ' + token
        );

      }
      return this.httpClient
        .post<T>(this.base + url, params, {
          headers: header,
        })
        .pipe(catchError(this.handleError));
    } else {
      return this.httpClient
        .post<T>(this.base + url, {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        })
        .pipe(catchError(this.handleError));
    }
  }
  postFile<T>(url: string, formData: FormData): any {
    if (formData) {
      return this.httpClient
        .post<T>(this.base + url, formData)
        .pipe(catchError(this.handleError));
    } else {
      return null;
    }
  }
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
    }
    if (
      error.error['ExceptionType'] &&
      error.error['ExceptionType'] === 'System.Security.SecurityException'
    ) {
      return throwError(() => error);
    } else {
      return throwError(() => error);
    }
  }
  delete<T>(url: string, params: any = null): any {
    const token = localStorage.getItem('jwt');
    let header = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (token != null) {
      header = new HttpHeaders({ 'Content-Type': 'application/json' }).set(
        'Authorization',
        'Bearer ' + token
      );
    }
    if (!params) {
      return this.httpClient.delete<T>(this.base + url, { headers: header });
    } else {
      return this.httpClient.delete<T>(this.base + url + params, {
        headers: header,
      });
    }
  }
}
