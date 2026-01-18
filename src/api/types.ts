export type Gate = {
  uuid: string;
  code: string;
  name: string;
};

export type GateLink = {
  code: string;
  hu: string;
};

export type GateDetails = Gate & {
  links: GateLink[];
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
