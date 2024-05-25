import { Button } from '../components/ui/button';

export default function Connect(props: { newAddress: (address: string) => void}) {
  const connectToMetaMask = async () => {
    try {
      if (window.ethereum) {
        // Request account access
        const Accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        props.newAddress(Accounts[0]);
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

  const getButton = () => {
    // if (connected) {
    //   return <Button onClick={disconnectFromMetaMask}>Disconnect From MetaMask</Button>;
    // } else {
      return <Button onClick={connectToMetaMask}>Connect To MetaMask</Button>;
    // }
  };

  return <div className='connectBtns'>{getButton()}</div>;
}
