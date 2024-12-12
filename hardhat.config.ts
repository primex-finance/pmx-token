// Get the environment configuration from .env file
//
// To make use of automatic environment setup:
// - Duplicate .env.example file and name it .env
// - Fill in the environment variables
import 'dotenv/config'

import 'hardhat-deploy'
import 'hardhat-contract-sizer'
import '@nomiclabs/hardhat-ethers'
import '@layerzerolabs/toolbox-hardhat'
import { HardhatUserConfig, HttpNetworkAccountsUserConfig } from 'hardhat/types'

import { EndpointId } from '@layerzerolabs/lz-definitions'

import './type-extensions'
import './tasks';
import '@nomicfoundation/hardhat-verify';
import './tasks/sendOFT';


// Set your preferred authentication method
//
// If you prefer using a mnemonic, set a MNEMONIC environment variable
// to a valid mnemonic
const MNEMONIC = process.env.MNEMONIC

// If you prefer to be authenticated using a private key, set a PRIVATE_KEY environment variable
const PRIVATE_KEY = process.env.PRIVATE_KEY

const accounts: HttpNetworkAccountsUserConfig | undefined = MNEMONIC
    ? { mnemonic: MNEMONIC }
    : PRIVATE_KEY
      ? [PRIVATE_KEY]
      : undefined

if (accounts == null) {
    console.warn(
        'Could not find MNEMONIC or PRIVATE_KEY environment variables. It will not be possible to execute transactions in your example.'
    )
}

const config: HardhatUserConfig = {
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY
      },
    paths: {
        cache: 'cache/hardhat',
    },
    solidity: {
        compilers: [
            {
                version: '0.8.22',
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200,
                    },
                },
            },
        ],
    },
    networks: {
        'sepolia-testnet': {
            eid: EndpointId.SEPOLIA_V2_TESTNET,
            url: process.env.RPC_URL_SEPOLIA || 'https://rpc.sepolia.org/',
            accounts,
            oftAdapter: {
                tokenAddress: '0x0', // Set the token address for the OFT adapter
            },
        },
        'avalanche-testnet': {
            eid: EndpointId.AVALANCHE_V2_TESTNET,
            url: process.env.RPC_URL_FUJI || 'https://rpc.ankr.com/avalanche_fuji',
            accounts,
        },
        'amoy-testnet': {
            eid: EndpointId.AMOY_V2_TESTNET,
            url: process.env.RPC_URL_AMOY || 'https://polygon-amoy-bor-rpc.publicnode.com',
            accounts,
        },
        'polygon': {
            eid: EndpointId.POLYGON_V2_MAINNET,
            url: process.env.RPC_URL_POLYGON || 'https://polygon-mainnet.g.alchemy.com/v2/VtijamuHgl8L4DwmjVFQHOz-OnC7PhNi',
            accounts,
            gasPrice: 100e9,
            timeout: 60000,
        },
        'arbitrumOne': {
            eid: EndpointId.ARBITRUM_V2_MAINNET,
            url: process.env.RPC_URL_ARBITRUM || 'https://arb-mainnet.g.alchemy.com/v2/VtijamuHgl8L4DwmjVFQHOz-OnC7PhNi',
            accounts,
        },
        'ethereum': {
            eid: EndpointId.ETHEREUM_V2_MAINNET,
            url: process.env.RPC_URL_ETHEREUM || 'https://eth-mainnet.g.alchemy.com/v2/VtijamuHgl8L4DwmjVFQHOz-OnC7PhNi',
            accounts,
            oftAdapter: {
                tokenAddress: '0x0B3EAEAd748facDb9d943d3407011f16Eb17D0Cf', // Set the token address for the OFT adapter
            },
            gasPrice: 15.3e9,
            timeout: 600000,
        },
        'base': {
            eid: EndpointId.BASE_V2_MAINNET,
            url: process.env.RPC_URL_BASE || 'https://base-mainnet.g.alchemy.com/v2/VtijamuHgl8L4DwmjVFQHOz-OnC7PhNi',
            accounts
        },
        'bsc': {
            eid: EndpointId.BSC_V2_MAINNET,
            url: process.env.RPC_URL_BASE || 'https://bnb-mainnet.g.alchemy.com/v2/VtijamuHgl8L4DwmjVFQHOz-OnC7PhNi',
            accounts,
            gasPrice: 1e9,
        },
    },
    namedAccounts: {
        deployer: {
            default: 0, // wallet address of index[0], of the mnemonic in .env
        },
    },
}

export default config
