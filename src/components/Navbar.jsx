
import React from 'react';
import {Link,NavLink} from 'react-router-dom';

const Navbar = () =>{

    return(
        <>
        <header className='sticky top-0 shadow z-50'>
            {/* px stands for padding on the x-axis */}
            {/* lg: is a responsive variant in Tailwind CSS.*/}
            <nav className='bg-white px-4 lg:px-6 py-2.5'></nav>
            <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            
            {/* 'a' tag in html is same as link. 'a' tag click reloads the page but react has a completely 
            //opposite purpose thus Link is used */}
                    
            {/* logo */}
            <Link to="/" className="flex items-center">
            <img
                src="../assets/images/SoulNect-Logo.png"
                className="mr-3 h-12"
                alt="Logo"
             />
             </Link>

            {/* Right elements of navbar */}
            {/* I want these to be on right of the navbar so set the order as 2 for the large screens */}
            <div className='lg:order-2 flex items-center'>
                <Link to="#moodlog" className='text-black hover:border-b hover:border-soft-pink px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>Mood Log</Link>
                <Link to="#meditation" className='text-black hover:border-b hover:border-soft-pink px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>Meditation</Link>
                <Link to="#My Journal" className='text-black hover:border-b hover:border-soft-pink px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>My Journal</Link>
                <Link to="#Resources" className='text-black hover:border-b hover:border-soft-pink px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>Resources</Link>
                <Link to="#Community" className='text-black hover:border-b hover:border-soft-pink px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>Community</Link>
                {/* <Link to="#moodlog" className='text-black hover:border-b hover:border-soft-pink px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>Mood Log</Link> */}
            </div>
            {/* right elements of navbar end */}


            </div>
        </header>
        </>
    );
}

export default Navbar;