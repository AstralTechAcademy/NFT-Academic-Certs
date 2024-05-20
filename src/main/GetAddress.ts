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

import * as reader from 'fs';

const seeKeys = () => {
  var obj = reader.readFileSync("./seeds/seeds.json", 'utf-8');
  var seeds = JSON.parse(obj);

  for(var s of seeds)
  {
    var wallet = ethers.Wallet.fromMnemonic(s.phrase, "m/44'/60'/0'/0/0");
    console.log( s.name + " : " + " : " + wallet.address +  " : " + wallet.privateKey)
  }
}


const main = async(): Promise<any> => {
  
await seeKeys();

}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error)
  process.exit(1)
})
