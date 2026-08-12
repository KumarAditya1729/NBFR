"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, CalendarDays } from "lucide-react";
import { toast } from "@/components/admin/AdminToast";
import ImageUpload from "@/components/admin/ImageUpload";

type EventItem = any;

type Props = { initialData: EventItem[] };

const EVENT_TYPES = ["Conference", "Workshop", "Seminar", "Webinar", "Award", "Lecture", "Other"];

export default function EventClient({ initialData }: Props) {
  const [events, setEvents] = useState<EventItem[]>(initialData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState("Conference");
  const [imageUrl, setImageUrl] = useState("");

  const resetForm = () => {
    setTitle(""); setDate(""); setType("Conference"); setImageUrl("");
    setEditingId(null);
  };

  const handleEdit = (ev: EventItem) => {
    setEditingId(ev.id);
    setTitle(ev.title || "");
    setDate(ev.date || "");
    setType(ev.type || "Conference");
    setImageUrl(ev.imageUrl || "");
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event?")) return;
    setIsLoading(true);
    const res = await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    setIsLoading(false);
    if (res.ok) {
      setEvents(events.filter((e) => e.id !== id));
      toast.success("Event deleted.");
    } else {
      toast.error("Failed to delete event.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const body = { title, date, type, imageUrl };
    const url = editingId ? `/api/admin/events/${editingId}` : "/api/admin/events";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setIsLoading(false);

    if (res.ok) {
      const data = await res.json();
      if (editingId) {
        setEvents(events.map((e) => (e.id === editingId ? data : e)));
      } else {
        setEvents([data, ...events]);
      }
      setIsDrawerOpen(false);
      resetForm();
      toast.success(editingId ? "Event updated!" : "Event created!");
    } else {
      toast.error("Failed to save event.");
    }
  };

  const typeColors: Record<string, string> = {
    Conference: "bg-blue-100 text-blue-800",
    Workshop: "bg-green-100 text-green-800",
    Seminar: "bg-purple-100 text-purple-800",
    Webinar: "bg-cyan-100 text-cyan-800",
    Award: "bg-yellow-100 text-yellow-800",
    Lecture: "bg-orange-100 text-orange-800",
    Other: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Events</h2>
          <p className="mt-2 text-gray-600">Manage upcoming and past events.</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsDrawerOpen(true); }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((ev) => (
          <div key={ev.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden group hover:shadow-md transition-all">
            {ev.imageUrl ? (
              <img src={ev.imageUrl} alt={ev.title} className="w-full h-40 object-cover" />
            ) : (
              <div className="w-full h-40 bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center">
                <CalendarDays className="w-10 h-10 text-indigo-300" />
              </div>
            )}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-gray-900 line-clamp-2 flex-1">{ev.title}</h4>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <button onClick={() => handleEdit(ev)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(ev.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${typeColors[ev.type] || typeColors["Other"]}`}>
                  {ev.type}
                </span>
                <span className="text-sm text-gray-500">{ev.date}</span>
              </div>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="col-span-3 p-12 text-center text-gray-400">
            <CalendarDays className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No events yet. Add your first one!</p>
          </div>
        )}
      </div>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">{editingId ? "Edit Event" : "New Event"}</h3>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="event-form" onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input type="text" required value={date} onChange={(e) => setDate(e.target.value)}
                      placeholder="e.g. March 15, 2025"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <select required value={type} onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white">
                      {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
                <ImageUpload label="Event Image" value={imageUrl} onChange={setImageUrl} />
              </form>
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button type="button" onClick={() => setIsDrawerOpen(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors">
                Cancel
              </button>
              <button type="submit" form="event-form" disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-70">
                {isLoading ? "Saving..." : editingId ? "Save Changes" : "Create Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
