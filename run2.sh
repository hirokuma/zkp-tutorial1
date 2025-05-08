#!/bin/bash -e

echo '===================='
echo '== Part2: Phase 2 =='
echo '===================='
echo

# compile circuit

circom passwd-circuit.circom --r1cs --wasm --sym


# phase 2
npx snarkjs groth16 setup passwd-circuit.r1cs pot14_final.ptau circuit_0000.zkey
npx snarkjs zkey contribute circuit_0000.zkey circuit_0001.zkey --name="1st Contributor Name" -v -e="random text 1"
npx snarkjs zkey beacon circuit_0001.zkey circuit_final.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"

# export
npx snarkjs zkey export verificationkey circuit_final.zkey verification_key.json

echo
echo '================='
echo '== Part2: done =='
echo '================='
