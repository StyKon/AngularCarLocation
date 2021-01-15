import { Component, OnInit } from '@angular/core';
import { ConducteurModule } from 'src/app/Models/conducteur/conducteur.module';
import { ConducteurService } from 'src/app/Service/conducteur.service';
import { ConfirmationDialogService } from 'src/app/Views/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-index-conducteur',
  templateUrl: './index-conducteur.component.html',
  styleUrls: ['./index-conducteur.component.css']
})
export class IndexConducteurComponent implements OnInit {
  conducteurs: ConducteurModule[];
  constructor(private conducteurService: ConducteurService , private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getAllConducteur();

  }
  getAllConducteur(): void {
    this.conducteurService.getListConducteur()
      .subscribe(
        data => {
          this.conducteurs = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  public openConfirmationDialog(id: number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => {
     if (confirmed === true){this.conducteurService.deleteConducteur(id).subscribe(
      response => {
        console.log(response);
        this.getAllConducteur();
      },
      error => {
        console.log(error);
      }); }
    }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

}
