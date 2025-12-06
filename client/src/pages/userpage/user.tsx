import React, { useState } from "react";
import { Calendar, LogOut, AlertCircle, CheckCircle, X } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api_client } from "../../utils/axiosclient/axios";
import { useNavigate } from "@tanstack/react-router";

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: Date;
  lastdate: Date;
  poster_url?: string;
  event_type: string;
  vedio_url?: string;
}

interface Notification {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

export default function UserPage(): React.JSX.Element {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState<string | null>(
    null,
  );
  const [cancelevent_id, setcancelevent_id] = useState<string | null>(null);
  const quaryclient = useQueryClient();

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

  const naqvigation = useNavigate();

  const handleLogout = async () => {
    const ok = await api_client.delete("/api/logout");
    if (ok.status === 200) {
      addNotification("Logged out successfully", "success");
      naqvigation({ to: "/" });
    } else {
      addNotification("Logout failed", "error");
    }
  };

  const getuserevents = async (): Promise<Event[]> => {
    const res = await api_client.get<Event[]>(
      "/api/v1/registration/find/registration",
    );

    return res.data;
  };

  const quary = useQuery<Event[]>({
    queryKey: ["userevents"],
    queryFn: getuserevents,
  });

  const handelcancle = async (event_id: string) => {
    await api_client.delete("/cancel/registration", {
      params: {
        event_id,
      },
    });
  };

  const mutation = useMutation({
    mutationFn: handelcancle,
    onSuccess: () => {
      quaryclient.invalidateQueries({ queryKey: ["userevents"] });
    },
  });

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
  function formatDate(dateString: string | Date): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

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
                onClick={() => {
                  if (cancelevent_id) {
                    mutation.mutate(cancelevent_id);
                  } else {
                    setShowConfirmDialog(null);
                  }
                }}
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
          {quary.data && quary.data.length > 0 ? (
            <div className="space-y-4">
              {quary.data.map((event) => (
                <div
                  key={event._id}
                  className={`p-6 border rounded-xl hover:shadow-md transition-all duration-200 ${
                    new Date(event.date).getTime() < Date.now()
                      ? "opacity-75"
                      : ""
                  } dark:border-gray-700`}
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                          {event.title}
                        </h3>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full border ${getCategoryColor(
                            event.event_type,
                          )}`}
                        >
                          {event.event_type}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} />
                          <span>{formatDate(event.date)}</span>
                        </div>
                      </div>
                    </div>

                    {new Date(event.date).getTime() > Date.now() && (
                      <button
                        onClick={() => {
                          setShowConfirmDialog(event._id);
                          setcancelevent_id(event._id);
                        }}
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
