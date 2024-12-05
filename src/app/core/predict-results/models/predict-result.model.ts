export interface IPredictResult {
  patientID: string;
  age: number;
  sex: string;
  chestPainType: string;
  restingBP: number;
  cholesterol: number;
  fastingBS: number;
  restingECG: string;
  maxHR: number;
  exerciseAngina: string;
  oldPeak: number;
  stSlope: string;
  tendency: boolean;
  currentAccuracy?: string;
  retrain?: boolean;
  heartDisease?: boolean;
}
