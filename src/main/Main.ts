// test/Airdrop.js
// Load dependencies
const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');
const Web3 = require('web3');
import {testAccounts} from "../hardhat.config";
const readLineSync = require('readline-sync')
import {smartContracts} from "./Constants";
import * as fs from 'fs/promises';
import * as path from 'path';
import { promisify } from 'util';
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5MTI0NmQ5ZS1mZjQ3LTQxMDEtYmI3OS1hY2M3OTQzNWI3ZDQiLCJlbWFpbCI6ImdhYnJpZGc5NkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiODhmNTM4MTg1ODczNDg3NjEwOTAiLCJzY29wZWRLZXlTZWNyZXQiOiI2ODU5MWJmZDY5NDU2NDI4NjcxOWIzOGU1NGZiZTFkOGUwNjk1OTI5YjY0NjFjMjAxMjc1ZDM5OWE1OGRmOWQ3IiwiaWF0IjoxNzAxMTk0MzMzfQ.9rgK6bEL9E95QcKgaTPIk3LRNVCvqf_RMSt2QfPlM08'});

let signer = ethers.Wallet.fromMnemonic("sausage shadow board sell skill year radio ill fun grunt select sample invite setup level stick lumber worth creek amount example federal mask until", "m/44'/60'/0'/0/0");

const endpoint = "https://api.avax-test.network/ext/bc/C/rpc";

//Referencias: 
//https://docs.openzeppelin.com/learn/deploying-and-interacting

const goTo = async(menu: any) => {

  if(menu == 1)
  {
    await menu1();
  } else if (menu == 2)
  {
    await login();
  }

}

const menu1 = async() => {
  let userRes;
  while (userRes !== '0') {
      console.log("");
      console.log("0. Load test data")
      console.log("1. See keys")
      console.log("2. Mint Title")
      console.log("3. Prepare Titles")
      userRes = readLineSync.question("Pick an option: ");
      if (userRes === '0') {
        console.log("Function not available")
      }
      else if (userRes === '1') {
        await seeKeys(); 
      } else if (userRes === '2') {
        await mintTitle();
      } else if (userRes === '3') {
        await generateTitles();
      } 
  }
}

import * as reader from 'fs';

const seeKeys = () => {
  var obj = reader.readFileSync("./seeds/seeds.json", 'utf-8');
  var seeds = JSON.parse(obj);

  for(var s of seeds)
  {
    var wallet = ethers.Wallet.fromMnemonic(s.phrase, "m/44'/60'/0'/0/0");
    console.log( s.name + " : " + " : " + s.address +  " : " + wallet.privateKey)
  }
}

const login = async() => {

  var obj = reader.readFileSync("./seeds/seeds.json", 'utf-8');
  var seeds = JSON.parse(obj);

  for(var s of seeds)
  {
    console.log( s.name + " : " + s.phrase)
  }

  let mnemonic = readLineSync.question("Sign in with your mnemonic: ");

  var wallet = ethers.Wallet.fromMnemonic(mnemonic, "m/44'/60'/0'/0/0");
  console.log(wallet.address)
  signer = new ethers.Wallet(wallet.privateKey, new ethers.providers.JsonRpcProvider(endpoint));

  await goTo(1);

}

const mintTitle = async() => {
  console.log(signer.address)

  var obj = reader.readFileSync("./main/attendance.json", 'utf-8');
  var attendance = JSON.parse(obj);

  for(var att of attendance)
    console.log("[" + att.wid +"] "  + att.name + " " + att.certid)

  var factory = await ethers.getContractFactory('WLNCert'); // Interface
  factory = factory.connect(signer); // change the user who sign the transactionn
  const smartContract = await factory.attach(smartContracts.WLN_CERTS);

  for(var i = 0; i <= 1; i++)
    await smartContract.safeMint(attendance[i].wid, attendance[i].certid);

}

async function generateMetadata(srcDir: string, destDir: string, hash: string): Promise<void> {

  try {
    const files = await fs.readdir(srcDir);

    for (const file of files) 
    {
        const srcPath = path.join(srcDir, file);
        const fileExtension = path.extname(file);
        const destFileName = path.parse(file).name;
        const destPath = path.join(destDir, destFileName);

        const metadata = {
          name: destFileName,
          tokenId: Number(destFileName), // Incluir el valor adecuado para tokenId
          image: 'https://jade-negative-emu-951.mypinata.cloud/ipfs/' + hash + "/" + destFileName + fileExtension, // Incluir el valor adecuado para image
          description: 'Worldline Techforum 2024',
          attributes: ['WLN', 'Techforum 2024'],
        };

      await fs.writeFile(destPath, JSON.stringify(metadata, null, 2));
      console.log(`Generated metadata for ${destFileName} and saved to ${destPath}`);
 
    } 
  }
  catch (error) {
    console.error('Error copying files:', error);
  }

}

async function generateTitles(): Promise<void> {
  const res1 = await pinata.testAuthentication()
  console.log(res1)

  const options = {};

  // Pinata SDK: Upload titles to Pinata
  const res = await pinata.pinFromFS('./titles/', options)
  console.log(res["IpfsHash"])

  // Creates the metadafile for every picture located in folder titles.
  // The metadata contains the Pinata URI of the folder titles already uplaoded
  await generateMetadata("./titles/", "./metadata/", res["IpfsHash"]);

  // Pinata SDK: Upload metada to Pinata
  const res2 = await pinata.pinFromFS('./metadata/', options)
  console.log(res2)
}

const main = async(): Promise<any> => {

/* CODE to run script without hardhat environment
const endpoint = "https://api.avax-test.network/ext/bc/C/rpc";
var wallet = ethers.Wallet.fromMnemonic("legal inject devote slam undo process relax multiply finish brave awkward garment edit raven shoe fork sail cheese still feel birth keen flame gentle", "m/44'/60'/0'/0/0");
let signer = new ethers.Wallet(wallet.privateKey, new ethers.providers.JsonRpcProvider(endpoint));

var factory = await ethers.getContractFactory("WLNCert"); // change the user who sign the transactionn
factory = factory.connect(signer); // change the user who sign the transactionn
let app = await factory.attach(smartContracts.WLN_CERTS);*/

// Load hardhat.config.ts addresses
/*const [admin] = await ethers.getSigners();

var url = 'http://localhost:9650/ext/bc/worldline/rpc';
var customHttpProvider = new ethers.providers.JsonRpcProvider(url);
console.log(await customHttpProvider.getBalance(admin.address));
console.log(await customHttpProvider.getBlockNumber());*/
  
await login();

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
