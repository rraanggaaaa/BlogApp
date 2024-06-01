// Sidebar.js
import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom"; // tambahkan ini

export function SidebarWithContentSeparator() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          BlogApps
        </Typography>
      </div>
      <List>
        <ListItem className="p-0" selected={open === 1}>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5 me-3" />
          </ListItemPrefix>
          <Typography color="blue-gray" className="mr-auto font-normal ">
            Dashboard
          </Typography>
        </ListItem>

        <hr className="my-2 border-blue-gray-50" />
        <ListItem className="mt-4">
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5 me-3" />
          </ListItemPrefix>
          <NavLink
            to="/admin/articles"
            className="text-blue-gray-500 hover:text-blue-gray-600"
            activeClassName="text-blue-gray-900"
          >
            My Articles
          </NavLink>
        </ListItem>
        <ListItem className="mt-4">
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5 me-3" />
          </ListItemPrefix>
          Contributor
        </ListItem>

        <ListItem className="mt-4">
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5 me-3" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}

export default SidebarWithContentSeparator;
