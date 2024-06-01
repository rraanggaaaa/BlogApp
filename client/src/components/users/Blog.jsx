import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
    const [name, setName] = useState('');
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/blogs');
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-slate-700">
            <div className="p-6 overflow-hidden">
                <div className="mx-auto mt-20 max-w-2xl lg:mx-0 lg:max-w-none">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        {blogs.map((blog) => (
                            <div
                                key={blog.id}
                                onClick={() => navigate(`/blogs/${blog.id}`)}
                                className="cursor-pointer bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out"
                            >
                                <div className="p-6">
                                    <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                                    <p className="text-gray-600">{blog.content.replace(/(<([^>]+)>)/gi, '').substring(0, 100)}...</p>
                                </div>

                                <div className="bg-gray-100 p-4 flex justify-between items-center">
                                    <p className="text-gray-500 text-sm">Author: {blog.author}</p>
                                    <p className="text-gray-500 text-sm">{blog.createdAt}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Blog;
