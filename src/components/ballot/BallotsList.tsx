import { Button } from '@/src/components/ui/button';
import Ballot from '../../interfaces/ballot.interface';

export default function BallotsList(props: {
  ballots: Ballot[];
  ballotChange: (id: number) => void;
}) {
  function isEnabled(ballot: Ballot): boolean {
    const now = new Date();
    return now >= ballot.startDate && now <= ballot.endDate && !ballot.voted;
  }

  function DateToString(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  return (
    <div>
      <h1 className='text-2xl text-center mb-3'>All ballots</h1>
      <ul>
        {props.ballots.map((ballot) => (
          <li key={ballot.id}>
            <Button onClick={() => props.ballotChange(ballot.id)} disabled={!isEnabled(ballot)}>
              {ballot.name}
            </Button>
            <p>
              {DateToString(ballot.startDate)} - {DateToString(ballot.endDate)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
