import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VoitureModule } from 'src/app/Models/voiture/voiture.module';
import { MaisonService } from 'src/app/Service/maison.service';
import { MarqueService } from 'src/app/Service/marque.service';
import { ModelService } from 'src/app/Service/model.service';
import { VoitureService } from 'src/app/Service/voiture.service';

@Component({
  selector: 'app-edit-voiture',
  templateUrl: './edit-voiture.component.html',
  styleUrls: ['./edit-voiture.component.css']
})
export class EditVoitureComponent implements OnInit {
  voiture: VoitureModule[];
  maisons: any[];
  marques: any[];
  models: any[];
  submitForm!: FormGroup;
  loading = false;
  submitted = false;
  constructor(private voitureService: VoitureService, private modelService: ModelService,
              private marqueService: MarqueService, private maisonService: MaisonService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      idVoiture: this.route.snapshot.params.id,
      datemisecirculation : ['', Validators.required],
      numcartegrise : ['', Validators.required],
      kilometrage : ['', Validators.required],
      matricule : ['', Validators.required],
      model: ['', Validators.required],
      marque: ['', Validators.required],
      maison: ['', Validators.required],
    });
    this.getAllMaisons();
    this.getAllMarques();
    this.getAllModels();
    this.getVoiture();
  }

  onSubmit(): any {
    this.voitureService.editeVoiture(this.route.snapshot.params.id, this.submitForm.value).subscribe(() => {
      console.log('Conducteur Modifier');
      this.router.navigate(['voiture']);
    }).add(() => this.loading = false);
  }

  getAllMaisons(): void {
    this.maisonService.getListMaison()
    .subscribe(
      maisons => {
        this.maisons = maisons;
      },
      error => {
        console.log(error);
      });
  }

  getAllMarques(): void {
    this.marqueService.getListMarque()
    .subscribe(
      marques => {
        this.marques = marques;
      },
      error => {
        console.log(error);
      });
  }

  getAllModels(): void {
    this.modelService.getListModel()
    .subscribe(
      models => {
        this.models = models;
      },
      error => {
        console.log(error);
      });
  }
  getVoiture(): void {
    this.voitureService.getVoitures(this.route.snapshot.params.id).subscribe(
      data => {
        this.voiture = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
