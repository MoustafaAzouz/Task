import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://reqres.in/api/users';
  private cacheKey = 'usersData';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}
  fetchPage(page: number): Observable<any> {
    const usersData = this.cookieService.get(this.cacheKey);
    if (usersData) {
      const parsedData = JSON.parse(usersData);
      const pageData = parsedData.find((data: any) => data.page === page);
      if (pageData) {
        return of(pageData);
      }
    }

    return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
      map(response => {
        const currentData = usersData ? JSON.parse(usersData) : [];
        currentData.push(response);
        this.cookieService.set(this.cacheKey, JSON.stringify(currentData));
        return response;
      }),
      catchError(() => of(null))
    );
  }

  getAllUsers(): any[] {
    const usersData = this.cookieService.get(this.cacheKey);
    if (usersData) {
      const parsedData = JSON.parse(usersData);
      return parsedData.flatMap((pageData: any) => pageData.data); 
    }
    return [];
  }

  fetchUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
