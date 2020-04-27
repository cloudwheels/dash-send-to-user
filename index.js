const Dash = require('dash');
var clientOpts = {};
var client = null;

client = new Dash.Client(clientOpts);
const { identities, names } = client.platform;

var userIdenityId, userPublicKey, userAddress;

/***
 * CHANGE THE USERNAME HERE
*/
const userName = 'dappuser'; //'dash-recipient';






(async() => {
  await client.isReady().then(async()=>{
    userIdenity = await getIdentity(userName);
    console.log('userIdenity:', userIdenity);
    userPublicKey = await getPublicKey(userIdenity);
    console.log('userPublicKey:', userPublicKey);
    userAddress = await getAddress(userPublicKey);
    console.log('userAddress:', userAddress);

    console.log('NEW IDENTITY ADDRESS:', await getAddress(await getPublicKey(await getIdentityFromId('8vnx6WHfyF1KUnPxijDhV53S3tHNzg3UEhMmd9hSpbCK'))));

  })
}
)()


async function getIdentityFromId(identityId) {
  try {
    const identity = await identities.get(identityId);
    //console.log("identity", JSON.stringify(identity));
    return identity;
  } catch(e) {
    console.log("getIdentity error", e);
  }
}


async function getIdentity(dashName) {
  try {
    const identityId = (await names.get(dashName)).data.records
      .dashIdentity;
    //console.log("identityid", identityId);
    const identity = await identities.get(identityId);
    //console.log("identity", JSON.stringify(identity));
    return identity;
  } catch(e) {
    console.log("getIdentity error", e);
  }
}



async function getPublicKey(identity) {
  try{
    const userPublicKeyFromId = await identity.getPublicKeyById(1);
    //console.log('userPublicKeyFromId',userPublicKeyFromId );
    const userPublicKeyFromIdData = await userPublicKeyFromId.getData();//base 64 enc public key
    //console.log('userPublicKeyFromIdData',userPublicKeyFromIdData);
    const userPublicKeyBuffer = Buffer.from(userPublicKeyFromIdData, 'base64')
    //console.log('userPublicKeyBuffer',userPublicKeyBuffer )
    const userPublicKeyFromBuffer = new Dash.Core.PublicKey(userPublicKeyBuffer)
    //console.log('userPublicKeyFromBuffer', userPublicKeyFromBuffer)
    return userPublicKeyFromBuffer;
  }
  catch(e){
    console.log("getPublicKey error", e);
  }
}



async function getAddress(publicKey){
  try{
    const userAddress = new Dash.Core.Address(publicKey,Dash.Core.Networks.testnet);
    //console.log('userAddress:', userAddress);
    return userAddress;
  }
  catch(e){
    console.log("getPublicKey error", e);
  }
}





