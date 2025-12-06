import React, { useState } from "react";
import { PlusCircle, Calendar, Trash2, Edit, Eye } from "lucide-react";
import type { Event } from "../userpage/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { api_client } from "../../utils/axiosclient/axios";

export interface User {
  username: string;
  password: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
}

interface Registration {
  id: string;
  user: User;
  event: Event;
  phonnumber: string;
  roolnumber: string;
  department: string;
  year: string;
  registrationDate: Date;
  status: "registered" | "cancelled";
}

interface event_schema {
  title: string;
  description: string;
  date: string;
  lastdate: string;
  fease?: number;
  poster_?: File | null;
  event_type: string;
  scaner_?: File | null;
}

const AdminDashboard: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<string | null>(null);
  const [showRegistrations, setShowRegistrations] = useState<string | null>(
    null,
  );

  const [formData, setFormData] = useState<event_schema>({
    title: "",
    description: "",
    date: "",
    lastdate: "",
    poster_: null,
    event_type: "",
    scaner_: null,
  });
  const quaryclient = useQueryClient();
  const getallevents = async (): Promise<Event[]> => {
    const res = await api_client.get<Event[]>("/api/v1/event/allevents");

    return res.data;
  };
  const alleventquary = useQuery<Event[]>({
    queryKey: ["allevents"],
    queryFn: getallevents,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      date: "",
      lastdate: "",
      poster_: null,
      event_type: "",
      scaner_: null,
      fease: undefined,
    });
    setEditingEvent(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(editingEvent);
    try {
      if (editingEvent) {
        console.log("editing" + editingEvent);
        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("description", formData.description);
        payload.append("date", formData.date);
        payload.append("lastdate", formData.lastdate);
        payload.append("event_type", formData.event_type);
        payload.append("fees", String(formData.fease));

        if (formData.poster_) payload.append("poster_", formData.poster_);
        if (formData.scaner_) payload.append("scaner_", formData.scaner_);

        await api_client.put("/api/v1/event/update/event", payload, {
          params: { id: editingEvent },
          headers: { "Content-Type": "multipart/form-data" },
        });
        setEditingEvent(null);
        resetForm();
        setShowForm(false);
      } else {
        const payload = new FormData();
        payload.append("title", formData.title);
        payload.append("description", formData.description);
        payload.append("date", formData.date);
        payload.append("lastdate", formData.lastdate);
        payload.append("event_type", formData.event_type);

        if (formData.poster_) payload.append("poster_", formData.poster_);
        if (formData.scaner_) payload.append("scaner_", formData.scaner_);

        await api_client.post("/api/v1/event/create/new/event", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      quaryclient.invalidateQueries({ queryKey: ["allevents"] });
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting event:", error);
      resetForm();
    }
  };

  const handleCancelEvent = async (id: string) => {
    if (window.confirm("Are you sure you want to cancel this event?")) {
      await api_client.delete("/api/v1/event/deleteevent", { params: { id } });
      quaryclient.invalidateQueries({ queryKey: ["allevents"] });
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event._id);
    setFormData({
      title: event.title,
      description: event.description,
      date: new Date(event.date).toISOString().split("T")[0],
      lastdate: new Date(event.lastdate).toISOString().split("T")[0],
      poster_: null,
      event_type: event.event_type,
      scaner_: null,
    });
    setShowForm(true);
  };

  const registrationsData = useQuery<Registration[]>({
    queryKey: ["registrations"],
    queryFn: async () => {
      const res = await api_client.get("/api/v1//all/registration", {
        params: { id: showRegistrations },
      });
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 p-20">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600">Manage events and registrations</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowForm(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <PlusCircle size={20} />
              Create Event
            </button>
          </div>
        </div>
      </div>
      {/* Events List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Events</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {alleventquary.data && alleventquary.data.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No events
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Get started by creating a new event.
                </p>
              </div>
            ) : (
              alleventquary.data &&
              alleventquary.data.map((event) => (
                <div key={event._id} className="px-6 py-4 flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">{event.description}</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <button
                      onClick={() => setShowRegistrations(event._id)}
                      className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded text-sm flex items-center gap-1"
                    >
                      <Eye size={16} /> View
                    </button>
                    <button
                      onClick={() => handleEditEvent(event)}
                      className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 px-3 py-1 rounded text-sm flex items-center gap-1"
                    >
                      <Edit size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleCancelEvent(event._id)}
                      className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-sm flex items-center gap-1"
                    >
                      <Trash2 size={16} /> Cancel
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Event Form Modal */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-medium">
              {editingEvent ? "Edit Event" : "Create Event"}
            </h3>
            <Input
              label="Title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
            <label className="block text-sm font-medium mb-1">Event Type</label>
            <select
              value={formData.event_type}
              onChange={(e) =>
                setFormData({ ...formData, event_type: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Select type</option>
              <option value="event">Event</option>
              <option value="competition">Competition</option>
              <option value="workshop">Workshop</option>
            </select>
            <div className="flex  gap-4">
              <Input
                label="Date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
              <Input
                label="Last Date"
                type="date"
                value={formData.lastdate}
                onChange={(e) =>
                  setFormData({ ...formData, lastdate: e.target.value })
                }
                required
              />
              <Input
                label="Fees"
                type="number"
                value={formData.fease}
                onChange={(e) =>
                  setFormData({ ...formData, event_type: e.target.value })
                }
                required
              />
            </div>
            <div className="flex gap-4">
              {/* Poster upload */}
              <Input
                label="Poster"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    poster_: e.target.files?.[0] || null,
                  })
                }
              />

              {/* Video upload */}
              <Input
                label="scaner"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    scaner_: e.target.files?.[0] || null,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                {editingEvent ? "Save Changes" : "Create"}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showRegistrations && (
        <Modal onClose={() => setShowRegistrations(null)}>
          <h3 className="text-lg font-medium mb-2">
            Registrations for {registrationsData.data?.[0]?.event.title}
          </h3>
          {registrationsData.data?.length === 0 ? (
            <p className="text-gray-600">No registrations yet.</p>
          ) : (
            <div className="space-y-2">
              {registrationsData.data?.map((reg) => (
                <div
                  key={reg.id}
                  className="flex justify-between bg-gray-50 p-2 rounded-md"
                >
                  <div>
                    <p className="font-medium">{reg.user.username}</p>

                    <p className="text-sm text-gray-600">{reg.user.email}</p>
                    <p className="text-sm text-gray-600">{reg.phonnumber}</p>
                    <p className="text-sm text-gray-600">{reg.roolnumber}</p>
                    <p className="text-sm text-gray-600">{reg.department}</p>
                    <p className="text-sm text-gray-600">{reg.year}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {reg.registrationDate.toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

/* ----------------- Reusable Components ----------------- */

const Modal: React.FC<{ children: React.ReactNode; onClose: () => void }> = ({
  children,
  onClose,
}) => (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6">
      {children}
      <div className="pt-4">
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  </div>
);

const Input: React.FC<{
  label: string;
  type: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
  accept?: string;
}> = ({ label, type, value, onChange, required, min, accept }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      accept={accept}
      onChange={onChange}
      required={required}
      min={min}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>
);

export default AdminDashboard;
