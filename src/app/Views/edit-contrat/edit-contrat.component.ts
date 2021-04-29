import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConducteurModule } from 'src/app/Models/conducteur/conducteur.module';
import { ContratModule } from 'src/app/Models/contrat/contrat.module';
import { SocieteModule } from 'src/app/Models/societe/societe.module';
import { VoitureModule } from 'src/app/Models/voiture/voiture.module';
import { ConducteurService } from 'src/app/Service/conducteur.service';
import { ContratService } from 'src/app/Service/contrat.service';
import { SocieteService } from 'src/app/Service/societe.service';
import { VoitureService } from 'src/app/Service/voiture.service';

@Component({
  selector: 'app-edit-contrat',
  templateUrl: './edit-contrat.component.html',
  styleUrls: ['./edit-contrat.component.css']
})
export class EditContratComponent implements OnInit {
  conducteurs: ConducteurModule[];
  societes: SocieteModule[];
  voitures: VoitureModule[];
  contrat: ContratModule[];
  submitForm!: FormGroup;
  loading = false;
  submitted = false;
  constructor( private formBuilder: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private contratService: ContratService,
               private conducteurService: ConducteurService,
               private societerService: SocieteService,
               private voitureService: VoitureService) { }

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      numContrat: this.route.snapshot.params.id,
      dateContrat: ['', Validators.required],
      dateDebutLocation: ['', Validators.required],
      dateFinLocation: ['', Validators.required],
      prixUnitaireJour: ['', Validators.required],
      prixTotal: ['', Validators.required],
      montantAvance: ['', Validators.required],
      conducteurs: ['', Validators.required],
      societe: ['', Validators.required],
      voitures: ['', Validators.required]
    });
    this.getContrat();
    this.getAllConducteur();
    this.getAllSocieters();
    this.getAllVoitures();

  }
  onSubmit(): void {
    this.contratService.editeContrat(this.route.snapshot.params.id, this.submitForm.value).subscribe(() => {
      console.log('Contrat Modifier');
      this.router.navigate(['contrat']);
    }).add(() => this.loading = false);
  }
  getContrat(): void {
    this.contratService.getContrats(this.route.snapshot.params.id).subscribe(
      data => {
        this.contrat = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }


  getAllConducteur(): void {
    this.conducteurService.getListConducteur()
    .subscribe(
      conducteurs => {
        this.conducteurs = conducteurs;
      },
      error => {
        console.log(error);
      });
  }

  getAllSocieters(): void {
    this.societerService.getListSociete()
    .subscribe(
      societes => {
        this.societes = societes;
      },
      error => {
        console.log(error);
      });
  }

  getAllVoitures(): void {
    this.voitureService.getListVoiture()
    .subscribe(
      voitures => {
        this.voitures = voitures;
      },
      error => {
        console.log(error);
      });
  }

}
