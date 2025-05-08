#!/bin/bash -e

echo '=================='
echo '== Part3: Proof =='
echo '=================='
echo


# create proof

node pedersen-input_js/calc.js > input.json

node passwd-circuit_js/generate_witness.js passwd-circuit_js/passwd-circuit.wasm input.json witness.wtns
npx snarkjs groth16 prove circuit_final.zkey witness.wtns proof.json public.json




# verify proof
npx snarkjs groth16 verify verification_key.json public.json proof.json


echo
echo '================='
echo '== Part3: done =='
echo '================='
