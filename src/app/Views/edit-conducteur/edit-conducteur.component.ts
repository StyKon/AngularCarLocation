import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConducteurModule } from 'src/app/Models/conducteur/conducteur.module';
import { ConducteurService } from 'src/app/Service/conducteur.service';

@Component({
  selector: 'app-edit-conducteur',
  templateUrl: './edit-conducteur.component.html',
  styleUrls: ['./edit-conducteur.component.css']
})
export class EditConducteurComponent implements OnInit {
  date: string;
  conducteur: ConducteurModule[];
  submitform!: FormGroup;
  loading = false;
  submitted = false;
  constructor( private formBuilder: FormBuilder,
               private route: ActivatedRoute,
               private router: Router,
               private conducteurService: ConducteurService) { }

  ngOnInit(): void {
    this.getConducteur();
    this.submitform = this.formBuilder.group({
      codeConducteur: this.route.snapshot.params.id,
      prenomNomConducteur:  ['', Validators.required],
      dateNaissance: ['', Validators.required],
      numPermisConduite: ['', Validators.required],
      dateLivraisonPermisConduite: ['', Validators.required],
      dateFinValidite: ['', Validators.required],
      adresse: ['', Validators.required],
      tel: ['', Validators.required],
      numCIN: ['', Validators.required],
      dateCin: ['', Validators.required],
      mailConducteur: ['', Validators.required, Validators.email],

    });

  }

  getConducteur(): void {
    this.conducteurService.getConducteurs(this.route.snapshot.params.id).subscribe(
      data => {
        this.conducteur = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }
  onSubmit(): void {
    this.conducteurService.editeConducteur(this.route.snapshot.params.id, this.submitform.value).subscribe(() => {
      console.log('Conducteur Modifier');
      this.router.navigate(['conducteur']);
    }).add(() => this.loading = false);

  }

}
