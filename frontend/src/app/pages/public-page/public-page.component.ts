import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { User } from 'src/app/models/user.model';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-public-page',
  templateUrl: './public-page.component.html',
  styleUrls: ['./public-page.component.scss'],
})
export class PublicPageComponent implements OnInit {
  users: User[] = [];
  lists: List[] = [];
  tasks?: Task[];

  selectedListId: string = "";

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  
  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      const listId = params['listId']; // Get the listId from route params
      if (listId) {
        this.selectedListId = listId;
        
        this.taskService.getPublicTasks(listId).subscribe(
          (tasks: any) => {
            this.tasks = tasks;
          },
          (error: any) => {
            console.error("Error fetching tasks:", error);
            // Handle the error, e.g., display an error message or navigate to an error page.
          }
        );
      } else {
        this.tasks = undefined;
      }
    });
    

    this.taskService.getUsers().subscribe((user: any) => {
      this.users = user;
    });
    
    this.taskService.getPublicLists().subscribe((list: any) => {
      this.lists = list;
    });
  }
  Login() {
    this.router.navigate(['/login']);
  }

  isUserAdmin(userId: string): boolean {
    const user = this.users.find((u) => u._id === userId);
    return user ? user.isAdmin : false; // Return isAdmin status or default to false if user not found
  }
}
