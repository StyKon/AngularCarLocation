import { Component, OnInit } from '@angular/core';
import { VoitureModule } from 'src/app/Models/voiture/voiture.module';
import { VoitureService } from 'src/app/Service/voiture.service';
import { ConfirmationDialogService } from 'src/app/Views/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-index-voiture',
  templateUrl: './index-voiture.component.html',
  styleUrls: ['./index-voiture.component.css']
})
export class IndexVoitureComponent implements OnInit {
  voitures: VoitureModule[];
  constructor(private voitureService: VoitureService , private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.getAllVoiture();
  }
  getAllVoiture(): void {
    this.voitureService.getListVoiture()
      .subscribe(
        data => {
          this.voitures = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
   public openConfirmationDialog(id: number) {
    this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    .then((confirmed) => {
     if (confirmed === true){this.voitureService.deleteVoiture(id).subscribe(
      response => {
        console.log(response);
        this.getAllVoiture();
      },
      error => {
        console.log(error);
      }); }
    }).catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
