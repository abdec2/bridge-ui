import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
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

export function Home() {
  return (
    <div className="mt-12 ">
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
            <Tabs value="html">
              <TabsHeader>
                <Tab value={'mumbai'}>
                    Polygon Mumbai
                </Tab>
                <Tab value={'bsc'}>
                    bsc
                </Tab>
              </TabsHeader>
              <TabsBody>
                <TabPanel value={'mumbai'}>
                  hello
                </TabPanel>
                <TabPanel value={'bsc'}>
                  bsc
                </TabPanel>
              </TabsBody>
            </Tabs>
          </CardBody>
        </Card>

      </div>
    </div>
  );
}

export default Home;
