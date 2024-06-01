import React, { useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { Card, Typography, Input } from "@material-tailwind/react";
import Quill from "quill";

const CreateArticles = () => {
  useEffect(() => {
    const quill = new Quill("#editor");
  }, []);

  return (
    <DefaultLayout>
      <div className="flex justify-between items-center mb-4">
        <Typography>Tambah Article</Typography>
      </div>
      <div className="w-72 mt-10">
        <Input label="Title" />
      </div>
      <div id="editor" className="h-72 mt-4"></div>
    </DefaultLayout>
  );
};

export default CreateArticles;
