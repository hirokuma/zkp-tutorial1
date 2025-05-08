#!/bin/bash

# start
npx snarkjs powersoftau new bn128 14 pot14_0000.ptau -v

# celemony(few minutes)
npx snarkjs powersoftau contribute pot14_0000.ptau pot14_0001.ptau --name="First contribution" -v -e="random text 1"
npx snarkjs powersoftau contribute pot14_0001.ptau pot14_0002.ptau --name="First contribution" -v -e="random text 2"
npx snarkjs powersoftau contribute pot14_0002.ptau pot14_0003.ptau --name="First contribution" -v -e="random text 3"

# apply random beacon(few minutes)
npx snarkjs powersoftau beacon pot14_0003.ptau pot14_beacon.ptau 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon"

# prepare phase 2(several minutes)
npx snarkjs powersoftau prepare phase2 pot14_beacon.ptau pot14_final.ptau -v

# verify
npx snarkjs powersoftau verify pot14_final.ptau





# phase 2
npx snarkjs groth16 setup passwd-circuit.r1cs pot14_final.ptau circuit_0000.zkey
npx snarkjs zkey contribute circuit_0000.zkey circuit_0001.zkey --name="1st Contributor Name" -v -e="random text 1"
npx snarkjs zkey beacon circuit_0001.zkey circuit_final.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"

# export
npx snarkjs zkey export verificationkey circuit_final.zkey verification_key.json






# create proof
## input.json

node passwd-circuit_js/generate_witness.js passwd-circuit_js/passwd-circuit.wasm input.json witness.wtns
npx snarkjs groth16 prove circuit_final.zkey witness.wtns proof.json public.json




# verify proof
npx snarkjs groth16 verify verification_key.json public.json proof.json
