import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaisonModule } from 'src/app/Models/maison/maison.module';
import { MaisonService } from 'src/app/Service/maison.service';

@Component({
  selector: 'app-edit-maison',
  templateUrl: './edit-maison.component.html',
  styleUrls: ['./edit-maison.component.css']
})
export class EditMaisonComponent implements OnInit {
  maison: MaisonModule[];
  submitForm: FormGroup;

  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private maisonService: MaisonService
  ) {}

  ngOnInit(): void {
    this.getMaison();
    this.submitForm = this.formBuilder.group({
      codeMaison: this.route.snapshot.params.id,
      nomMaison: ['', Validators.required],
    });
  }
  getMaison(): void {
    this.maisonService.getMaisons(this.route.snapshot.params.id).subscribe(
      data => {
        this.maison = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });

  }
  onSubmit(): any {
    this.maisonService.editeMaison(this.route.snapshot.params.id, this.submitForm.value).subscribe((res) => {
      console.log('Update Maison');
      console.log(res);
      this.router.navigate(['maison']);
    }).add(() => this.loading = false);

  }

}
