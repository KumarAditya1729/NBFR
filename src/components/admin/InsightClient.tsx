"use client";


import { useState } from "react";
import { Plus, Edit2, Trash2, X, Lightbulb } from "lucide-react";
import { createInsight, updateInsight, deleteInsight } from "@/lib/actions";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from "@/components/admin/AdminToast";

type Insight = any;

export default function InsightClient({ initialData }: { initialData: Insight[] }) {
  const [insights, setInsights] = useState<Insight[]>(initialData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [link, setLink] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const resetForm = () => {
    setTitle("");
    setType("");
    setAuthor("");
    setDate("");
    setLink("");
    setImageUrl("");
    setEditingId(null);
  };

  const handleEdit = (insight: Insight) => {
    setEditingId(insight.id);
    setTitle(insight.title || "");
    setType(insight.type || "");
    setAuthor(insight.author || "");
    setDate(insight.date || "");
    setLink(insight.link || "");
    setImageUrl(insight.imageUrl || "");
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Insight?")) return;
    
    setIsLoading(true);
    const result = await deleteInsight(id);
    setIsLoading(false);

    if (result.success) {
      setInsights(insights.filter((i) => i.id !== id));
    } else {
      toast.error("Error deleting Insight: : " + (result.error || ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      title,
      type,
      author,
      date,
      link,
      imageUrl,
    };

    if (editingId) {
      const result = await updateInsight(editingId, data);
      if (result.success) {
        setInsights(insights.map((i) => (i.id === editingId ? result.data : i)));
        setIsDrawerOpen(false);
        resetForm();
      } else {
        toast.error("Error updating Insight: : " + (result.error || ""));
      }
    } else {
      const result = await createInsight(data);
      if (result.success) {
        setInsights([result.data, ...insights]);
        setIsDrawerOpen(false);
        resetForm();
      } else {
        toast.error("Error creating Insight: : " + (result.error || ""));
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Insights & Updates</h2>
          <p className="mt-2 text-gray-600">Manage published articles, reports, and insights.</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsDrawerOpen(true);
          }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Publish Insight
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Image</th>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Details</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {insights.map((insight) => (
                <tr key={insight.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    {insight.imageUrl ? (
                      <img src={insight.imageUrl} alt={insight.title} className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                        <Lightbulb className="w-5 h-5" />
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-gray-900 max-w-sm truncate">{insight.title}</td>
                  <td className="p-4">
                    <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-purple-100 text-purple-800 rounded mb-1">
                      {insight.type}
                    </span>
                    <div className="text-sm text-gray-500">By {insight.author} • {insight.date}</div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(insight)}
                        className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(insight.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {insights.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No Insights found.
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
                {editingId ? "Edit Insight" : "New Insight"}
              </h3>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <form id="insight-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <textarea
                    required
                    rows={2}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <input
                      type="text"
                      required
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="e.g. Article, Report"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author *</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="e.g. NBRF Team"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="text"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                      placeholder="e.g. Oct 12, 2025"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                    placeholder="https://..."
                  />
                </div>

                <ImageUpload 
                  label="Featured Image (Optional)"
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
                form="insight-form"
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-purple-600 text-white font-medium rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading && <Lightbulb className="w-4 h-4 animate-spin" />}
                {editingId ? "Save Changes" : "Publish Insight"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
