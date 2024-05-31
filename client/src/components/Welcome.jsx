import React, { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import WebFont from 'webfontloader';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Maps from './pages/maps/Maps';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

const navigation = [
    { name: 'Home', href: '/Home', current: false },
    { name: 'Blog', href: '/Blog', current: false },
    { name: 'About', href: '/About', current: false },
]

const navigationfooter = [
    { name: 'Home', href: '/Home', current: false },
    { name: 'Blog', href: '/Blog', current: false },
    { name: 'About', href: '/About', current: false },
    { name: 'Contact Us', href: '/contact', current: false },
]

const links = [
    { name: 'Open roles', href: '#' },
    { name: 'Internship program', href: '#' },
    { name: 'Our values', href: '#' },
    { name: 'Meet our leadership', href: '#' },
]

const Welcome = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        WebFont.load({
            google: {
                families: ['sans-serif', 'Poppins']
            }
        });
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate('/');
            }
        }
    };

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

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
                                                        className={classNames(
                                                            item.current ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                            'rounded-md px-3 py-2 text-xl font-medium'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        {item.name}
                                                    </a>
                                                ))}
                                            </div>

                                            <a
                                                href="./Login"
                                                className="flex w-28 justify-center items-center rounded-md ml-4 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Login
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
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="/Profile"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Your Profile
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <a
                                                                href="#"
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                            >
                                                                Settings
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Disclosure>
            </header>

            <body class="h-full">
                <div className="min-h-screen  isolate flex justify-center items-center overflow-hidden bg-slate-900 py-24 sm:py-32 rounded-b-3xl">
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                        alt=""
                        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
                    />
                    <div
                        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                    <div
                        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="flex justify-center items-center mx-auto max-w-2xl lg:mx-0">
                            <h1 className='font-loader text-4xl font-mono font-bold tracking-tight text-white sm:text-3xl'>Get in Touch</h1>
                        </div>
                        <div className="flex mx-auto text-center justify-center items-center max-w-2xl lg:mx-0">
                            <p className="mt-4 text-lg leading-8 text-gray-300">
                                Kontact us to publish your content and show ads to our <br></br> website and get a good reach
                            </p>
                        </div>
                        <div className="mx-auto mt-20 max-w-2xl lg:mx-0 lg:max-w-none">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                                {links.map((link) => (
                                    <a key={link.name} href={link.href}>
                                        {link.name} <span aria-hidden="true">&rarr;</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className=''>
                    <Maps />
                </div>

                <section className='-mt-32 isolate flex justify-center items-center'>
                    <div className='flex justify-center rounded-lg items-center bg-white'>
                        <form className='p-10'>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Send us message</h2>
                                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    autoComplete="given-name"
                                                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                                Email
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    autoComplete="family-name"
                                                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="sm:col-span-3">
                                            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                                                Phone
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    id="phone"
                                                    autoComplete="given-name"
                                                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-3">
                                            <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                                                Subject
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="subject"
                                                    id="last-name"
                                                    autoComplete="family-name"
                                                    className="block p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-full">
                                            <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                                                Message
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="message"
                                                    id="message"
                                                    autoComplete="message"
                                                    className="block p-2 w-full rounded-md border-0 py-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-center gap-x-6">
                                <button
                                    type="submit"
                                    className="rounded-md w-32 h-12 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                <section className='flex mt-10 justify-center items-center'>
                    <div className='justify-center items-center p-12 bg-blue-400 rounded-lg'>
                        <div className='flex justify-center items-center'>
                            <h1 className='text-3xl font-sans font-semibold text-white'>
                                Join our team to be a part
                            </h1>
                        </div>
                        <div className='flex justify-center items-center'>
                            <h1 className='text-3xl font-sans font-semibold text-white'>
                                of our story
                            </h1>
                        </div>

                        <div className="sm:col-span-3 mt-10">
                            <label htmlFor="email" className="block ms-10 text-sm font-medium leading-6 text-white">
                                Email
                            </label>
                            <div className="flex mt-2 justify-center items-center">
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    autoComplete="family-name"
                                    className="block p-2 w-80 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                <button
                                    type="submit"
                                    className="rounded-md w-32 h-10 ml-2 bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Join Now
                                </button>
                            </div>
                            <div className='flex justify-center items-center'>
                                <div className='mt-10 items-center bg-blue-400'>
                                    <h1 className='text-sm text-center font-sans text-white'>
                                        Thank you for participant !
                                    </h1>
                                    <h1 className='text-sm font-sans text-white'>
                                        Have a nice day and good luck :D
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

                <section className='min-h-screen m-10'>
                    <div className='flex justify-center items-center'>
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company"
                        />
                        <h1 className='text-white font-bold text-xl ml-6 font-mono'>BlogApp</h1>
                    </div>

                    <div className='flex justify-center items-center m-4'>
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-center">
                            <div className="flex space-x-5">
                                {navigationfooter.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'bg-gray-700  text-white' : 'text-white hover:bg-gray-700 hover:text-white',
                                            'rounded-md px-3 py-2 text-sm font-normal'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>
            </body>
        </html>
    );
};

export default Welcome;
