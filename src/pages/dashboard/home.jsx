import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Select, 
  Option,
  Input,
  Button,
  Spinner 
  
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import { useTransactions } from "@/hooks/myhooks";

export function Home() {
  const { 
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
} = useTransactions()
  

  useEffect(() => {
    if(isConfirmed) {
      toast.success('Transaction confirmed successfully')
    }

  }, [isConfirmed])
  

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
              <Input size="lg" label="Amount" value={amount} error={isErrorTxt} onChange={(e) => setAmount(e.target.value)}/>
            </div>

            {
              transferFrom === "1" ? (
                <div className="mb-4 flex items-center justify-center space-x-4">
                  <Button disabled={isPending} variant="outlined" onClick={handleHomeTransaction}>
                    {
                      isPending ? (
                        <div className="flex items-center justify-between">
                          <span>Confirming...</span>
                          <Spinner />
                        </div>
                      ) : isConfirming ? (
                          <div className="flex items-center justify-between">
                            <span>Confirming...</span>
                            <Spinner />
                          </div>
                      ) : (
                        <span>Bridge</span>
                      )
                    } 
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center mb-4">
                  <div className="flex items-center justify-center space-x-4">
                    <Button disabled={approvePending} variant="gradient" onClick={handleApproveForiegn}>
                      {
                        approvePending ? (
                          <div className="flex items-center justify-between">
                            <span>Confirming...</span>
                            <Spinner />
                          </div>
                        ) : (
                          <span>Approve</span>
                        )
                      } 
                    </Button>
                    <Button disabled={returnLoading}  variant="outlined" onClick={handleForiegnTransaction}>
                      {
                        returnLoading ? (
                          <div className="flex items-center justify-between">
                            <span>Confirming...</span>
                            <Spinner />
                          </div>
                        ) : (
                          <span>Bridge</span>
                        )
                      }
                    </Button>
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
