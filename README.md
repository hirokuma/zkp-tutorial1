# ZKP Password Circuit

このプロジェクトは、Circom を使用して秘密情報を Pedersen ハッシュで検証するゼロ知識証明 (ZKP) のサンプル実装です。

オリジナルはこちらです。

* [ZKP（zkSNARKs）の使い方と活用事例](https://zenn.dev/0xywzx/articles/bdb6c991f3fc8b)

## プロジェクト構成

```
.gitignore
.node-version
circuit_0000.zkey
circuit_0001.zkey
circuit_final.zkey
input.json
package.json
passwd-circuit.circom
passwd-circuit.r1cs
passwd-circuit.sym
pot14_0000.ptau
pot14_0001.ptau
pot14_0002.ptau
pot14_0003.ptau
pot14_beacon.ptau
pot14_final.ptau
proof.json
public.json
run.sh
verification_key.json
witness.wtns
passwd-circuit_js/
    generate_witness.js
    passwd-circuit.wasm
    witness_calculator.js
pedersen-input_js/
    calc.js
```

### 主なファイル

- **`passwd-circuit.circom`**: Circom で記述された回路定義ファイル。
- **`input.json`**: 証明生成に使用する入力データ。
- **`run.sh`**: 証明生成と検証を自動化するスクリプト。
- **`pedersen-input_js/calc.js`**: Pedersen ハッシュを計算するスクリプト。

## 必要条件

- Node.js バージョン: `22.15.0`（`.node-version` に記載）
- 必要な npm パッケージ:
  - `circomlib`
  - `circomlibjs`
  - `snarkjs`

依存関係は `package.json` に記載されています。

## セットアップ

1. 必要な依存関係をインストールします。

   ```bash
   npm install
   ```

2. 必要に応じて Node.js のバージョンを `.node-version` に合わせてください。

## 使用方法

### 1. Pedersen ハッシュの計算

`pedersen-input_js/calc.js` を実行して、秘密情報の Pedersen ハッシュを計算します。

```bash
node pedersen-input_js/calc.js
```

### 2. 証明生成と検証

`run.sh` を実行して、証明生成と検証を行います。

```bash
bash run.sh
```

このスクリプトは以下の手順を実行します:
- Powers of Tau の初期化と貢献
- ランダムビーコンの適用
- Phase 2 の準備
- 回路のセットアップと証明鍵の生成
- 証明の生成と検証

### 3. 入力データの変更

`input.json` を編集して、異なる秘密情報を使用できます。

```json
{
  "secretHash": "16987291996231647449442993275694270711884540196856219763064265400798896399766",
  "secret": "47147923612045898161641070995147120065030130353900809301484784528935861854"
}
```

### 4. 証明の検証

生成された証明を検証するには、以下のコマンドを使用します。

```bash
npx snarkjs groth16 verify verification_key.json public.json proof.json
```

## ファイルの説明

- **`.gitignore`**: バージョン管理から除外するファイルを指定。
- **`passwd-circuit.circom`**: Circom 回路の定義。
- **`run.sh`**: 証明生成と検証の自動化スクリプト。
- **`pedersen-input_js/calc.js`**: Pedersen ハッシュ計算スクリプト。

## ライセンス

このプロジェクトは [ISC License](LICENSE) のもとで公開されています。