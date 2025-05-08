// https://zenn.dev/0xywzx/articles/bdb6c991f3fc8b#4.-proof%E3%81%AE%E7%94%9F%E6%88%90
// https://github.com/0xywzx/event/blob/664ee271dc39946383e5014cff814ae6d340758d/20231111_web3_global_hackathon/zk-secret/script/pedersen.js#L12-L18
// {
//    secret: 47147923612045898161641070995147120065030130353900809301484784528935861854,
//    hash: 6652720879077241532616383128614021269153945618627832693739893997014067042416
// }
//
// $ node calc.js
// {
//   secret: 47147923612045898161641070995147120065030130353900809301484784528935861854n,
//   hash: 6652720879077241532616383128614021269153945618627832693739893997014067042416n
// }

// tornadocach/circomlib を使っている
const circomlib = require("circomlib");

const value =
  47147923612045898161641070995147120065030130353900809301484784528935861854n;

/** Compute pedersen hash */
const pedersenHash = (data) =>
  circomlib.babyJub.unpackPoint(circomlib.pedersenHash.hash(data))[0];

const main = () => {
  const LEN = Math.ceil(value.toString(16).length / 2);
  const secret = value.leInt2Buff(LEN);
  const hash = pedersenHash(secret);
  const result = {
    secret: value.toString(),
    hash: hash.toString(),
  };

  console.log('LEN = ' + LEN);
  console.log('secret: ' + value.toString(16));
  console.log('hash  : ' + hash.toString(16));
  console.log(JSON.stringify(result, null, 2));
};

main();
