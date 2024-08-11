import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SearchComponent } from './Components/search/search.component';
import { LoadingComponent } from './Components/loading/loading.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './Services/interceptors/error.interceptor';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent, LoadingComponent, MatIconModule, MatToolbarModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'User Dashboard';

  constructor(private router: Router) {}

  onSearch(searchId: string): void {
    if (searchId) {
      this.router.navigate(['/user', searchId]);
    }
  }
}
