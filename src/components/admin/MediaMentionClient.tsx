"use client";


import { useState } from "react";
import { Plus, Edit2, Trash2, X, Newspaper, ExternalLink } from "lucide-react";
import { toast } from "@/components/admin/AdminToast";
import { createMediaMention, updateMediaMention, deleteMediaMention } from "@/lib/actions";

type MediaMention = any;

export default function MediaMentionClient({ initialData }: { initialData: MediaMention[] }) {
  const [mentions, setMentions] = useState<MediaMention[]>(initialData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [headline, setHeadline] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [url, setUrl] = useState("");

  const resetForm = () => {
    setHeadline("");
    setSource("");
    setDate("");
    setUrl("");
    setEditingId(null);
  };

  const handleEdit = (mention: MediaMention) => {
    setEditingId(mention.id);
    setHeadline(mention.headline || "");
    setSource(mention.source || "");
    setDate(mention.date || "");
    setUrl(mention.url || "");
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Media Mention?")) return;
    
    setIsLoading(true);
    const result = await deleteMediaMention(id);
    setIsLoading(false);

    if (result.success) {
      setMentions(mentions.filter((m) => m.id !== id));
    } else {
      toast.error("Error deleting Mention: : " + (result.error || ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      headline,
      source,
      date,
      url,
    };

    if (editingId) {
      const result = await updateMediaMention(editingId, data);
      if (result.success) {
        setMentions(mentions.map((m) => (m.id === editingId ? result.data : m)));
        setIsDrawerOpen(false);
        resetForm();
      } else {
        toast.error("Error updating Mention: : " + (result.error || ""));
      }
    } else {
      const result = await createMediaMention(data);
      if (result.success) {
        setMentions([result.data, ...mentions]);
        setIsDrawerOpen(false);
        resetForm();
      } else {
        toast.error("Error creating Mention: : " + (result.error || ""));
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Media Mentions</h2>
          <p className="mt-2 text-gray-600">Manage press coverage and external articles.</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsDrawerOpen(true);
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Mention
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Source & Date</th>
                <th className="p-4 font-semibold">Headline</th>
                <th className="p-4 font-semibold">URL</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mentions.map((mention) => (
                <tr key={mention.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-1 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-full mb-1">
                      {mention.source}
                    </span>
                    <div className="text-sm text-gray-500">{mention.date}</div>
                  </td>
                  <td className="p-4 font-medium text-gray-900">{mention.headline}</td>
                  <td className="p-4">
                    <a 
                      href={mention.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 text-sm font-medium"
                    >
                      View Link <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(mention)}
                        className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(mention.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {mentions.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No Media Mentions found.
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
                {editingId ? "Edit Media Mention" : "New Media Mention"}
              </h3>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <form id="media-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Headline *</label>
                  <textarea
                    required
                    rows={3}
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Source *</label>
                    <input
                      type="text"
                      required
                      value={source}
                      onChange={(e) => setSource(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="e.g. The Hindu"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="text"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder="e.g. Oct 12, 2025"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">URL *</label>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="https://..."
                  />
                </div>
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
                form="media-form"
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-emerald-600 text-white font-medium rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading && <Newspaper className="w-4 h-4 animate-spin" />}
                {editingId ? "Save Changes" : "Create Mention"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
