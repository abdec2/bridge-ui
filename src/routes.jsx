import {
  HomeIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";
import { Home, Tables  } from "@/pages/dashboard";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "bridge",
        path: "/home",
        element: <Home />,
      },

      // {
      //   icon: <TableCellsIcon {...icon} />,
      //   name: "transactions",
      //   path: "/transactions",
      //   element: <Tables />,
      // }
    ],
  },
  
];

export default routes;
