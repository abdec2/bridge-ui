import { defineChain } from 'viem'

export const bondzMainnet = defineChain({
    id: 483, 
    name: 'Bondz',
    nativeCurrency: {name: 'Bondz', symbol: 'BNDZ', decimals: 18},
    rpcUrls: {
        default: {http: ['https://rpc.bondzscan.com:483/']}
    },
    blockExplorers: {
        default: { name: 'bondzscan', url: 'https://bondzscan.com/' },
    },
})