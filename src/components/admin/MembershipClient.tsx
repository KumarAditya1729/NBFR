"use client";


import { useState } from "react";
import { Plus, Edit2, Trash2, X, Users } from "lucide-react";
import { toast } from "@/components/admin/AdminToast";
import { createMembershipProgram, updateMembershipProgram, deleteMembershipProgram } from "@/lib/actions";

type MembershipProgram = any;

export default function MembershipClient({ initialData }: { initialData: MembershipProgram[] }) {
  const [programs, setPrograms] = useState<MembershipProgram[]>(initialData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconName, setIconName] = useState("Users");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIconName("Users");
    setEditingId(null);
  };

  const handleEdit = (program: MembershipProgram) => {
    setEditingId(program.id);
    setTitle(program.title || "");
    setDescription(program.description || "");
    setIconName(program.iconName || "Users");
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Membership Program?")) return;
    
    setIsLoading(true);
    const result = await deleteMembershipProgram(id);
    setIsLoading(false);

    if (result.success) {
      setPrograms(programs.filter((p) => p.id !== id));
    } else {
      toast.error("Error deleting Program: : " + (result.error || ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      title,
      description,
      iconName,
    };

    if (editingId) {
      const result = await updateMembershipProgram(editingId, data);
      if (result.success) {
        setPrograms(programs.map((p) => (p.id === editingId ? result.data : p)));
        setIsDrawerOpen(false);
        resetForm();
      } else {
        toast.error("Error updating Program: : " + (result.error || ""));
      }
    } else {
      const result = await createMembershipProgram(data);
      if (result.success) {
        setPrograms([result.data, ...programs]);
        setIsDrawerOpen(false);
        resetForm();
      } else {
        toast.error("Error creating Program: : " + (result.error || ""));
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Memberships & Fellowships</h2>
          <p className="mt-2 text-gray-600">Manage membership and fellowship opportunities.</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsDrawerOpen(true);
          }}
          className="bg-sky-600 hover:bg-sky-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Program
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {programs.map((program) => (
                <tr key={program.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4 font-medium text-gray-900">{program.title}</td>
                  <td className="p-4 text-gray-500 max-w-xl truncate">{program.description}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(program)}
                        className="p-2 text-gray-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(program.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {programs.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-500">
                    No Programs found.
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
                {editingId ? "Edit Program" : "New Program"}
              </h3>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <form id="membership-form" onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none"
                    placeholder="e.g. Research Fellowship"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    required
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 outline-none resize-none"
                    placeholder="Describe the program..."
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
                form="membership-form"
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-sky-600 text-white font-medium rounded-xl hover:bg-sky-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading && <Users className="w-4 h-4 animate-spin" />}
                {editingId ? "Save Changes" : "Create Program"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
