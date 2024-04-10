'use client';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Web3 } from 'web3';
import { toNumber } from 'web3-utils';
import { counterAbi, counterAddress } from './utils/contracts';

export default function Counter() {
  const web3 = new Web3('ws://localhost:8545');
  const counterContract = new web3.eth.Contract(counterAbi, counterAddress);
  const [value, setValue] = useState<number | bigint>(0);
  const [address, setAddress] = useState('');

  const inc = counterContract.events.Increment()
  const dec = counterContract.events.Decrement()

  useEffect(() => {
    console.log('ADD');

    ReadContractValue();
    connectToMetaMask();



    inc.on('data', (event) => ReadContractValue());
    dec.on('data', (event) => ReadContractValue());
    inc.subscribe()
    return () => {
      console.log('REMOVE');
      inc.unsubscribe();
      dec.unsubscribe();
      // counterContract.events.Increment().removeAllListeners();
      // counterContract.events.Decrement().unsubscribe();
    };
  }, []);

  const connectToMetaMask = async () => {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Request account access
        const Accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        setAddress(Accounts[0]);
        console.log('Connected to MetaMask!', Accounts);
      } else {
        console.error('MetaMask not found. Please install MetaMask to use this application.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function disconnectFromMetaMask() {
    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        // Disconnect from MetaMask
        await window.ethereum.request({
          method: 'wallet_requestPermissions',
          params: [{ eth_accounts: {} }],
        });
        console.log('Disconnected from MetaMask!');
      } else {
        console.error('MetaMask not found. Please install MetaMask to use this application.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  const DecrementHandler = async () => {
    try {
      if (window.ethereum) {
        await counterContract.methods.decrement().send({ from: address });
        // ReadContractValue();
      } else {
        console.error('MetaMask not found. Please install MetaMask to use this application.');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const IncrementHandler = async () => {
    try {
      if (window.ethereum) {
        await counterContract.methods.increment().send({ from: address });
      } else {
        console.error('MetaMask not found. Please install MetaMask to use this application.');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const ReadContractValue = async () => {
    try {
      if (window.ethereum) {
        const counterValue: number | bigint = await counterContract.methods.getValue().call();
        console.log('Value:', counterValue);

        setValue(toNumber(counterValue));
      } else {
        console.error('MetaMask not found. Please install MetaMask to use this application.');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const getButton = () => {
    if (address) {
      return <Button onClick={disconnectFromMetaMask}>Disconnect From MetaMask</Button>;
    } else {
      return <Button onClick={connectToMetaMask}>Connect To MetaMask</Button>;
    }
  };

  return (
    <div className='App'>
      <div className='connectBtns'>{getButton()}</div>

      <div className='display'>
        <p className='key'>
          Address: <span className='value'>{address}</span>
        </p>

        <div className='valueContainer'>
          <p className='key'>
            Value: <span>{`${value}`}</span>
          </p>
        </div>
      </div>

      <div className='actionBtns'>
        <Button className='btn minus' onClick={DecrementHandler} title='decrement'>
          -
        </Button>

        <Button className='btn plus' onClick={IncrementHandler} title='increment'>
          +
        </Button>
        <Button onClick={ReadContractValue} title='read value'>
          get value
        </Button>
      </div>
    </div>
  );
}
