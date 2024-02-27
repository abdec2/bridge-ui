import React, { useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Select, 
  Option,
  Input,
  Button
  
} from "@material-tailwind/react";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { 
  useAccount,
  useChainId,
  useSendTransaction,
  useWaitForTransactionReceipt
} from 'wagmi'
import { parseEther } from 'viem'

export function Home() {
  const regexp = /^\d+(\.\d{1,18})?$/;
  const [transferFrom, setTransferFrom] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [contractAddress, setContractAddress] = useState('')
  const { address, isConnecting, isDisconnected } = useAccount()
  const chainId = useChainId()

  const [amount, setAmount] = useState('');

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
    console.log(chainId === import.meta.env.VITE_HOME_CHAIN_CHAINID)
    if(!isErrorTxt && !isErrorTransferFrom && !isErrorTransferTo) {
      if(chainId == import.meta.env.VITE_HOME_CHAIN_CHAINID) {
        sendTransaction({ to: import.meta.env.VITE_HOME_CONTRACT_ADDRESS, value: parseEther(amount) })
      }
    } 
  }

  const handleForiegnTransaction = async () => {
    
  }
  

  return (
    <div className="mt-12 min-h-[80vh]">
      <div className="mb-12 flex w-full items-center justify-center">
        <Card className="border border-blue-gray-100 shadow-sm  w-full sm:w-4/5 md:w-2/3 xl:w-2/4 2xl:w-1/3">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-start justify-between p-6"
          >
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Bridge
              </Typography>

            </div>

          </CardHeader>
          <CardBody className=" px-6 pt-0 pb-2">
            <div className="mb-4">
              <Select size="lg" label="Transfer From" onChange={HandleTransferFromChange} value={transferFrom} error={isErrorTransferFrom}>
                <Option value="1">Bondz Chain</Option>
                <Option value="2">Binance Smart Chain</Option>
              </Select>
            </div>

            <div className="mb-4">
              <Select size="lg" label="Transfer To" value={transferTo} onChange={HandleTransferToChange} error={isErrorTransferTo}>
                <Option value="1">Bondz Chain</Option>
                <Option value="2">Binance Smart Chain</Option> 
              </Select>
            </div>

            <div className="mt-8 mb-4">
              <Input size="lg" label="Amount" error={isErrorTxt} onChange={(e) => setAmount(e.target.value)}/>
            </div>

            {
              transferFrom === "1" ? (
                <div className="mb-4 flex items-center justify-center space-x-4">
                  <Button variant="outlined" onClick={handleHomeTransaction}>Bridge</Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mb-4">
                  <div className="flex items-center justify-center space-x-4">
                    <Button variant="gradient">Approve</Button>
                    <Button variant="outlined">Bridge</Button>
                  </div>
                  <small className="mt-1 text-xs">First Approve then click on bridge..</small>
                </div>
              )
            }
            
          </CardBody>
        </Card>

      </div>
    </div>
  );
}

export default Home;
