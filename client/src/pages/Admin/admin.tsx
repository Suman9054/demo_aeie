import React, { useState, useEffect } from "react";
import { PlusCircle, Calendar, Users, Trash2, Edit, Eye } from "lucide-react";

interface Registration {
  id: string;
  name: string;
  email: string;
  registeredAt: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  maxParticipants: number;
  registrations: Registration[];
}

const AdminDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [showRegistrations, setShowRegistrations] = useState<Event | null>(
    null,
  );

  const [formData, setFormData] = useState<Omit<Event, "id" | "registrations">>(
    {
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      maxParticipants: 1,
    },
  );

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("events");
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const resetForm = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      location: "",
      description: "",
      maxParticipants: 1,
    });
    setEditingEvent(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEvent) {
      // Update existing event
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEvent.id ? { ...editingEvent, ...formData } : ev,
        ),
      );
    } else {
      // Create new event
      const newEvent: Event = {
        id: crypto.randomUUID(),
        ...formData,
        registrations: [],
      };
      setEvents((prev) => [...prev, newEvent]);
    }

    resetForm();
    setShowForm(false);
  };

  const handleCancelEvent = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this event?")) {
      setEvents((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      description: event.description,
      maxParticipants: event.maxParticipants,
    });
    setShowForm(true);
  };

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

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Calendar className="h-8 w-8 text-blue-600" />}
          label="Total Events"
          value={events.length}
        />
        <StatCard
          icon={<Users className="h-8 w-8 text-green-600" />}
          label="Total Registrations"
          value={events.reduce((sum, e) => sum + e.registrations.length, 0)}
        />
        <StatCard
          icon={<Calendar className="h-8 w-8 text-purple-600" />}
          label="Upcoming Events"
          value={events.filter((e) => new Date(e.date) > new Date()).length}
        />
      </div>

      {/* Events List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Events</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {events.length === 0 ? (
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
              events.map((event) => (
                <div key={event.id} className="px-6 py-4 flex justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {event.date} at {event.time} • {event.location}
                    </p>
                    <p className="text-sm text-gray-500">{event.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {event.registrations.length} / {event.maxParticipants}{" "}
                      registered
                    </p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <button
                      onClick={() => setShowRegistrations(event)}
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
                      onClick={() => handleCancelEvent(event.id)}
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
            <div className="grid grid-cols-2 gap-4">
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
                label="Time"
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
              />
            </div>
            <Input
              label="Location"
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
            />
            <Input
              label="Max Participants"
              type="number"
              min={1}
              value={formData.maxParticipants}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxParticipants: Number(e.target.value),
                })
              }
              required
            />
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

      {/* Registrations Modal */}
      {showRegistrations && (
        <Modal onClose={() => setShowRegistrations(null)}>
          <h3 className="text-lg font-medium mb-2">
            Registrations for {showRegistrations.title}
          </h3>
          {showRegistrations.registrations.length === 0 ? (
            <p className="text-gray-600">No registrations yet.</p>
          ) : (
            <div className="space-y-2">
              {showRegistrations.registrations.map((reg) => (
                <div
                  key={reg.id}
                  className="flex justify-between bg-gray-50 p-2 rounded-md"
                >
                  <div>
                    <p className="font-medium">{reg.name}</p>
                    <p className="text-sm text-gray-600">{reg.email}</p>
                  </div>
                  <p className="text-sm text-gray-500">{reg.registeredAt}</p>
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

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
}> = ({ icon, label, value }) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center">
    {icon}
    <div className="ml-4">
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

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
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  min?: number;
}> = ({ label, type, value, onChange, required, min }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      min={min}
      className="w-full px-3 py-2 border border-gray-300 rounded-md"
    />
  </div>
);

export default AdminDashboard;
