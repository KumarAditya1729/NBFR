"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Target } from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import { createFocusArea, updateFocusArea, deleteFocusArea } from "@/lib/actions";
import { toast } from "@/components/admin/AdminToast";

type FocusArea = any; // We'll type this properly later

export default function FocusAreaClient({ initialData }: { initialData: FocusArea[] }) {
  const [areas, setAreas] = useState<FocusArea[]>(initialData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [iconName, setIconName] = useState("Target");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setIconName("Target");
    setDescription("");
    setCoverImage("");
    setEditingId(null);
  };

  const handleEdit = (area: FocusArea) => {
    setEditingId(area.id);
    setTitle(area.title || "");
    setSlug(area.slug || "");
    setIconName(area.iconName || "Target");
    setDescription(area.description || "");
    setCoverImage(area.coverImage || "");
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Focus Area?")) return;
    
    setIsLoading(true);
    const result = await deleteFocusArea(id);
    setIsLoading(false);

    if (result.success) {
      setAreas(areas.filter((a) => a.id !== id));
    } else {
      toast.error("Error deleting Focus Area: " + result.error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      title,
      slug,
      iconName,
      description,
      coverImage,
    };

    if (editingId) {
      const result = await updateFocusArea(editingId, data);
      if (result.success) {
        setAreas(areas.map((a) => (a.id === editingId ? result.data : a)));
        setIsDrawerOpen(false);
        resetForm();
      } else {
        toast.error("Error updating Focus Area"); toast.success("Focus Area updated!");
      }
    } else {
      const result = await createFocusArea(data);
      if (result.success) {
        setAreas([result.data, ...areas]);
        setIsDrawerOpen(false);
        resetForm();
      } else {
        toast.error("Error creating Focus Area"); toast.success("Focus Area created!");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Focus Areas</h2>
          <p className="mt-2 text-gray-600">Manage the primary research verticals and domains.</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsDrawerOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Focus Area
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Image</th>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Slug</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {areas.map((area) => (
                <tr key={area.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    {area.coverImage ? (
                      <img src={area.coverImage} alt={area.title} className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                        <Target className="w-6 h-6" />
                      </div>
                    )}
                  </td>
                  <td className="p-4 font-medium text-gray-900">{area.title}</td>
                  <td className="p-4 text-gray-500">{area.slug}</td>
                  <td className="p-4 text-gray-500 max-w-xs truncate">{area.description}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(area)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(area.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {areas.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No Focus Areas found. Create one to get started!
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
                {editingId ? "Edit Focus Area" : "New Focus Area"}
              </h3>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <form id="focus-area-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="e.g. Agrarian Transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="e.g. agrarian-transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    placeholder="Brief overview of this focus area..."
                  />
                </div>

                <ImageUpload 
                  label="Cover Image"
                  value={coverImage}
                  onChange={setCoverImage}
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
                form="focus-area-form"
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading && <Target className="w-4 h-4 animate-spin" />}
                {editingId ? "Save Changes" : "Create Focus Area"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
