import { ActivatedRoute, Router } from '@angular/router';
import { WebApiService } from './web-api-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private baseApi: WebApiService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {}
  assignDashboard(): any {
    this.router.navigate(['/dashboard']);
  }
  login(data: any): any {
    if (!data) return;
    const url = 'api/Auth/login';
    return this.http.post<any>(`${this.baseApi.base}${url}`, data).pipe(
      map((user) => {
        this.setLocalStorageLoginVlaue(user.token, user.expiration);
        return user;
      }),
    );
  }
  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('expiration');
    this.router.navigate(['auth/sign-in'])

  }
  public setLocalStorageLoginVlaue(jwt: string, expiration: any) {
    localStorage.setItem('expiration', expiration);
    localStorage.setItem('jwt', jwt);
  }
}
