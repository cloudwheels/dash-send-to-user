const Dash = require('dash');

const sdkOpts = {
  network: 'testnet'
};
const client = new Dash.Client(sdkOpts);


/*
* ENTER THE ADDRESS YOU WANT TO SEARCH FOR HERE
*/

const addressToSearch = 'yPuoYnt96gwHVicc71m3wANRZxkLgbbprz';

(async function () {
  const platform = client.platform;
  await client.isReady();

  let lastCount = 0;
  while (true) {
    let documents;
    let usernames = [];
    let startAt = lastCount;
    do {
      let retry = true;
      do {
        try {
          documents = await platform.documents.get('dpns.domain', { startAt });
          //console.dir(documents);
          
          retry = false;
        } catch (e) {
          console.error(e.metadata);
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } while (retry);
      usernames = usernames.concat(
        documents.map(d => ({
          label: d.data.normalizedLabel,
          domain: d.data.normalizedParentDomainName,
          id: d.userId
        }))
      );
      startAt += 100;
    } while (documents.length === 100);

    if (lastCount === 0) {
    

      const addrArray = usernames.map(
        async u => {
         const identity = await platform.identities.get(u.id)
         const address = new Dash.Core.PublicKey(Buffer.from(await identity.getPublicKeyById(1).getData(), 'base64')).toAddress(Dash.Core.Networks.testnet).toString();
         
         return {address: address, id: u.id, name: u.label};
        });

      const nameAddresses = await Promise.all(addrArray);
      
      
      
      
      const matches = nameAddresses.filter(
        a => a.address === addressToSearch
      )
      
      console.log('found', matches.length, 'matching Addresses from total of ', usernames.length);
      
      console.dir(matches);
      

    }
    
    lastCount += usernames.length;
    if (usernames.length === 0) {return};

  }
  
})();