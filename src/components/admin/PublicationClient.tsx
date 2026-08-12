"use client";


import { useState } from "react";
import { Plus, Edit2, Trash2, X, BookOpen, ExternalLink } from "lucide-react";
import { createPublication, updatePublication, deletePublication } from "@/lib/actions";
import ImageUpload from "@/components/admin/ImageUpload";
import { toast } from "@/components/admin/AdminToast";

type Publication = any;

export default function PublicationClient({ initialData }: { initialData: Publication[] }) {
  const [publications, setPublications] = useState<Publication[]>(initialData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [abstract, setAbstract] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [publicationType, setPublicationType] = useState("Research Paper");
  const [coverImage, setCoverImage] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setAbstract("");
    setPublishDate("");
    setPublicationType("Research Paper");
    setCoverImage("");
    setPdfUrl("");
    setEditingId(null);
  };

  const handleEdit = (pub: Publication) => {
    setEditingId(pub.id);
    setTitle(pub.title || "");
    setSlug(pub.slug || "");
    setAbstract(pub.abstract || "");
    setPublishDate(pub.publishDate || "");
    setPublicationType(pub.publicationType || "Research Paper");
    setCoverImage(pub.coverImage || "");
    setPdfUrl(pub.pdfUrl || "");
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Publication?")) return;
    
    setIsLoading(true);
    const result = await deletePublication(id);
    setIsLoading(false);

    if (result.success) {
      setPublications(publications.filter((p) => p.id !== id));
    } else {
      toast.error("Error deleting Publication: : " + (result.error || ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      title,
      slug,
      abstract,
      publishDate,
      publicationType,
      coverImage,
      pdfUrl,
    };

    if (editingId) {
      const result = await updatePublication(editingId, data);
      if (result.success) {
        setPublications(publications.map((p) => (p.id === editingId ? result.data : p)));
        setIsDrawerOpen(false);
        resetForm();
      } else {
        toast.error("Error updating Publication: : " + (result.error || ""));
      }
    } else {
      const result = await createPublication(data);
      if (result.success) {
        setPublications([result.data, ...publications]);
        setIsDrawerOpen(false);
        resetForm();
      } else {
        toast.error("Error creating Publication: : " + (result.error || ""));
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Publications</h2>
          <p className="mt-2 text-gray-600">Manage research papers, articles, and reports.</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsDrawerOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Publication
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Cover</th>
                <th className="p-4 font-semibold">Title & Details</th>
                <th className="p-4 font-semibold">PDF</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {publications.map((pub) => (
                <tr key={pub.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4">
                    {pub.coverImage ? (
                      <img src={pub.coverImage} alt={pub.title} className="w-12 h-16 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-16 bg-gray-100 rounded flex items-center justify-center text-gray-400">
                        <BookOpen className="w-5 h-5" />
                      </div>
                    )}
                  </td>
                  <td className="p-4">
                    <h4 className="font-medium text-gray-900">{pub.title}</h4>
                    <div className="text-sm text-gray-500 mt-1 flex items-center gap-2">
                      <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-indigo-100 text-indigo-800 rounded">
                        {pub.publicationType}
                      </span>
                      {pub.publishDate}
                    </div>
                  </td>
                  <td className="p-4">
                    {pub.pdfUrl ? (
                      <a 
                        href={pub.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 text-sm font-medium"
                      >
                        View PDF <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">No PDF</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(pub)}
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(pub.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {publications.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    No Publications found.
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
                {editingId ? "Edit Publication" : "New Publication"}
              </h3>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <form id="publication-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <textarea
                    required
                    rows={2}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="e.g. publication-title"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <select
                      required
                      value={publicationType}
                      onChange={(e) => setPublicationType(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                    >
                      <option value="Research Paper">Research Paper</option>
                      <option value="Article">Article</option>
                      <option value="Report">Report</option>
                      <option value="Policy Brief">Policy Brief</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="text"
                      required
                      value={publishDate}
                      onChange={(e) => setPublishDate(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="e.g. October 2024"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Abstract *</label>
                  <textarea
                    required
                    rows={4}
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PDF Link</label>
                  <input
                    type="url"
                    value={pdfUrl}
                    onChange={(e) => setPdfUrl(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="https://..."
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
                form="publication-form"
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading && <BookOpen className="w-4 h-4 animate-spin" />}
                {editingId ? "Save Changes" : "Create Publication"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
