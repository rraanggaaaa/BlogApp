import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { Disclosure } from "@headlessui/react";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const Overview = () => {
  return (
    <DefaultLayout>
      <div className="flex flex-row space-x-4 mt-6">
        <Card className="w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2 ms-4">
              Today Views
            </Typography>
            <Typography className="mb-2 ms-4">10</Typography>
          </CardBody>
        </Card>
        <Card className="w-96">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2 ms-4">
              Total Views
            </Typography>
            <Typography className="mb-2 ms-4">10</Typography>
          </CardBody>
        </Card>
        <Card className="w-96">
          <CardBody>
            <Typography
              variant="h5"
              color="blue-gray"
              className="mb-2 ms-4 shadow-blue-gray-900/5"
            >
              Your Articles
            </Typography>
            <Typography className="mb-2 ms-4">10</Typography>
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default Overview;
