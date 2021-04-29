import { Component, OnInit } from '@angular/core';
import { SocieteModule } from 'src/app/Models/societe/societe.module';
import { SocieteService } from 'src/app/Service/societe.service';
import { ConfirmationDialogService } from 'src/app/Views/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-index-societe',
  templateUrl: './index-societe.component.html',
  styleUrls: ['./index-societe.component.css']
})
export class IndexSocieteComponent implements OnInit {
  societes: SocieteModule[];
  constructor(private societeService: SocieteService , private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getAllSociete();
  }
  getAllSociete(): void {
    this.societeService.getListSociete()
      .subscribe(
        data => {
          this.societes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
   public openConfirmationDialog(id: number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => {
     if (confirmed === true){this.societeService.deleteSociete(id).subscribe(
      response => {
        console.log(response);
        this.getAllSociete();
      },
      error => {
        console.log(error);
      }); }
    }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
