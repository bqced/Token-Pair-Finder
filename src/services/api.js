// src/services/api.js

const ETHERSCAN_API_KEY = '';
const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';

async function makeEtherscanRequest(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log('Etherscan API response:', JSON.stringify(data, null, 2));
      
      if (data.status === '1') {
        return data.result;
      } else if (data.message === 'NOTOK' && data.result && data.result.includes('Max rate limit reached')) {
        console.log(`Rate limit reached, retrying in ${(i + 1) * 2000} ms...`);
        await new Promise(resolve => setTimeout(resolve, (i + 1) * 2000));
      } else {
        throw new Error(`Etherscan API error: ${data.message || 'Unknown error'} - ${data.result || 'No result'}`);
      }
    } catch (error) {
      console.error(`Request failed (attempt ${i + 1}/${retries}):`, error);
      if (i === retries - 1) throw error;
      console.log(`Retrying in ${(i + 1) * 2000} ms...`);
      await new Promise(resolve => setTimeout(resolve, (i + 1) * 2000));
    }
  }
}

export async function getTokenInfo(tokenAddress, network) {
  if (network !== 'ethereum') {
    throw new Error('Only Ethereum network is supported in this example');
  }

  try {
    // Prepare function calls
    const calls = [
      { name: 'name', signature: '0x06fdde03' },
      { name: 'symbol', signature: '0x95d89b41' },
      { name: 'totalSupply', signature: '0x18160ddd' }
    ];

    // Make calls
    const results = await Promise.all(calls.map(async (call) => {
      const url = `${ETHERSCAN_API_URL}?module=proxy&action=eth_call&to=${tokenAddress}&data=${call.signature}&apikey=${ETHERSCAN_API_KEY}`;
      console.log(`Fetching ${call.name} from:`, url);
      const result = await makeEtherscanRequest(url);
      return { name: call.name, result };
    }));

    // Parse results
    const tokenInfo = {
      address: tokenAddress,
      name: decodeString(results.find(r => r.name === 'name')?.result),
      symbol: decodeString(results.find(r => r.name === 'symbol')?.result),
      totalSupply: decodeUint256(results.find(r => r.name === 'totalSupply')?.result)
    };

    return tokenInfo;
  } catch (error) {
    console.error('Error in getTokenInfo:', error);
    throw error;
  }
}

// Helper functions for decoding Ethereum ABI-encoded data
function decodeString(hexString) {
  if (!hexString || hexString === '0x') return 'N/A';
  const bytes = hexToBytes(hexString.slice(2));
  const length = parseInt(bytes.slice(0, 32).join(''), 16);
  return new TextDecoder().decode(new Uint8Array(bytes.slice(32, 32 + length)));
}

function decodeUint256(hexString) {
  if (!hexString || hexString === '0x') return 'N/A';
  // Convert the hex string to a decimal string
  let decimal = '';
  for (let i = 2; i < hexString.length; i++) {
    decimal = addHexChar(decimal, hexString[i]);
  }
  return decimal;
}

function addHexChar(decimal, hexChar) {
  decimal = multiplyBy16(decimal);
  const digit = parseInt(hexChar, 16);
  return addNumbers(decimal, digit.toString());
}

function multiplyBy16(num) {
  let result = '';
  let carry = 0;
  for (let i = num.length - 1; i >= 0; i--) {
    const product = parseInt(num[i]) * 16 + carry;
    result = (product % 10) + result;
    carry = Math.floor(product / 10);
  }
  if (carry > 0) {
    result = carry + result;
  }
  return result;
}

function addNumbers(num1, num2) {
  let result = '';
  let carry = 0;
  let i = num1.length - 1;
  let j = num2.length - 1;
  while (i >= 0 || j >= 0 || carry > 0) {
    const digit1 = i >= 0 ? parseInt(num1[i]) : 0;
    const digit2 = j >= 0 ? parseInt(num2[j]) : 0;
    const sum = digit1 + digit2 + carry;
    result = (sum % 10) + result;
    carry = Math.floor(sum / 10);
    i--;
    j--;
  }
  return result;
}

function hexToBytes(hex) {
  const bytes = [];
  for (let c = 0; c < hex.length; c += 2) {
    bytes.push(parseInt(hex.substr(c, 2), 16));
  }
  return bytes;
}
