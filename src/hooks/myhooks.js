import React, { useEffect, useState } from "react";
import ChildToken from './../abi/childToken.json'
import SideBridge from './../abi/foriegnBridge.json'

import { 
    useAccount,
    useChainId,
    useSendTransaction,
    useWaitForTransactionReceipt,
    useWriteContract,
    useSwitchChain,
    useConfig 
  } from 'wagmi'
  import { parseEther } from 'viem'
import toast from "react-hot-toast";

import { writeContract, waitForTransactionReceipt  } from '@wagmi/core'



export const useTransactions = () => {
    const regexp = /^\d+(\.\d{1,18})?$/;
    const [amount, setAmount] = useState('');
    const [transferFrom, setTransferFrom] = useState('');
    const [transferTo, setTransferTo] = useState('');
    const [contractAddress, setContractAddress] = useState('')
    const [approvePending, setApprovePending] = useState(false)
    const [returnLoading, setReturnLoading ] = useState(false)
    const { address, isConnecting, isConnected } = useAccount()
    const { chains, switchChain } = useSwitchChain()
    const config = useConfig()

    const chainId = useChainId()

    const isErrorTxt = amount === '' || !regexp.test(amount)
    const isErrorTransferFrom = transferFrom === ''
    const isErrorTransferTo = transferTo === ''

    const { 
        data: hash, 
        isPending, 
        sendTransaction 
    } = useSendTransaction() 
    
    const { isLoading: isConfirming, isSuccess: isConfirmed } = 
        useWaitForTransactionReceipt({ 
            hash, 
        })
    
    // const { 
    //     data: approveHash, 
    //     isPending: approvePending, 
    //     writeContract: approve
    // } = useWriteContract() 

    // const { isLoading: isConfirmingApprove, isSuccess: isConfirmedApprove } = 
    //     useWaitForTransactionReceipt({ 
    //         approveHash, 
    //     })
    
    
    const HandleTransferFromChange = (e) => {
        const value = e
        if(value === '1') {
            setTransferFrom('1')
            setTransferTo('2')
        } else {
            setTransferFrom('2')
            setTransferTo('1')
        }
    }
    
    const HandleTransferToChange = (e) => {
        const value = e
        if(value === '1') {
            setTransferTo('1')
            setTransferFrom('2')
        } else {
            setTransferTo('2')
            setTransferFrom('1')
        }
    }
    
    const handleHomeTransaction = async () => {
        if(!isConnected) {
            toast.error('Connect you wallet..')
            return
        }
        if(!isErrorTxt && !isErrorTransferFrom && !isErrorTransferTo) {
            if(parseInt(chainId) === parseInt(import.meta.env.VITE_HOME_CHAIN_CHAINID)) {
                sendTransaction({ to: import.meta.env.VITE_HOME_CONTRACT_ADDRESS, value: parseEther(amount) })
            } else {
                switchChain({chainId: parseInt(import.meta.env.VITE_HOME_CHAIN_CHAINID)})
            }
        } else {
            toast.error('Please fill all fields..')
        } 
    }
    
    const handleApproveForiegn = async () => {
        if(!isConnected) {
            toast.error('Connect you wallet..')
            return
        }
        if(!isErrorTxt && !isErrorTransferFrom && !isErrorTransferTo) {
            if(parseInt(chainId) === parseInt(import.meta.env.VITE_FORIEGN_CHAIN_CHAINID)) {
                try {
                    setApprovePending(true)
                    const tx = await writeContract(config, {
                        address: import.meta.env.VITE_CHILD_TOKEN_ADDRESS,
                        abi: ChildToken,
                        functionName: 'approve',
                        args: [import.meta.env.VITE_FORIEGN_CONTRACT_ADDRESS ,parseEther(amount)]
                    })
                    console.log(tx)
                    const result = await waitForTransactionReceipt(config, {
                        hash: tx
                    })
                    console.log(result)
                    toast.success('Transaction confirmed successfully')
                    setApprovePending(false)
                } catch(e) {
                    console.log(e)
                    setApprovePending(false)
                    toast.error('Transaction failed')
                }
            } else {
                switchChain({chainId: parseInt(import.meta.env.VITE_FORIEGN_CHAIN_CHAINID)})
            }
        } else {
            toast.error('Please fill all fields..')
        } 
    }
    
    const handleForiegnTransaction = async () => {
        if(!isConnected) {
            toast.error('Connect you wallet..')
            return
        }
        if(!isErrorTxt && !isErrorTransferFrom && !isErrorTransferTo) {
            if(parseInt(chainId) === parseInt(import.meta.env.VITE_FORIEGN_CHAIN_CHAINID)) {
                try {
                    setReturnLoading(true)
                    const tx = await writeContract(config, {
                        address: import.meta.env.VITE_FORIEGN_CONTRACT_ADDRESS,
                        abi: SideBridge,
                        functionName: 'returnTokens',
                        args: [address ,parseEther(amount)]
                    })
                    console.log(tx)
                    const result = await waitForTransactionReceipt(config, {
                        hash: tx
                    })
                    console.log(result)
                    toast.success('Transaction confirmed successfully')
                    setReturnLoading(false)
                } catch(e) {
                    console.log(e)
                    setReturnLoading(false)
                    toast.error('Transaction failed')
                }
            } else {
                switchChain({chainId: parseInt(import.meta.env.VITE_FORIEGN_CHAIN_CHAINID)})
            }
        } else {
            toast.error('Please fill all fields..')
        }
    }


    return { 
        transferFrom,
        transferTo,
        amount, 
        setAmount,
        isErrorTxt,
        isErrorTransferFrom,
        isErrorTransferTo,
        isPending,
        approvePending,
        isConfirming,
        isConfirmed,
        HandleTransferFromChange,
        HandleTransferToChange,
        handleHomeTransaction,
        handleApproveForiegn,
        handleForiegnTransaction,
        returnLoading
    }

}