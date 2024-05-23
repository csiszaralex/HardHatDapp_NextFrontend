'use client';
import { useState } from 'react';
import BallotsList from '../components/ballot/BallotsList';
import CurrentBallot from '../components/ballot/CurrentBallot';
import Ballot from '../interfaces/ballot.interface';

const ballots: Ballot[] = [
  {
    id: 1,
    name: 'Melyik a legjobb gyümölcs?',
    startDate: new Date(),
    endDate: new Date(2025, 0, 1),
    proposals: ['Alma', 'Barack', 'Cseresznye'],
    voted: false,
  },
  {
    id: 2,
    name: 'Melyik ABC?',
    startDate: new Date(),
    endDate: new Date(2025, 0, 1),
    proposals: ['asd', 'dsa'],
    voted: false,
  },
  {
    id: 3,
    name: 'Támogatod-e XY-t?',
    startDate: new Date(),
    endDate: new Date(2025, 0, 1),
    proposals: ['Igen', 'Nem'],
    voted: false,
  },
  {
    id: 4,
    name: 'Támogatod-e a másikat?',
    startDate: new Date(),
    endDate: new Date(2025, 0, 1),
    proposals: ['Igen', 'Nem'],
    voted: true,
  },
];

export default function Page() {
  const [currentBallot, setCurrentBallot] = useState<number>(0);

  function vote(proposalId: number) {
    console.log('You voted on ballot ' + currentBallot + ' for proposal ' + proposalId + '!');
    ballots[currentBallot - 1].voted = true;
    setCurrentBallot(0);
  }

  return (
    <div className='container m-3'>
      <h1 className='text-center mb-8 text-4xl font-extrabold'>Ballots</h1>
      <div className='flex flex-row'>
        <div className='w-1/2 bg-zinc-500 text-white p-8 h-full'>
          <BallotsList ballots={ballots} ballotChange={setCurrentBallot} />
        </div>
        <div className='w-1/2 bg-gray-700 text-white p-8'>
          {currentBallot ? (
            <CurrentBallot ballot={ballots[currentBallot - 1]} vote={vote} />
          ) : (
            <div className='text-4xl font-extrabold my-auto'>Please select a ballot first!</div>
          )}
        </div>
      </div>
    </div>
  );
}
