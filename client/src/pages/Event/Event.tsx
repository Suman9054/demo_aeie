import React from "react";
import { Slideshow } from "../../components/Slide/Slide";

interface EventItem {
  id: number;
  category: string;
  title: string;
  description: string;
  organizer: string;
  date: string;
  image: string;
}

const events: EventItem[] = [
  {
    id: 1,
    category: "Standup Comedy",
    title: "Kedatangan Makhluk Bekasi, Aww & Pican di Sidang",
    description:
      "To provide flexible, inspiring workspaces that foster creativity, collaboration, and professional growth.",
    organizer: "Podcast Seminggu",
    date: "Wed, 18 September 2024 at 7–9PM",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_FWF2judaujT30K9sMf-tZFhMWpgP6xCemw&s",
  },
  {
    id: 2,
    category: "Standup Comedy",
    title: "Kedatangan Makhluk Bekasi, Aww & Pican di Sidang",
    description:
      "To provide flexible, inspiring workspaces that foster creativity, collaboration, and professional growth.",
    organizer: "Podcast Seminggu",
    date: "Wed, 18 September 2024 at 7–9PM",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyG4zwWqbxI8Djn5Gii2jS_v8HR9qQz0jJjg&s",
  },
  {
    id: 3,
    category: "Standup Comedy",
    title: "Kedatangan Makhluk Bekasi, Aww & Pican di Sidang",
    description:
      "To provide flexible, inspiring workspaces that foster creativity, collaboration, and professional growth.",
    organizer: "Podcast Seminggu",
    date: "Wed, 18 September 2024 at 7–9PM",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv5R_TCbEHyx_z3r72Dh5TGXMWp33gz5uE-A&s",
  },
];

const slideevents = [
  {
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop",
    alt: "IoT Mania 2024",
    id: 0,
    about: "IoT Mania is organised by ISO & ISA - Join us for cutting-edge IoT innovations",
  },
  {
    src: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=1920&h=1080&fit=crop",
    alt: "IdeaLab Workshop",
    id: 1,
    about: "IdeaLab - Innovation Workshop where creativity meets technology",
  },
  {
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1920&h=1080&fit=crop",
    alt: "Hash Conference",
    id: 2,
    about: "Hash Conference 2024 - Blockchain and cryptocurrency summit",
  },
];

const EventsPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black">
     
      <div className="pt-8">
        <Slideshow images={slideevents} />
      </div>

     
      <div className="w-full flex flex-col py-12 items-center">
        
        <div className="flex justify-center space-x-4 mb-12">
          <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            All Events
          </button>
          <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105">
            Nearest Events
          </button>
          <button className="px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-300 hover:scale-105">
            Latest Event
          </button>
        </div>

       
        <div className="max-w-6xl mx-auto space-y-8 px-4 w-full">
          {events.map((event) => (
            <div
              key={event.id}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
             
            >
             
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative flex">
                <div className="relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
                </div>
                
                <div className="flex-1 p-8 flex flex-col justify-between relative z-10">
                  <div>
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 backdrop-blur-sm border border-teal-400/30 text-teal-300 rounded-full text-xs font-medium mb-4">
                      {event.category}
                    </span>
                    <h3 className="font-bold text-2xl mb-4 text-white group-hover:text-teal-300 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {event.description}
                    </p>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p className="flex items-center">
                        <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                        <strong className="text-white mr-2">Penyelenggara:</strong> 
                        {event.organizer}
                      </p>
                      <p className="flex items-center">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                        <strong className="text-white mr-2">Tanggal pelaksanaan:</strong> 
                        {event.date}
                      </p>
                    </div>
                  </div>
                  
                 
                  <div className="mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <button className="px-6 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;