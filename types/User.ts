import {Challenge} from './Challenge';

export type User = {
  id: number;
  name: string;
  profilePicture: string;
  challenge: Challenge;
  challengesCompleted: number;
  points: number;
  friends: number[];
};

const challenge: Challenge = {
  name: 'Go to Zilker Park',
  description: 'Take a bus to Zilker park and touch some grass.',
  date: '10-21-23',
  inProgress: true,
  startTime: '9:00',
  endTime: '15:00',
  difficulty: 3,
};

export const friend3: User = {
  id: 4,
  name: 'Ayush Manoj',
  challenge: challenge,
  profilePicture: 'akjsdhka',
  challengesCompleted: 5,
  points: 2000,
  friends: [1, 2, 3],
};

export const friend2: User = {
  id: 3,
  name: 'Ayan Gupta',
  challenge: challenge,
  profilePicture: 'akjsdhka',
  challengesCompleted: 5,
  points: 700,
  friends: [1, 2, 4],
};

export const friend1: User = {
  id: 2,
  name: 'Maadhav Kothuri',
  challenge: challenge,
  profilePicture: 'akjsdhka',
  challengesCompleted: 5,
  points: 1100,
  friends: [1, 3, 4],
};

export const user: User = {
  id: 1,
  name: 'Ananth Kothuri',
  challenge: challenge,
  profilePicture: 'akjsdhka',
  challengesCompleted: 5,
  points: 1000,
  friends: [2, 3, 4],
};
