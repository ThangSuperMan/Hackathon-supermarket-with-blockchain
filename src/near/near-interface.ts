import { Wallet } from "./near-wallet";

interface InitProps {
  contractId: string;
  walletToUse: Wallet;
}

export class Contract {
  contractId: string;
  walletToUse: Wallet;

  constructor({ contractId, walletToUse }: InitProps) {
    this.contractId = contractId;
    this.walletToUse = walletToUse;
  }

  get_num(): number {
    return 5;
  }
}
