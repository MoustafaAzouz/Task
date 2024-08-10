import { Routes } from '@angular/router';
import { UserListComponent } from './Components/user-list/user-list.component';
import { UserDetailsComponent } from './Components/user-details/user-details.component';

export const routes: Routes = [

    { path: '', component: UserListComponent },
    { path: 'user/:id', component: UserDetailsComponent }

];
