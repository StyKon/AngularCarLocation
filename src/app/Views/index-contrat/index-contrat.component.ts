import { Component, OnInit } from '@angular/core';
import { ContratModule } from 'src/app/Models/contrat/contrat.module';
import { ContratService } from 'src/app/Service/contrat.service';
import { ConfirmationDialogService } from 'src/app/Views/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-index-contrat',
  templateUrl: './index-contrat.component.html',
  styleUrls: ['./index-contrat.component.css']
})
export class IndexContratComponent implements OnInit {
  contrats: ContratModule[];
  constructor(private contratService: ContratService , private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getAllContrat();
  }
  getAllContrat(): void {
    this.contratService.getListContrat()
      .subscribe(
        data => {
          this.contrats = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
   public openConfirmationDialog(id: number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => {
     if (confirmed === true){this.contratService.deleteContrat(id).subscribe(
      response => {
        console.log(response);
        this.getAllContrat();
      },
      error => {
        console.log(error);
      }); }
    }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
