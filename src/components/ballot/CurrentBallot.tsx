import { Button } from '@/src/components/ui/button';
import Ballot from '../../interfaces/ballot.interface';

export default function CurrentBallot(props: {
  ballot: Ballot;
  vote: (proposalId: number) => void;
}) {
  return (
    <div>
      <h1 className='text-2xl text-center mb-3'>{props.ballot.name}</h1>
      <p className='mb-2'>
        Opened: {props.ballot.startDate.toDateString()} - {props.ballot.endDate.toDateString()}
      </p>
      <h3 className='text-xl mb-3'>Please vote one of them:</h3>
      <div className='flex'>
        {props.ballot.proposals.map((proposal, index) => (
          <Button className='m-1' key={index} onClick={() => props.vote(index)}>
            {proposal}
          </Button>
        ))}
      </div>
    </div>
  );
}
