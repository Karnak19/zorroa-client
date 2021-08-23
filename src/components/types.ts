export interface CapsHourlyResult {
  _id: string;
  month: Date;
  address: string;
  value: number;
  network: string;
}

export interface CapsDailyResult {
  _id: string;
  month: Date;
  address: string;
  value: number;
  network: string;
}

export interface RootObject {
  capsHourlyResult: CapsHourlyResult[];
  capsDailyResult: CapsDailyResult[];
  capsMonthlyResult: any[];
  lastDayCumulatedRewards: number;
  totalNetworkReward: number;
  totalUserReward: number;
  position: number;
  APR: number;
}
