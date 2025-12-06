import { useQuery } from "@tanstack/react-query";
import * as React from "react";
import type { Event } from "../userpage/user";
import { useParams } from "@tanstack/react-router";
import { api_client } from "../../utils/axiosclient/axios";

const Event_: React.FunctionComponent = () => {
  const { id } = useParams({ from: "/events/$id" });

  const getAllEvents = async (): Promise<Event[]> => {
    const res = await api_client.get<Event[]>("/api/v1/event/allevents");
    return res.data;
  };

  const allEventsQuery = useQuery({
    queryKey: ["allevents"],
    queryFn: getAllEvents,
  });

  const event = allEventsQuery.data?.find((e) => e._id === id);

  return (
    <div className="min-h-screen  p-6 pt-20">
      <div className="max-w-3xl mx-auto  rounded-lg shadow-md overflow-hidden">
        {event?.poster_url && (
          <img
            src={event.poster_url}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-amber-200">
            {event?.title}
          </h1>
          <p className="text-blue-200 mb-2">
            <span className="font-semibold">Date:</span>{" "}
            {event?.date && new Date(event?.date).toLocaleDateString()}
          </p>
          <p className="text-blue-200 mb-4">
            <span className="font-semibold">Last Date:</span>{" "}
            {event?.lastdate && new Date(event?.lastdate).toLocaleDateString()}
          </p>

          <p className="text-white">{event?.description}</p>
        </div>
      </div>
      {event?.event_type !== "event" && (
        <div className="max-w-3xl mx-auto mt-6 p-4  rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-amber-200">
            Register for {event?.event_type}
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-gray-700">Roll Number</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your roll number"
              />
            </div>
            <div>
              <label className="block text-gray-700">Department</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your department"
              />
            </div>
            <div>
              <label className="block text-gray-700">Year</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Enter your year"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Event_;
