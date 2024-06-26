export interface Config {
  id: number;
  state: States;
}

export type States = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Message {
  id: number;
  text: string;
  richText?: React.ReactNode;
  createdAt: Date;
  createdBy: string;
}
