
export interface FundsEquity {
  _id?: string; // MongoDB ObjectId
  userId?: string; // Reference to user
  availableMargin: number;
  usedMargin: number;
  availableCash: number;
  openingBalance: number;
  openingBalance2: number;
  payin: number;
  span: number;
  deliveryMargin: number;
  exposure: number;
  optionsPremium: number;
  collateralLiquid: number;
  collateralEquity: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export const fundsEquityData: FundsEquity = {
  availableMargin: 4043.10,
  usedMargin: 3757.30,
  availableCash: 4043.10,
  openingBalance: 4043.10,
  openingBalance2: 3736.40,
  payin: 4064.00,
  span: 0.00,
  deliveryMargin: 0.00,
  exposure: 0.00,
  optionsPremium: 0.00,
  collateralLiquid: 0.00,
  collateralEquity: 0.00
};
