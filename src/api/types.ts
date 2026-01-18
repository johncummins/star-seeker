export type GateLink = {
  code: string;
  hu: string;
};

export type Gate = {
  uuid: string;
  code: string;
  name: string;
  links?: GateLink[];
};

export type Transport = {
  currency: string;
  journeyCost: number;
  parkingFee: number;
  recommendedTransport: {
    capacity: number;
    name: string;
    ratePerAu: number;
  };
};

export type Route = {
  from: Gate;
  route: string[];
  to: Gate;
  totalCost: number;
};
