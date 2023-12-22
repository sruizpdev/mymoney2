import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-expense',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-expense.component.html',
  styleUrl: './edit-expense.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditExpenseComponent {
  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe((val: any) => {
      console.log(val);
      // this.editForm.patchValue({
      //   id: val.id,
      //   owner: val.owner,
      //   site: val.site,
      //   username: val.username,
      //   password: val.password,
      //   notes: val.notes,
      // });
    });
  }
}
