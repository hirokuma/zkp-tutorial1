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

const circomlibjs = require('circomlibjs');
const crypto = require('crypto');

/** Generate random number of specified byte length */
const rbigint = (nbytes) => BigInt('0x' + crypto.randomBytes(nbytes).toString('hex'));

(async () => {
  const pedersen = await circomlibjs.buildPedersenHash();

  // 31 bytes = 248 bits
  const value = rbigint(31); // 値によっては期待と異なるハッシュ値になることがある。原因不明。
  // const value = 47147923612045898161641070995147120065030130353900809301484784528935861854n;
  // console.log('value: ' + value.toString(16));
  const msg = Buffer.from(value.toString(16).match(/.{2}/g).reverse().join(''), 'hex');

  const hash = pedersen.hash(msg, {
    baseHash : 'blake',
  });

  // BabyJubjubのY座標になっている
  const hashBigInt = BigInt(
    '0x' + Buffer.from(hash).reverse().toString('hex')
  );
  const result = {
    secretHash: hashBigInt.toString(),
    secret: value.toString(),
  };
  console.log(JSON.stringify(result, null, 2));
})();
