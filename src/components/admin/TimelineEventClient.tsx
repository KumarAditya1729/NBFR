"use client";


import { useState } from "react";
import { Plus, Edit2, Trash2, X, Clock } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from "@/components/admin/AdminToast";
import { createTimelineEvent, updateTimelineEvent, deleteTimelineEvent } from "@/lib/actions";

type TimelineEvent = any;

export default function TimelineEventClient({ initialData }: { initialData: TimelineEvent[] }) {
  const [events, setEvents] = useState<TimelineEvent[]>(initialData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [year, setYear] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Modern");
  const [imageUrl, setImageUrl] = useState("");

  const resetForm = () => {
    setYear("");
    setTitle("");
    setDescription("");
    setCategory("Modern");
    setImageUrl("");
    setEditingId(null);
  };

  const handleEdit = (event: TimelineEvent) => {
    setEditingId(event.id);
    setYear(event.year || "");
    setTitle(event.title || "");
    setDescription(event.description || "");
    setCategory(event.category || "Modern");
    setImageUrl(event.imageUrl || "");
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Event?")) return;
    
    setIsLoading(true);
    const result = await deleteTimelineEvent(id);
    setIsLoading(false);

    if (result.success) {
      setEvents(events.filter((e) => e.id !== id));
    } else {
      toast.error("Error deleting Event: : " + (result.error || ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      year,
      title,
      description,
      category,
      imageUrl,
    };

    if (editingId) {
      const result = await updateTimelineEvent(editingId, data);
      if (result.success) {
        setEvents(events.map((ev) => (ev.id === editingId ? result.data : ev)));
        setIsDrawerOpen(false);
        resetForm();
      } else {
        toast.error("Error updating Event: : " + (result.error || ""));
      }
    } else {
      const result = await createTimelineEvent(data);
      if (result.success) {
        setEvents([result.data, ...events].sort((a, b) => a.year.localeCompare(b.year)));
        setIsDrawerOpen(false);
        resetForm();
      } else {
        toast.error("Error creating Event: : " + (result.error || ""));
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Timeline Events</h2>
          <p className="mt-2 text-gray-600">Manage the historical timeline of Bihar.</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsDrawerOpen(true);
          }}
          className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Image</th>
                <th className="p-4 font-semibold">Year & Era</th>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt={event.title} className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                        <Clock className="w-5 h-5" />
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <span className="font-bold text-gray-900 block">{event.year}</span>
                    <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800 rounded mt-1">
                      {event.category}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-gray-900">{event.title}</td>
                  <td className="p-4 text-gray-500 max-w-xs truncate">{event.description}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(event)}
                        className="p-2 text-gray-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No Timeline Events found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-out Drawer */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-gray-900">
                {editingId ? "Edit Timeline Event" : "New Timeline Event"}
              </h3>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <form id="timeline-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Year *</label>
                    <input
                      type="text"
                      required
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="e.g. 1947"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Era (Category) *</label>
                    <select
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                    >
                      <option value="Ancient">Ancient</option>
                      <option value="Medieval">Medieval</option>
                      <option value="Modern">Modern</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                    placeholder="e.g. Independence"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                    placeholder="Event description..."
                  />
                </div>

                <ImageUpload 
                  label="Event Image (Optional)"
                  value={imageUrl}
                  onChange={setImageUrl}
                />
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button
                type="button"
                onClick={() => setIsDrawerOpen(false)}
                className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="timeline-form"
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-amber-600 text-white font-medium rounded-xl hover:bg-amber-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading && <Clock className="w-4 h-4 animate-spin" />}
                {editingId ? "Save Changes" : "Create Event"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
