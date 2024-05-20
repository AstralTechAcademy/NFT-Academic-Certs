import { 
  Contract, 
  ContractFactory 
} from "ethers"
import { ethers } from "hardhat"
import * as reader from 'fs';
const readLineSync = require('readline-sync')

const endpoint = "https://api.avax-test.network/ext/bc/C/rpc";

const main = async(): Promise<any> => {

  var obj = reader.readFileSync("./seeds/seeds.json", 'utf-8');
  var seeds = JSON.parse(obj);

  for(var s of seeds)
  {
    console.log( s.name + " : " + s.phrase)
  }

  let mnemonic = readLineSync.question("Sign in with your mnemonic: ");

  var wallet = ethers.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/0");
  console.log(wallet.address)
  var signer = new ethers.Wallet(wallet.privateKey, new ethers.providers.JsonRpcProvider(endpoint));

  // --------------------------------
  var factory = await ethers.getContractFactory("WLNCert")
  factory = factory.connect(signer);

  var smartContract = await factory.deploy();
  
  await smartContract.deployed()
  console.log(`Smart contract deployed to: ${smartContract.address}`)

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
