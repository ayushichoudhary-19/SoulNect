import React from "react";
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="mx-auto w-full max-w-7xl">
            <aside className="flex flex-col overflow-hidden text-black rounded-lg sm:mx-16 xl:mx-0 sm:py-16">
                {/* First div on the left */}
                <div className="hidden sm:block absolute pt-12 items-center justify-center">
    <img className="w-3/5 sm:w-2/5 md:w-2/3 lg:w-3/4 xl:w-3/5" src="src\assets\images\SoulNect-Logo.png" alt="image1" />
</div>

                <div className="relative max-w-screen-xl px-4 pb-20 pt-10 sm:py-10 ml-100 sm:px-6 lg:px-8 flex-col sm:flex-row">
                    <div className="max-w-xl space-y-8 text-center sm:text-right sm:ml-auto sm:w-1/2">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                        What is SoulNect?
                    </h1>
                        <p>Soulnect is a blend of <span className="text-soft-pink font-bold">soul </span> and <span className="text-soft-orange font-bold" >connect</span>, representing the idea of connecting with oneself and others on a deeper level for emotional well-being.
                            It is a soulful mental health web application that embraces the power of connection for holistic well-being. It focuses on fostering a deep connection with oneself, others, and the world to nurture the soul and promote emotional resilience. Through its features and resources, the app aims to guide users on a transformative journey of self-discovery, self-care, and meaningful connections.
                        </p>
                    </div>
                </div>
            </aside>
        </div>
    );
}
