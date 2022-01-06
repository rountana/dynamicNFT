import { CeramicClient } from '@ceramicnetwork/http-client'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import { TileDocument } from '@ceramicnetwork/stream-tile'
// import * as _ from 'lodash'

// import DID resolvers
import KeyDidResolver from 'key-did-resolver'
import ThreeIdResolver from '@ceramicnetwork/3id-did-resolver'

// import { EthereumAuthProvider } from '@ceramicnetwork/blockchain-utils-linking'
// import {w} from 'web3'

// Boilerplate - check for metamask/ethereum etc.
window.addEventListener('load', function() {
  
  if (typeof window.ethereum !== 'undefined') {
    console.log('window.ethereum is enabled')
    if (window.ethereum.isMetaMask === true) {
      console.log('MetaMask is active')
      let mmDetected = document.getElementById('mm-detected')
      mmDetected.innerHTML += 'MetaMask Is Available!'

      // add in web3 here
      // var web3 = new Web3(window.ethereum)

    } else {
      console.log('MetaMask is not available')
      let mmDetected = document.getElementById('mm-detected')
      mmDetected.innerHTML += 'MetaMask Not Available!'
      // let node = document.createTextNode('<p>MetaMask Not Available!<p>')
      // mmDetected.appendChild(node)
    }
  } else {
    console.log('window.ethereum is not found')
    let mmDetected = document.getElementById('mm-detected')
    mmDetected.innerHTML += '<p>MetaMask Not Available!<p>'
  }
})

////////////////////////////////////////////////////////////
///// set up http client
///////////////////////////////////////////////////////////

// for read only access :
// const API_URL = 'https://gateway-clay.ceramic.network'
// for write access use:
const API_URL = 'https://ceramic-clay.3boxlabs.com'
// to use local node
// const API_URL = 'https://localhost:7007'

// // //Create Ceramic instance
const ceramic = new CeramicClient(API_URL);

// create DID instance
import { DID } from 'dids'
//get the resolver - we need to use KeyDIDResolver, not 3ID
const resolver = {
  ...KeyDidResolver.getResolver(),
  ...ThreeIdResolver.getResolver(ceramic),
}
//create instance of resolver
const did = new DID({ resolver })

// set DID instance on HTTP client
ceramic.did = did

// random seed bytes generator
import { randomBytes } from '@stablelib/random'
const seed = randomBytes(32)

const provider = new Ed25519Provider(seed)
ceramic.did.setProvider(provider)

async function authCeramic() {
// authenticate did
 return await ceramic.did.authenticate()
}

/////////////////////////////////////////////////////
///  Create Tile Document
////////////////////////////////////////////////////
var docCopy = ' '

const createTile = async function () {
const doc = await TileDocument.create(
  ceramic,
  null,
    // {foo: 'some update to the tile'},
    {
    // controllers: [ceramic.did.id],
    family: 'pid', 
    tags: ['tag1'],
    deterministic: true
    },
    { publish: false, anchor: false }
)
// docCopy = _.cloneDeep(doc)
docCopy = doc.id
console.log("stream ID inside fn" + docCopy.toString())
return doc
}

createTile()
console.log("stream ID outside fn: " + docCopy.toString())


// doc.id.ToString required
/// output
// Stream Id after Update : function(...s){let a;this.hasOwnProperty(i)||Object.defineProperty(this,i,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let u=this[i];if(Array.isArray(n))for(const e of n)o.has(e)?o.get(e).push(u):o.set(e,[u]);if(t||s.length>0||r>0){let n;n=!0===t?s.map((e=>e.toString())).join("!"):t?t.apply(this,s):s[0];const i=`${n}__timestamp`;let o=!1;if(r>0)if(u.has(i)){let e=u.get(i);o=Date.now()-e>r}else o=!0;u.has(n)&&!o?a=u.get(n):(a=e.apply(this,s),u.set(n,a),r>0&&u.set(i,Date.now()))}else{const t=this;u.has(t)?a=u.get(t):(a=e.apply(this,s),u.set(t,a))}return a}
//doc.content.toString/ doc.metadata.toString return error = function native code


// console.log("Stream Id after Update : s outside fn : "  + s.id.toString())

// console.log("doc.id.toStrong : " + s.id)

// const streamId = createTile().then(console.log('Tile created!!'))
// console.dir("streamId.content: " + streamId.content)
// setTimeout(() => alert("create done!"), 5000)

//update tile

async function updateTile() {
const doc = await TileDocument.deterministic(
    ceramic,
    {family: 'pid', tags: ['tag1']},
  )  
  await doc.update({foo: 'add some content'})
const retrievedDoc = await TileDocument.deterministic(
  ceramic,
  {family: 'pid', tags: ['tag1']},
  {anchor: false, publish: false}
)  

console.log("Reading stream" + retrievedDoc.content.foo)
return doc
};

updateTile().then(value => {console.log("updated" + value.content.foo)})
// async function readTile(tile) {
//   const retrievedDoc = await TileDocument.load(
//     ceramic,
//     tile.id
//   )
// //     console.log("Reading stream")
//   console.log("Reading stream" + retrievedDoc.content.foo)
// //   console.log(doc.id.toString() === retrievedDoc.id.toString())
// //   console.log(doc.content.foo === retrievedDoc.content.foo)  
// }
// readTile()

/////////////////////////////////////////////////////
///  Update Tile Documents
////////////////////////////////////////////////////
// async function updateStream()  {
//   const streamId = permStreamID; // Replace this with the StreamID of the TileDocument to be updated
//   const docUpdateRef = await TileDocument.load(ceramic, streamId);  
//   await docUpdateRef.update({ foo: 'bazbazaba' }, { tags: ['baz'] })
// } 

// updateStream().then(console.log('Stream updated'))
// /////////////////////////////////////////////////////
// ///  Read Tile Documents                          ///
// ////////////////////////////////////////////////////
// const streamId = 'kjzl6cwe1jw14...'; // Replace this with the StreamID of the TileDocument to be loaded
// async function readStream() {
//   // return await TileDocument.load(ceramic, permStreamID);
//   const retrievedDoc = await TileDocument.deterministic(
//     ceramic,
//     { family: 'doc family', tags: ['tag1'] },
//     { anchor: false, publish: false }
//   );
//   console.log("Reading stream" + retrievedDoc.content.foo)
//   return retrievedDoc
// }

// readStream().then(console.log('Read called'))
// .then(console.log(doc.id.toString() === retrievedDoc.id.toString()))
// .then(console.log(doc.content.foo === retrievedDoc.content.foo))
