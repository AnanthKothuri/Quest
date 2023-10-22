import { Place } from "./Place";

export type Challenge = {
  name: string;
  description: string;
  date: string;
  inProgress: boolean;
  difficulty: number;
  location: Place;
  details: string;
};
