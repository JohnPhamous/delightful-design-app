export interface Config {
  id: number;
  state: States;
}

export type States = 1 | 2 | 3 | 4 | 5;

export interface Message {
  id: number;
  text: string;
  createdAt: Date;
  createdBy: string;
}
