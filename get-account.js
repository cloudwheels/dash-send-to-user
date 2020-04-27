const Dash = require('dash');
const { Wallet } = require('@dashevo/wallet-lib');

// dash-sender mnemonic: 'pear cupboard strong pool pumpkin today spin portion deliver cloud vast test'
const userMnemonic = 'pear cupboard strong pool pumpkin today spin portion deliver cloud vast test';
const client = new Dash.Client({network: 'testnet', mnemonic: userMnemonic});


//dash-recipient mnemomnic: 'illegal knee diesel atom tower oval vault such toilet question ceiling gesture'
//dash-recipient address: 'yVpwwstMBMEdssruYCvqWWZnKr3iK9t565'
sendToAddress = 'yVpwwstMBMEdssruYCvqWWZnKr3iK9t565';

const axios = require('axios');
axios.baseURL = 'http://devnet-evonet-28309188.us-west-2.elb.amazonaws.com:3001/insight-api/addr/';


sendUsingWalletLib();


async function sendUsingWalletLib() {

//getOwnPrivateKey
const userIdentityPrivateKey = await client.account.getIdentityHDKey(0,'user').privateKey;
console.log('userIdentityPrivateKey:', userIdentityPrivateKey)



const wallet = new Wallet({
  network: 'testnet',
  privateKey: userIdentityPrivateKey
});




const BIP44Account = wallet.getAccount("m/9'/5'/5'");

const BIP44AccountAddress = BIP44Account.getAddress().address;

console.log('BIP44 Address', BIP44AccountAddress);

console.log('BIP44 Balance', BIP44Account.getTotalBalance());


//Can't get balance from wallet/ DAPI - get from insight
const utxo = await getUTXO(BIP44AccountAddress); //(wallet.getAccount().getAddress(0).address);


/*
alternative: create tx using DashCore Transaction directly

const tx = new Dash.Core.Transaction()
    .from(utxo)          // Feed information about what unspent outputs one can use
    .to('yT94r3x4buMkBjkHVLPyoq2t6ZqcpiXWHx', 200000)  // Add an output with the given amount of satoshis
    .change(changeAddress)      // Sets up a change address where the rest of the funds will go
    .sign(userIdentityPrivateKey)     // Signs all the inputs it can
*/



const sendOpts = {
  recipient: sendToAddress,
  satoshis: 50000,
  utxos: utxo,
  privateKeys: [userIdentityPrivateKey]
};

const changeAddress = BIP44AccountAddress //return change to identity address
console.log('changeAddress', changeAddress)

const tx = BIP44Account.createTransaction(sendOpts);


console.log('tx:', tx);

const signedTx = BIP44Account.sign(tx, userIdentityPrivateKey);
console.log('signedTx', signedTx);

//send TX
const txId = await BIP44Account.broadcastTransaction(tx);

console.log('txId:', txId);




}



async function getUTXO(addr) {
  try {
    const insightURL = axios.baseURL + addr + '/utxo'
    console.log('insight URL:', insightURL )
    const response = await axios.get(insightURL);
    //console.log(response);
    const utxo =  response.data;
    console.log('utxo:', utxo)
    return utxo;
    
    
  } catch (error) {
    console.error(error);
  }
}
