import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarqueModule } from 'src/app/Models/marque/marque.module';
import { MaisonService } from 'src/app/Service/maison.service';
import { MarqueService } from 'src/app/Service/marque.service';

@Component({
  selector: 'app-edit-marque',
  templateUrl: './edit-marque.component.html',
  styleUrls: ['./edit-marque.component.css']
})
export class EditMarqueComponent implements OnInit {

  submitForm!: FormGroup;
  maisons: any[];
  loading = false;
  submitted = false;
  marque: MarqueModule[];
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private marqueService: MarqueService,
              private maisonSerivce: MaisonService

  ) {}

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      codeMarque: this.route.snapshot.params.id,
      nomMarque: ['', Validators.required],
      maison: ['', Validators.required]
    });
    this.getMarque();
    this.getAllMaison();
  }

  onSubmit(): any {
    this.marqueService.editeMarque(this.route.snapshot.params.id, this.submitForm.value).subscribe(() => {
      console.log('Marque Modifier');
      this.router.navigate(['marque']);
    }).add(() => this.loading = false);

  }
  getAllMaison(): void {
    this.maisonSerivce.getListMaison()
    .subscribe(
      maisons => {
        this.maisons = maisons;
      },
      error => {
        console.log(error);
      });
  }
  getMarque(): void {
    this.marqueService.getMarques(this.route.snapshot.params.id).subscribe(
      data => {
        this.marque = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
