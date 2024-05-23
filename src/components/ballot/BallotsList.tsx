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
              {ballot.startDate.toDateString()} - {ballot.endDate.toDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
