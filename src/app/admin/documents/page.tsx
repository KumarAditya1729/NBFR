"use client"

import React, { useEffect, useState } from 'react'
import { FileText, Calendar, Database, Search } from 'lucide-react'
import Link from 'next/link'

type ScannedDocument = {
  id: string
  title: string
  extractedText: string
  createdAt: string
}

export default function DocumentsListPage() {
  const [documents, setDocuments] = useState<ScannedDocument[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch('/api/documents')
        if (!res.ok) throw new Error('Failed to fetch documents')
        const data = await res.json()
        setDocuments(data)
      } catch (err) {
        console.error(err)
        setError('Could not connect to database. Please make sure NeonDB is configured.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doc.extractedText.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Saved Documents</h2>
          <p className="mt-2 text-lg text-gray-600">View all your OCR scanned documents from the database.</p>
        </div>
        <Link href="/admin/ocr" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors flex items-center gap-2">
          <FileText className="w-5 h-5" />
          New Scan
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <div className="p-0">
          {isLoading ? (
            <div className="p-12 text-center text-gray-500">
              <Database className="w-12 h-12 animate-pulse mx-auto mb-4 text-gray-300" />
              <p>Connecting to database...</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-500 bg-red-50/50">
              <Database className="w-12 h-12 mx-auto mb-4 text-red-300" />
              <p className="font-medium">{error}</p>
              <p className="text-sm mt-2 opacity-80">Did you run `npx prisma db push` with your NeonDB connection string?</p>
            </div>
          ) : filteredDocs.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No documents found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600">
                    <th className="py-4 px-6">Title</th>
                    <th className="py-4 px-6">Extracted Text Preview</th>
                    <th className="py-4 px-6 w-48">Date Added</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredDocs.map((doc) => (
                    <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">{doc.title}</td>
                      <td className="py-4 px-6 text-gray-500 text-sm">
                        <div className="max-w-md truncate">
                          {doc.extractedText}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-500 text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
