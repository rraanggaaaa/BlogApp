import { Typography } from "@material-tailwind/react";

const navigationfooter = [
    { name: 'Home', href: '/Home', current: false },
    { name: 'Blog', href: '/Blog', current: false },
    { name: 'About', href: '/About', current: false },
    { name: 'Contact Us', href: '/contact', current: false },
]

const Footer = () => {

    return (
        <footer className="w-full mt-10 bg-slate-900 text-white p-8">
            <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-slate-900 text-white text-center md:justify-between">
                <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                />

                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
                    <div className="flex space-x-5">
                        {navigationfooter.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className=" text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-md font-medium"
                                aria-current={item.current ? 'page' : undefined}
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
            <hr className="my-8 border-blue-gray-50" />
            <Typography color="blue-gray" className="text-center font-normal">
                &copy; 2023 Material Tailwind
            </Typography>
        </footer>
    );
};

export default Footer;
