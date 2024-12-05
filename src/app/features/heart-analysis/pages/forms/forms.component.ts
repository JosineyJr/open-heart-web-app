import { Component, DestroyRef, inject } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IEntity } from '../../models/entity.model';
import { IPredict, IPredictResponse } from '../../models/predict.model';
import { PredictService } from '../../services/predict.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AccuracyService } from '../../../../core/accuracy/accuracy.service';
import { PredictResultsService } from '../../../../core/predict-results/predict-results.service';

@Component({
  selector: 'app-forms',
  imports: [HeaderComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})
export class FormsComponent {
  sexOptions: Array<IEntity> = [
    {
      id: 0,
      name: 'M',
    },
    {
      id: 1,
      name: 'F',
    },
  ];
  chestPainTypes: Array<IEntity> = [
    {
      id: 0,
      name: 'TA',
    },
    {
      id: 1,
      name: 'ATA',
    },
    {
      id: 2,
      name: 'NAP',
    },
    {
      id: 3,
      name: 'ASY',
    },
  ];
  restingEcgTypes: Array<IEntity> = [
    {
      id: 0,
      name: 'Normal',
    },
    {
      id: 1,
      name: 'ST',
    },
    {
      id: 2,
      name: 'LVH',
    },
  ];
  exerciseAnginaOptions: Array<IEntity> = [
    {
      id: 0,
      name: 'N',
    },
    {
      id: 1,
      name: 'Y',
    },
  ];
  stSlopeOptions: Array<IEntity> = [
    {
      id: 0,
      name: 'Up',
    },
    {
      id: 1,
      name: 'Flat',
    },
    {
      id: 2,
      name: 'Down',
    },
  ];
  contactForm: FormGroup;
  result!: IPredictResponse;
  destroyRef = inject(DestroyRef);

  constructor(
    private readonly predictService: PredictService,
    public readonly accuracyService: AccuracyService,
    private readonly predictResultService: PredictResultsService
  ) {
    this.contactForm = new FormGroup({
      patientID: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      sex: new FormControl('', [Validators.required]),
      chestPainType: new FormControl('', [Validators.required]),
      restingBp: new FormControl('', [Validators.required]),
      chol: new FormControl('', [Validators.required]),
      fastingBp: new FormControl('', [Validators.required]),
      restingEcg: new FormControl('', [Validators.required]),
      maxHr: new FormControl('', [Validators.required]),
      exerciseAngina: new FormControl('', [Validators.required]),
      oldPeak: new FormControl('', [Validators.required]),
      stSlope: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    let fastingBp = this.contactForm.get('fastingBp')?.value as number;
    if (fastingBp < 120) {
      fastingBp = 0;
    } else {
      fastingBp = 1;
    }
    const predictValues: IPredict = {
      Age: this.contactForm.get('age')?.value as number,
      Sex: this.contactForm.get('sex')?.value as number,
      ChestPainType: this.contactForm.get('chestPainType')?.value as number,
      RestingBP: this.contactForm.get('restingBp')?.value as number,
      Cholesterol: this.contactForm.get('chol')?.value as number,
      FastingBS: fastingBp,
      RestingECG: this.contactForm.get('restingEcg')?.value as number,
      MaxHR: this.contactForm.get('maxHr')?.value as number,
      ExerciseAngina: this.contactForm.get('exerciseAngina')?.value as number,
      Oldpeak: this.contactForm.get('oldPeak')?.value as number,
      ST_Slope: this.contactForm.get('stSlope')?.value as number,
    };

    const patientInLocalStorage = this.predictResultService.getPatient(
      this.contactForm.get('patientID')?.value as string
    );
    if (patientInLocalStorage != undefined) {
      this.result = {
        tendency: patientInLocalStorage.tendency ? 1 : 0,
        currentAccuracy: patientInLocalStorage.currentAccuracy,
      };

      return;
    }

    this.predictService
      .predict(predictValues)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (predictionResult: IPredictResponse) => {
          this.result = predictionResult;
          this.result.currentAccuracy = this.accuracyService.currentAccuracy;
        },
        complete: () => {
          this.predictResultService.register({
            age: predictValues.Age,
            chestPainType:
              this.chestPainTypes[predictValues.ChestPainType].name,
            cholesterol: predictValues.Cholesterol,
            exerciseAngina:
              this.exerciseAnginaOptions[predictValues.ExerciseAngina].name,
            fastingBS: fastingBp,
            maxHR: predictValues.MaxHR,
            oldPeak: predictValues.Oldpeak,
            patientID: this.contactForm.get('patientID')?.value as string,
            restingBP: predictValues.RestingBP,
            restingECG: this.restingEcgTypes[predictValues.RestingECG].name,
            sex: this.sexOptions[predictValues.Sex].name,
            stSlope: this.stSlopeOptions[predictValues.ST_Slope].name,
            tendency: !!this.result.tendency,
            currentAccuracy: this.result.currentAccuracy,
          });
        },
      });
  }
}
