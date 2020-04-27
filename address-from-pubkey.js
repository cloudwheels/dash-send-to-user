const Dash = require('dash');

const sdkOpts = {
  network: 'testnet'
};
const client = new Dash.Client(sdkOpts);

arrTestIDs = ['G5gNQ2KgJ4eF8FGqhSVxEs4UU8ESFsNXd35vQYyYc8Ut','G3mthNDmcYwoVtbyjWgQz6Xyd2qQ5SSPgKM57N9hyN22'];

(async function () {
  const platform = client.platform;
  await client.isReady();
  
  arrTestIDs.forEach(async(testID) =>{
    
    const identity = await platform.identities.get(testID)
    console.log ('testID:', testID);
    const pubKey = new Dash.Core.PublicKey(Buffer.from(await identity.getPublicKeyById(1).getData(), 'base64'))
    console.log ('pubKey:', pubKey);
    const address = pubKey.toAddress(Dash.Core.Networks.testnet).toString();
    console.log ('Address:', address);
  })
  
  
})()