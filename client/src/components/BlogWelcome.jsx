import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Footer from './pages/footer/Footer'
import FloatingButton from './pages/custom/FloatingButtom'

const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Blog', href: '/BlogWelcome', current: false },
    { name: 'About', href: '/About', current: false },
]
const BlogWelcome = () => {
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

        <html class="min-h-screen bg-slate-700">
            <header className="fixed inset-x-0 top-0 z-50 bg-white opacity-90 rounded-b-lg">
                <Disclosure as="nav" className="bg-slate-900">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
                                <div className="relative flex h-28 items-center justify-between">
                                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                        {/* Mobile menu button*/}
                                        <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                            <span className="absolute -inset-0.5" />
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                        <div className="flex flex-shrink-0 items-center">
                                            <img
                                                className="h-8 w-auto"
                                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                                alt="Your Company"
                                            />
                                        </div>
                                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
                                            <div className="flex space-x-5">
                                                {navigation.map((item) => (
                                                    <a
                                                        key={item.name}
                                                        href={item.href}
                                                        className="
                                                        text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-xl font-medium"

                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>

                                            <a
                                                href="./Login"
                                                className="flex w-28 justify-center items-center rounded-md ml-4 bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Login
                                            </a>
                                            <a
                                                href="./Register"
                                                className="flex w-28 justify-center items-center rounded-md ml-4 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Register
                                            </a>
                                        </div>
                                    </div>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">

                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Disclosure>
            </header>

            <body class="h-full p-4">
                <div className="min-h-screen bg-slate-700">
                    <div className="p-6 overflow-hidden">
                        <div className="mx-auto mt-20 max-w-2xl lg:mx-0 lg:max-w-none">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                {blogs.map((blog) => (
                                    <div
                                        key={blog.id}
                                        onClick={() => navigate(`/Login`)}
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
                <a href='/Login'>
                    <FloatingButton />
                </a>
            </body>

            <Footer />
        </html>
    );
};
export default BlogWelcome;
