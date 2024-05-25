import Web3 from 'web3';

export function HexToAscii(hex: string): string {
  return Web3.utils.toAscii(hex).replace(/\0/g, '');
}
