import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelModule } from 'src/app/Models/model/model.module';
import { ModelService } from 'src/app/Service/model.service';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.css']
})
export class EditModelComponent implements OnInit {
  model: ModelModule[];
  submitForm!: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private modelService: ModelService
  ) {}

  ngOnInit(): void {
    this.submitForm = this.formBuilder.group({
      codeModel: this.route.snapshot.params.id,
      nomModel: ['', Validators.required]
    });

    this.getModel();
  }

  onSubmit(): any {
    this.modelService.editeModel(this.route.snapshot.params.id, this.submitForm.value).subscribe(() => {
      console.log('Model Modifier');
      this.router.navigate(['model']);
    }).add(() => this.loading = false);
  }
  getModel(): void {
    this.modelService.getModels(this.route.snapshot.params.id).subscribe(
      data => {
        this.model = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
