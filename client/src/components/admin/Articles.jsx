import React, { useEffect, useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { Card, Typography } from "@material-tailwind/react";
import Editor from "../context/main";
import axios from "axios";

const TABLE_HEAD = ["Title", "Author", "Content", "Created_At"];

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/blogs");
        setArticles(response.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <DefaultLayout>
      <Editor />
      <div className="flex justify-between items-center mt-10 mb-4">
        <h1 className="font-loader text-lg">List Article</h1>
      </div>
      <Card className="h-full  w-full rounded-lg  bg-slate-900">
        <table className="table-auto text-left bg-slate-900 p-6 m-4 rounded-md">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="text-white border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td className="p-4 border-b border-blue-gray-50 text-green-200">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {article.title}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50 text-green-200">
                  <div
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </td>

                <td className="p-4 border-b border-blue-gray-50 text-green-200">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {article.author}
                  </Typography>
                </td>
                <td className="p-4 border-b border-blue-gray-50 text-green-200">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {article.createdAt}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </DefaultLayout>
  );
};

export default Articles;
