export interface IPredict {
  Age: number;
  Sex: number;
  ChestPainType: number;
  RestingBP: number;
  Cholesterol: number;
  FastingBS: number;
  RestingECG: number;
  MaxHR: number;
  ExerciseAngina: number;
  Oldpeak: number;
  ST_Slope: number;
}

export interface IPredictResponse {
  tendency: number;
  currentAccuracy?: string;
}
