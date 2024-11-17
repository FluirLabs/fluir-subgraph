# Fluir Subgraph 
This Subgraph retrieves data from events emitted by Fluir's Contracts deployed on Taiko Hekla Testnet.


##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) 
- [Goldsky Account](https://app.goldsky.com/)

### Clone the repository
``` 
git clone https://github.com/FluirLabs/fluir-subgraph
cd fluir-subgraph
```



 ### Install dependencies

```
npm install
```

#### CLI Installation

```bash
curl -fsSL https://cli.goldsky.com/install | bash
```

#### CLI Authentication

```bash

# Login to Goldsky and paste your API key when prompted
goldsky login
```
a
### 1. Deploying from Source code:

In the Fluir Subgraph project directory, run the following commands:

```bash
# Generate the subgraph code with graph cli
prepare:taiko-hekla
graph codegen

# Build the subgraph
graph build

# Deploy the subgraph to Goldsky
goldsky subgraph deploy <subgraph name>/<version> --path .
```



