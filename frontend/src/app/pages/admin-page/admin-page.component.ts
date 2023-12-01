import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';
import { User } from 'src/app/models/user.model';
import { List } from 'src/app/models/list.model';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
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

  isUserAdmin(userId: string): boolean {
    const user = this.users.find((u) => u._id === userId);
    return user ? user.isAdmin : false; // Return isAdmin status or default to false if user not found
  }

  onTaskClick(task: Task) {
    // // we want to set the task to completed
    // this.taskService.complete(task).subscribe(() => {
    //   // the task has been set to completed successfully
    //   console.log("Completed successully!");
    //   task.completed = !task.completed;
    // })
  }

  onDeleteListClick() {
    this.taskService.deleteAdminList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/admin']);
      console.log("Returned");
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteAdminTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks! = this.tasks!.filter(val => val._id !== id);
      console.log(res);
    })
  }
}
