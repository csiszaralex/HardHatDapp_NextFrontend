export default interface Ballot {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  proposals: string[];
  voted: boolean;
}
