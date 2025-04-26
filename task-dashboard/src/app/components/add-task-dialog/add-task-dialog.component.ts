// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-task-dialog',
//   templateUrl: './add-task-dialog.component.html',
//   styleUrls: ['./add-task-dialog.component.scss']
// })
// export class AddTaskDialogComponent {

// }

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html'
})
export class AddTaskDialogComponent {
  taskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTaskDialogComponent>
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['To Do', Validators.required]
    });
  }

  submit(): void {
    if (this.taskForm.valid) {
      const task: Task = { id: Date.now(), ...this.taskForm.value };
      this.dialogRef.close(task);
    }
  }
}

