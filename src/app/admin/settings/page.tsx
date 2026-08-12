import { PrismaClient } from '@prisma/client'
import { saveSiteSettings } from '@/actions/admin'

const prisma = new PrismaClient()

export default async function SettingsAdmin() {
  const settings = await prisma.siteSettings.findFirst()

  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Global Site Settings</h2>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form action={saveSiteSettings} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Headline</label>
              <input type="text" name="heroHeadline" defaultValue={settings?.heroHeadline || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subheadline</label>
              <input type="text" name="heroSubheadline" defaultValue={settings?.heroSubheadline || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">About Text</label>
              <textarea name="aboutText" rows={4} defaultValue={settings?.aboutText || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
              <input type="email" name="contactEmail" defaultValue={settings?.contactEmail || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
              <input type="text" name="contactPhone" defaultValue={settings?.contactPhone || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input type="text" name="address" defaultValue={settings?.address || ''} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
          <div className="pt-4">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export const dynamic = 'force-dynamic';
