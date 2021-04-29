import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocieteModule } from 'src/app/Models/societe/societe.module';
import { SocieteService } from 'src/app/Service/societe.service';

@Component({
  selector: 'app-edit-societe',
  templateUrl: './edit-societe.component.html',
  styleUrls: ['./edit-societe.component.css']
})
export class EditSocieteComponent implements OnInit {
  societe: SocieteModule[];
  submitForm!: FormGroup;
  loading = false;
  submitted = false;
  constructor(private societerService: SocieteService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      numSociete: this.route.snapshot.params.id,
      nomSociete: ['', Validators.required],
      personnePhysique: ['', Validators.required],
      adresseSociete: ['', Validators.required],
      telSociete: ['', Validators.required],
      mailSociete: ['', Validators.required],
      prenomNomRepresentantSociete: ['', Validators.required],
      telRepresentantSociete: ['', Validators.required]
    });
    this.getSociete();
  }

  onSubmit(): any {
    this.societerService.editeSociete(this.route.snapshot.params.id, this.submitForm.value).subscribe(() => {
      console.log('Conducteur Modifier');
      this.router.navigate(['societe']);
    }).add(() => this.loading = false);
  }
  getSociete(): void {
    this.societerService.getSocietes(this.route.snapshot.params.id).subscribe(
      data => {
        this.societe = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
