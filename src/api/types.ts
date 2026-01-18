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
