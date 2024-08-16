# Ethereum Token Pair Finder

## Project Goal
The Ethereum Token Pair Finder is a tool designed to identify wallets that contain both of a specified pair of ERC20 tokens. It also aims to determine and sort results based on the earliest appearance of both tokens in each wallet.

## Features
- Search for wallets containing a specific pair of ERC20 tokens
- Retrieve token information (name, symbol, total supply) for given contract addresses
- Sort results based on the earliest appearance of both tokens in a wallet
- User-friendly web interface built with React

## Getting Started

### Prerequisites
- Node.js (v14 or later recommended)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
git clone https://github.com/bqced/Token-Pair-Finder.git

2. Navigate to the project directory:
cd Token-Pair-Finder

3. Install dependencies:
npm install

4. Create a `.env` file in the root directory and add your Etherscan API key:
REACT_APP_ETHERSCAN_API_KEY=your_api_key_here

### Running the Application
1. Start the development server:
npm start

2. Open your browser and navigate to `http://localhost:3000`

## Usage
1. Enter the contract addresses of two ERC20, BNB, SOL tokens
2. Click "Search" to find wallets containing both tokens
3. View the results, sorted by the earliest appearance of both tokens

## Contributing
We welcome contributions to the Token Pair Finder! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.

## License
This project is open source and available under the [MIT License](LICENSE).

## Disclaimer
This tool is for educational and research purposes only. Always conduct your own research and due diligence when dealing with cryptocurrency and blockchain technology.
