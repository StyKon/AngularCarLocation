import { Component, OnInit } from '@angular/core';
import { MarqueModule } from 'src/app/Models/marque/marque.module';
import { MarqueService } from 'src/app/Service/marque.service';
import { ConfirmationDialogService } from 'src/app/Views/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-index-marque',
  templateUrl: './index-marque.component.html',
  styleUrls: ['./index-marque.component.css']
})
export class IndexMarqueComponent implements OnInit {
  marques: MarqueModule[];
  constructor(private marqueService: MarqueService , private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getAllMarque();
  }
  getAllMarque(): void {
    this.marqueService.getListMarque()
      .subscribe(
        data => {
          this.marques = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
   public openConfirmationDialog(id: number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => {
     if (confirmed === true){this.marqueService.deleteMarque(id).subscribe(
      response => {
        console.log(response);
        this.getAllMarque();
      },
      error => {
        console.log(error);
      }); }
    }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
