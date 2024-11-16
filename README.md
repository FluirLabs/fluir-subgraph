# Fluir Subgraph 
This Subgraph retrieves data from events emitted by Fluir's Contracts deployed on Taiko Helka Testnet.


##  Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) 
- [Goldsky Account](https://app.goldsky.com/)

#### CLI Installation

```bash
curl -fsSL https://cli.goldsky.com/install | bash
```

#### CLI Authentication

```bash

# Login to Goldsky and paste your API key when prompted
goldsky login
```

### 1. Deploying from Source code:

In your existing Subgraph project directory, run the following commands:

```bash
# Generate the subgraph code with graph cli
graph codegen

# Build the subgraph
graph build

# Deploy the subgraph to Goldsky
goldsky subgraph deploy <subgraph name>/<version> --path .
```



