import React, {useState, useEffect} from "react";
import FeatureCard from "./FeatureCard";
import { NavLink, Router } from "react-router-dom";


const featuresData = [
    {
      icon: "assets/images/Home/moodlog.png",
      link: "moodlog",
      title: "Mood Log",
      description: "Log your moods and track them over time with an interactive graph on the dashboard, gaining insights into your emotional well-being.",
    },
    {
      icon: "assets/images/Home/journal.png",
      link: "myjournal",
      title: "Journal",
      description: "Express yourself freely in a personal journal, with the ability to revisit and reflect on your thoughts and experiences over time.",
    },
    {
      icon: "assets/images/Home/meditate.png",
      link: "meditation",
      title: "Meditation",
      description: "Explore guided meditations to nurture your mind and soul, promoting mindfulness and relaxation for a balanced and centered lifestyle.",
    },
    {
      icon: "assets/images/Home/resources.png",
      title: "Resources",
      description: "Access a wealth of mental health resources, including free videos and blogs, designed to support your well-being and personal growth.",
    },
    {
      icon: "assets/images/Home/community.png",
      title: "Community",
      description: "Engage in meaningful discussions with a supportive community, fostering connections and sharing experiences for a shared journey toward emotional resilience.",
    },
  ];
  
export default function Home() {
  const [navigateToSignIn, setNavigateToSignIn] = useState(true);

useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setNavigateToSignIn(false);
    }
    else {
      setNavigateToSignIn(true);
    }
}, []);
    return (
        <>
        <div className="mx-auto w-full max-w-7xl">
            <aside className="flex flex-col overflow-hidden text-black rounded-lg sm:mx-16 xl:mx-0 sm:py-16">
                <div className="hidden sm:block absolute pt-12 items-center justify-center">
    <img className="w-3/5 sm:w-2/5 md:w-2/3 lg:w-3/4 xl:w-3/5" src="assets/images/SoulNect-Logo.png" alt="image1" loading="lazy"/>
</div>
                <div className="relative max-w-screen-xl px-4 pb-20 pt-10 sm:py-10 ml-100 sm:px-6 lg:px-8 flex-col sm:flex-row">
                    <div className="max-w-xl space-y-8 text-center sm:text-right sm:ml-auto sm:w-1/2">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
                        What is SoulNect?
                    </h1>
                    <img className="justify-center lg:hidden md:hidden sm:flex w-3/5 sm:w-2/5 md:w-2/3 lg:w-3/4 xl:w-3/5" src="src\assets\images\SoulNect-Logo.png" alt="image1" />
                        <p>Soulnect is a blend of <span className="text-soft-pink font-bold">soul </span> and <span className="text-soft-orange font-bold" >connect</span>, representing the idea of connecting with oneself and others on a deeper level for emotional well-being.
                            It is a soulful mental health web application that embraces the power of connection for holistic well-being. It focuses on fostering a deep connection with oneself, others, and the world to nurture the soul and promote emotional resilience. Through its features and resources, the app aims to guide users on a transformative journey of self-discovery, self-care, and meaningful connections.
                        </p>
                    </div>
                </div>
            </aside>
        </div>
        <div className="w-full flex items-center justify-center">
          <NavLink className="p-4 flex items-center justify-center gap-2 bg-soft-orange rounded hover:bg-soft-pink duration-75" to={ navigateToSignIn? "/signin" : "/moodlog"}>Let's Begin Healing 
          <img src="assets/images/Home/chevron.png" className="size-5"/></NavLink>
        </div>
        <div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-center my-12">
                        Features
                    </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-10 px-10 mx-10 ms:mx-3 ">
        {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              link={feature.link}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
            ))}
        </div>
        </div>
        </> 
    );
}
