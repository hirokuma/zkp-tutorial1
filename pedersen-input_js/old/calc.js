// https://zenn.dev/0xywzx/articles/bdb6c991f3fc8b#4.-proof%E3%81%AE%E7%94%9F%E6%88%90
// https://github.com/0xywzx/event/blob/664ee271dc39946383e5014cff814ae6d340758d/20231111_web3_global_hackathon/zk-secret/script/pedersen.js#L12-L18

// # babyJub[0] : X-coodinate
// {
//   "secretHash": "6652720879077241532616383128614021269153945618627832693739893997014067042416",
//   "secret": "47147923612045898161641070995147120065030130353900809301484784528935861854"
// }

// # babyJub[1] : Y-coodinate
// {
//   "secretHash": "16987291996231647449442993275694270711884540196856219763064265400798896399766",
//   "secret": "47147923612045898161641070995147120065030130353900809301484784528935861854"
// }


// tornadocach/circomlib を使っている
const circomlib = require("circomlib");
const crypto = require('crypto');

const input =
//  47147923612045898161641070995147120065030130353900809301484784528935861854n;
  215639607065785049144943613156164690545709108427768513382832754285184579360n;

const rbigint = (nbytes) => BigInt('0x' + crypto.randomBytes(nbytes).toString('hex'));


/** Compute pedersen hash */
const pedersenHash = (data) =>
  // [0]X, [1]Y
  circomlib.babyJub.unpackPoint(circomlib.pedersenHash.hash(data))[1];

const main = () => {
  const inputLen = Math.ceil(input.toString(16).length / 2);
  //const v = rbigint(31);
  const v = input;
  const msg = v.leInt2Buff(inputLen);
  const hash = pedersenHash(msg);
  const result = {
    secretHash: hash.toString(),
    secret: v.toString(),
  };

  // const h = circomlib.pedersenHash.hash(msg);
  // console.log('h: ' + h.toString('hex'));
  // const point = circomlib.babyJub.unpackPoint(h);
  // console.log('point: ' + point);

  // console.log('inputLen = ' + inputLen);
  // console.log('input: 0x' + input.toString(16));
  // console.log('msg:   0x' + msg.toString('hex'));
  // console.log('hash:  0x' + hash.toString(16));
  console.log(JSON.stringify(result, null, 2));

  // const hashLen = Math.ceil(hash.toString(16).length / 2);
  // console.log('hashLen = ' + hashLen);
};

main();

