import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { Web3Service } from 'nest-web3';

@Injectable()
export class AppService {
  constructor(private readonly web3Service: Web3Service) {}

  getABI(): string {
    const abi = readFileSync('./utils/abi.json');
    return JSON.stringify(abi.toJSON());
  }

  async method(): Promise<number> {
    const client = this.web3Service.getClient('eth');
    return await client.eth.getChainId();
  }
}
