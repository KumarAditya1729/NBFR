"use client";


import { useState } from "react";
import { Plus, Edit2, Trash2, X, Activity, Save } from "lucide-react";
import { toast } from "@/components/admin/AdminToast";
import { createImpactStat, updateImpactStat, deleteImpactStat } from "@/lib/actions";

type ImpactStat = any; // We'll type this properly later

export default function ImpactStatClient({ initialData }: { initialData: ImpactStat[] }) {
  const [stats, setStats] = useState<ImpactStat[]>(initialData);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Form State
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [iconName, setIconName] = useState("Activity");
  const [order, setOrder] = useState<number>(0);

  const resetForm = () => {
    setValue("");
    setLabel("");
    setDescription("");
    setIconName("Activity");
    setOrder(0);
    setEditingId(null);
  };

  const handleEdit = (stat: ImpactStat) => {
    setEditingId(stat.id);
    setValue(stat.value || "");
    setLabel(stat.label || "");
    setDescription(stat.description || "");
    setIconName(stat.iconName || "Activity");
    setOrder(stat.order || 0);
    setIsDrawerOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Impact Stat?")) return;
    
    setIsLoading(true);
    const result = await deleteImpactStat(id);
    setIsLoading(false);

    if (result.success) {
      setStats(stats.filter((s) => s.id !== id));
    } else {
      toast.error("Error deleting Stat: : " + (result.error || ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const data = {
      value,
      label,
      description,
      iconName,
      order,
    };

    if (editingId) {
      const result = await updateImpactStat(editingId, data);
      if (result.success) {
        setStats(stats.map((s) => (s.id === editingId ? result.data : s)));
        setIsDrawerOpen(false);
        resetForm();
      } else {
        toast.error("Error updating Stat: : " + (result.error || ""));
      }
    } else {
      const result = await createImpactStat(data);
      if (result.success) {
        setStats([result.data, ...stats]);
        setIsDrawerOpen(false);
        resetForm();
      } else {
        toast.error("Error creating Stat: : " + (result.error || ""));
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Impact Stats</h2>
          <p className="mt-2 text-gray-600">Manage the key statistics shown on the impact page.</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsDrawerOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-5 rounded-lg shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Stat
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm uppercase tracking-wider text-gray-500">
                <th className="p-4 font-semibold">Value</th>
                <th className="p-4 font-semibold">Label</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold">Order</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {stats.map((stat) => (
                <tr key={stat.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4 font-bold text-gray-900 text-lg">{stat.value}</td>
                  <td className="p-4 font-medium text-gray-700">{stat.label}</td>
                  <td className="p-4 text-gray-500 truncate max-w-[200px]">{stat.description}</td>
                  <td className="p-4 text-gray-500">{stat.order}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(stat)}
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(stat.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {stats.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    No Impact Stats found.
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
                {editingId ? "Edit Impact Stat" : "New Impact Stat"}
              </h3>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6">
              <form id="impact-stat-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Value *</label>
                    <input
                      type="text"
                      required
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="e.g. 50+"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label *</label>
                    <input
                      type="text"
                      required
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="e.g. Districts"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                    placeholder="Provide context..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order (Optional)</label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
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
                form="impact-stat-form"
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading && <Activity className="w-4 h-4 animate-spin" />}
                {editingId ? "Save Changes" : "Create Stat"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
