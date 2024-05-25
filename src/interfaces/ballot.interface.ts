export default interface Ballot {
  //TODO id should be removed
  id: number;
  address: string;
  name: string;
  startDate: Date;
  endDate: Date;
  proposals: string[];
  voted: boolean;
}
