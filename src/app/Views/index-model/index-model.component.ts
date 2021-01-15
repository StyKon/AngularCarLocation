import { Component, OnInit } from '@angular/core';
import { ModelModule } from 'src/app/Models/model/model.module';
import { ModelService } from 'src/app/Service/model.service';
import { ConfirmationDialogService } from 'src/app/Views/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-index-model',
  templateUrl: './index-model.component.html',
  styleUrls: ['./index-model.component.css']
})
export class IndexModelComponent implements OnInit {
  models: ModelModule[];
  constructor(private modelService: ModelService , private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getAllModel();
  }
  getAllModel(): void {
    this.modelService.getListModel()
      .subscribe(
        data => {
          this.models = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
   public openConfirmationDialog(id: number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => {
     if (confirmed === true){this.modelService.deleteModel(id).subscribe(
      response => {
        console.log(response);
        this.getAllModel();
      },
      error => {
        console.log(error);
      }); }
    }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
