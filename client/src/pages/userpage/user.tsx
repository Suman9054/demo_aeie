import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  LogOut,
  AlertCircle,
  CheckCircle,
  X,
} from "lucide-react";

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: "conference" | "workshop" | "hackathon" | "meetup";
  status: "upcoming" | "ongoing" | "past";
}

interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

export default function UserPage(): React.JSX.Element {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      name: "Tech Conference 2025",
      date: "2025-09-10",
      time: "09:00 AM",
      location: "Convention Center, NYC",
      attendees: 1250,
      category: "conference",
      status: "upcoming",
    },
    {
      id: 2,
      name: "AI Workshop: Machine Learning Fundamentals",
      date: "2025-09-15",
      time: "02:00 PM",
      location: "Tech Hub, San Francisco",
      attendees: 85,
      category: "workshop",
      status: "upcoming",
    },
    {
      id: 3,
      name: "Global Hackathon",
      date: "2025-09-20",
      time: "10:00 AM",
      location: "Innovation Campus, Austin",
      attendees: 300,
      category: "hackathon",
      status: "upcoming",
    },
    {
      id: 4,
      name: "React Developers Meetup",
      date: "2025-08-25",
      time: "06:00 PM",
      location: "Co-working Space, Seattle",
      attendees: 45,
      category: "meetup",
      status: "past",
    },
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState<number | null>(
    null,
  );

  const addNotification = (
    message: string,
    type: "success" | "error" | "info",
  ) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 4000);
  };

  const cancelEvent = (id: number) => {
    const event = events.find((e) => e.id === id);
    setEvents(events.filter((event) => event.id !== id));
    addNotification(`Successfully cancelled "${event?.name}"`, "success");
    setShowConfirmDialog(null);
  };

  const handleLogout = () => {
    addNotification("Logged out successfully!", "info");
    setTimeout(() => {
      alert("Redirecting to login page...");
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      conference:
        "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700",
      workshop:
        "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700",
      hackathon:
        "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:border-purple-700",
      meetup:
        "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-300 dark:border-orange-700",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
    );
  };

  const getStatusColor = (status: string) => {
    const colors = {
      upcoming: "text-green-500",
      ongoing: "text-blue-400",
      past: "text-gray-400",
    };
    return colors[status as keyof typeof colors] || "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 dark:text-gray-100 pt-20">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-in slide-in-from-right duration-300 ${
              notification.type === "success"
                ? "bg-green-500 text-white"
                : notification.type === "error"
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
            }`}
          >
            {notification.type === "success" && <CheckCircle size={16} />}
            {notification.type === "error" && <AlertCircle size={16} />}
            {notification.type === "info" && <AlertCircle size={16} />}
            <span className="text-sm">{notification.message}</span>
          </div>
        ))}
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md mx-4 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="text-red-500" size={24} />
              <h3 className="text-lg font-semibold">Confirm Cancellation</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to cancel this event? This action cannot be
              undone.
            </p>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setShowConfirmDialog(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
              >
                Keep Event
              </button>
              <button
                onClick={() => cancelEvent(showConfirmDialog)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Cancel Event
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center py-8 px-4">
        {/* Header */}
        <div className="w-full max-w-4xl flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              My Events Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your registered events and stay updated
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-md transition-colors duration-200"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        {/* Events List */}
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          {events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event) => (
                <div
                  key={event.id}
                  className={`p-6 border rounded-xl hover:shadow-md transition-all duration-200 ${
                    event.status === "past" ? "opacity-75" : ""
                  } dark:border-gray-700`}
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                          {event.name}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(
                            event.category,
                          )}`}
                        >
                          {event.category}
                        </span>
                        <span
                          className={`text-sm font-medium ${getStatusColor(
                            event.status,
                          )}`}
                        >
                          {event.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} />
                          <span>
                            {formatDate(event.date)} at {event.time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users size={16} />
                          <span>{event.attendees} attendees</span>
                        </div>
                      </div>
                    </div>

                    {event.status === "upcoming" && (
                      <button
                        onClick={() => setShowConfirmDialog(event.id)}
                        className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                      >
                        <X size={16} />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar className="mx-auto text-gray-300 mb-4" size={64} />
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                You have no registered events
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Register for events to see them here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
