import { Component, OnInit } from '@angular/core';
import { MaisonModule } from 'src/app/Models/maison/maison.module';
import { MaisonService } from 'src/app/Service/maison.service';
import { ConfirmationDialogService } from 'src/app/Views/confirmation-dialog/confirmation-dialog.service';


@Component({
  selector: 'app-index-maison',
  templateUrl: './index-maison.component.html',
  styleUrls: ['./index-maison.component.css']
})
export class IndexMaisonComponent implements OnInit {
  maisons: MaisonModule[];
  constructor(private maisonService: MaisonService , private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getAllMaison();
  }
  getAllMaison(): void {
    this.maisonService.getListMaison()
      .subscribe(
        data => {
          this.maisons = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
   public openConfirmationDialog(id: number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => {
     if (confirmed === true){this.maisonService.deleteMaison(id).subscribe(
      response => {
        console.log(response);
        this.getAllMaison();
      },
      error => {
        console.log(error);
      }); }
    }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
