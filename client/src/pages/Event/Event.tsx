import React from "react";

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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_FWF2judaujT30K9sMf-tZFhMWpgP6xCemw&s",
  },
  {
    id: 2,
    category: "Standup Comedy",
    title: "Kedatangan Makhluk Bekasi, Aww & Pican di Sidang",
    description:
      "To provide flexible, inspiring workspaces that foster creativity, collaboration, and professional growth.",
    organizer: "Podcast Seminggu",
    date: "Wed, 18 September 2024 at 7–9PM",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyG4zwWqbxI8Djn5Gii2jS_v8HR9qQz0jJjg&s",
  },
  {
    id: 3,
    category: "Standup Comedy",
    title: "Kedatangan Makhluk Bekasi, Aww & Pican di Sidang",
    description:
      "To provide flexible, inspiring workspaces that foster creativity, collaboration, and professional growth.",
    organizer: "Podcast Seminggu",
    date: "Wed, 18 September 2024 at 7–9PM",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv5R_TCbEHyx_z3r72Dh5TGXMWp33gz5uE-A&s",
  },
];

const EventsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400/10 via-black-100/10 to-gray-200/10 text-gray-900">
      

      {/* Hero Section */}
      <section className="text-center py-14">
        <h2 className="text-4xl font-bold leading-tight">
          Grow Your Skills and 
          <br /> with Our Events
        </h2>
      </section>

      {/* Filters */}
      <div className="flex justify-center pr-80 space-x-4 mb-8">
        <button className="px-4 py-2 bg-teal-500 text-gray-300 rounded-full text-sm">
          All Events
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-200">
          Nearest Events
        </button>
        <button className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-200">
          Latest Event
        </button>
      </div>

      {/* Event List */}
      <div className="max-w-5xl mx-auto space-y-4 px-4 flex flex-col justify-center pl-25">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition h-40 w-200"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-60 h-full object-cover"
            />
            <div className="flex-1 p-4 flex flex-col justify-between">
              <div>
                <span className="inline-block px-3 py-1 bg-gray-200 rounded-full text-xs mb-2">
                  {event.category}
                </span>
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                <div className="mt-3 text-sm text-gray-500">
                  <p>
                    <strong>Penyelenggara:</strong> {event.organizer}
                  </p>
                  <p>
                    <strong>Tanggal pelaksanaan:</strong> {event.date}
                  </p>
                </div>
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;