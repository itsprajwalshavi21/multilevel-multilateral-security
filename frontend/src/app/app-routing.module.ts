import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskViewComponent } from './pages/task-view/task-view.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { PublicPageComponent } from './pages/public-page/public-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'new-list', component: NewListComponent },
  { path: 'edit-list/:listId', component: EditListComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'lists', component: TaskViewComponent },
  { path: 'lists/:listId', component: TaskViewComponent },
  { path: 'lists/:listId/new-task', component: NewTaskComponent },
  { path: 'lists/:listId/edit-task/:taskId', component: EditTaskComponent },
  { path: 'public', component: PublicPageComponent },
  { path: 'public/:listId', component: PublicPageComponent },
  {
    path: 'public/lists/:listId',
    redirectTo: '/plists/:listId',
    pathMatch: 'full',
  },
  { path: 'admin', component: AdminPageComponent },
  { path: 'admin/:listId', component: AdminPageComponent },
  // { path: 'admin/:listId/new-task', component: NewTaskComponent },
  // { path: 'admin/:listId/edit-task/:taskId', component: EditTaskComponent },
  { path: 'home', component: LandingPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
