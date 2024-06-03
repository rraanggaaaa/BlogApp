
import {
    Card,
    CardBody,
    Avatar,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import Footer from "./pages/footer/Footer"
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'


function TeamCard({ img, name, title }) {

    return (

        <Card className="rounded-lg bg-[#FAFAFA]" shadow={false}>
            <CardBody className="text-center">
                <Avatar
                    src={img}
                    alt={name}
                    variant="circular"
                    size="xxl"
                    className="mx-auto mb-6 object-top w-20"
                />
                <Typography variant="h5" color="blue-gray" className="!font-medium text-lg">
                    {name}
                </Typography>
                <Typography
                    color="blue-gray"
                    className="mb-2 !text-base !font-semibold text-gray-600"
                >
                    {title}
                </Typography>
                <div className="flex items-center justify-center gap-1.5">
                    <IconButton variant="text" color="gray">
                        <i className="fa-brands fa-twitter text-lg" />
                    </IconButton>
                    <IconButton variant="text" color="gray">
                        <i className="fa-brands fa-linkedin text-lg" />
                    </IconButton>
                    <IconButton variant="text" color="gray">
                        <i className="fa-brands fa-dribbble text-lg" />
                    </IconButton>
                </div>
            </CardBody>
        </Card>
    );
}

const members = [
    {
        img: "https://img.freepik.com/free-psd/3d-illustration-person-with-glasses_23-2149436191.jpg?w=740&t=st=1714364716~exp=1714365316~hmac=c96268e4f92233bd079d143f3f7fa02b9d74aadb520f0a942cd13f72faf0c462",
        name: "Norfajriyah",
        title: "5210411024",
    },
    {
        img: "https://img.freepik.com/premium-photo/3d-man-cat-playful-happy-expression_435599-34220.jpg?w=740",
        name: "Dwi Rangga Okta Z",
        title: "5210411054",
    },
    {
        img: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1714364718~exp=1714365318~hmac=4fbd0d0673c40fb6d9b4e18989f4b2a6dd39cb48670c0b9ea3d0c7e227f722f0",
        name: "M. Aqsha Pasalewa ",
        title: "5210411080",
    },
    {
        img: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1714364718~exp=1714365318~hmac=4fbd0d0673c40fb6d9b4e18989f4b2a6dd39cb48670c0b9ea3d0c7e227f722f0",
        name: "Danu Dwiki Laksana ",
        title: "5210411165",
    },
    {
        img: "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1714364718~exp=1714365318~hmac=4fbd0d0673c40fb6d9b4e18989f4b2a6dd39cb48670c0b9ea3d0c7e227f722f0",
        name: "M. Naufal Hadi J ",
        title: "5210411365",
    },
];


const navigation = [
    { name: 'Home', href: '/', current: false },
    { name: 'Blog', href: '/BlogWelcome', current: false },
    { name: 'About', href: '/About', current: false },
]
export default function Welcome() {

    return (
        <>
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

            <main className="mt-20 bg-gray-900">


                {/* our team */}
                <section className="flex min-h-screen justify-center items-center bg-slate-100 py-8 px-8 lg:py-28" id='team'>
                    <div className="container mx-auto bg-gray-light" >
                        <div className="mb-10 text-center lg:mb-10">
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="text-lg"
                            >
                                Meet the Team
                            </Typography>
                            <Typography
                                variant="h1"
                                color="blue-gray"
                                className="my-2 !text-2xl lg:!text-4xl"
                            >
                                Behind the Success: Our Dedicated Team
                            </Typography>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {members.map((props, key) => (
                                <TeamCard key={key} {...props} />
                            ))}
                        </div>
                    </div>
                </section>

            </main >
            <Footer />
        </>
    );
}
