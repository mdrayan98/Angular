// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-task-board',
//   templateUrl: './task-board.component.html',
//   styleUrls: ['./task-board.component.scss']
// })
// export class TaskBoardComponent {

// }

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html'
})
export class TaskBoardComponent implements OnInit {
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.todo = tasks.filter((t) => t.status === 'To Do');
      this.inProgress = tasks.filter((t) => t.status === 'In Progress');
      this.done = tasks.filter((t) => t.status === 'Done');
    });
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent);
    dialogRef.afterClosed().subscribe((task: Task) => {
      if (task) {
        this.taskService.addTask(task).subscribe((newTask) => {
          this.todo.push(newTask);
        });
      }
    });
  }

  drop(event: CdkDragDrop<Task[]>, status: Task['status']): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.status = status;
      this.taskService.updateTask(task).subscribe(() => {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      });
    }
  }
}