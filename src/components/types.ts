export interface Result {
  _id: string;
  month: Date;
  address: string;
  value: number;
  network: string;
}

export interface RootObject {
  capsHourlyResult: Result[];
  capsDailyResult: Result[];
  capsMonthlyResult: Result[];
  lastDayCumulatedRewards: number;
  totalNetworkReward: number;
  totalUserReward: number;
  position: number;
  APR: number;
}
