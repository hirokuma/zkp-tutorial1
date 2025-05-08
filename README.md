# ZKP Password Circuit

このプロジェクトは、Circom を使用して秘密情報を Pedersen ハッシュで検証するゼロ知識証明 (ZKP) のサンプル実装です。

オリジナルはこちらです。

* [ZKP（zkSNARKs）の使い方と活用事例](https://zenn.dev/0xywzx/articles/bdb6c991f3fc8b)

### 主なファイル

- **`passwd-circuit.circom`**: Circom で記述された回路定義ファイル。
- **`run*.sh`**: 証明生成と検証を自動化するスクリプト。
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

### 1. Execute Phase 1

```bash
./run1.sh
```

### 2. Compile circuit and execute Phase 2

```bash
./run2.sh
```

### 3. Create proof and verify the proof

```bash
./run3.sh
```

## ライセンス

このプロジェクトは [ISC License](LICENSE) のもとで公開されています。