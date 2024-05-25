'use client';
import { useState } from 'react';
import Web3 from 'web3';
import { toNumber } from 'web3-utils';
import BallotsList from '../components/ballot/BallotsList';
import CurrentBallot from '../components/ballot/CurrentBallot';
import Ballot from '../interfaces/ballot.interface';
import { ballotAbi, ballotAddress } from '../utils/contracts';
import Connect from './connect';

// let ballots: Ballot[] = [];

export default function Page() {
  const web3 = new Web3('ws://localhost:8545');
  const ballot = new web3.eth.Contract(ballotAbi, ballotAddress);
  const [ballots, setBallots] = useState<Ballot[]>([]);
  const [currentBallot, setCurrentBallot] = useState<number>(0);
  const [address, setAddress] = useState<string>('');

  function vote(proposalId: number) {
    console.log('You voted on ballot ' + currentBallot + ' for proposal ' + proposalId + '!');
    ballot.methods.vote(proposalId).send({ from: address });
    ballots[currentBallot-1].voted = true;
    setCurrentBallot(0);
  }

  async function readBallot() {
    try {
      setBallots([]);
      if (window.ethereum) {
        let b: Ballot = {
          id: 1,
          name: Web3.utils.toAscii(await ballot.methods.name().call()).replace(/\0/g, ''),
          proposals: [],
          startDate: new Date(Number(await ballot.methods.startTime().call())),
          endDate: new Date(Number(await ballot.methods.endTime().call())),
          voted: await ballot.methods.amIVoted().call(),
        };

        let propCount = toNumber(await ballot.methods.getProposalsCount().call());

        for (let i = 0; i < propCount; i++) {
          let prop: { name: string } = await ballot.methods.proposals(i).call();
          b.proposals.push(Web3.utils.toAscii(prop.name).replace(/\0/g, ''));
        }

        setBallots([...ballots, b]);
      } else {
        console.error('MetaMask not found. Please install MetaMask to use this application.');
      }
    } catch (error) {
      console.log(error);
      // alert(error);
    }
  }

  function addressSet(addr: string) {
    setAddress(addr);
    readBallot();
  }


  function getVotes() {
    if (!address) return <Connect newAddress={addressSet} />;
    else
      return (
        <div className='flex flex-row'>
          <div className='w-1/2 bg-zinc-500 text-white p-8 h-full'>
            <BallotsList ballots={ballots} ballotChange={setCurrentBallot} />
          </div>
          <div className='w-1/2 bg-gray-700 text-white p-8'>
            {currentBallot ? (
              <CurrentBallot ballot={ballots[currentBallot-1]} vote={vote} />
            ) : (
              <div className='text-4xl font-extrabold my-auto'>Please select a ballot first!</div>
            )}
          </div>
        </div>
      );
  }

  return (
    <div className='container m-3'>
      <h1 className='text-center mb-8 text-4xl font-extrabold'>Ballots</h1>
      {getVotes()}
    </div>
  );
}
