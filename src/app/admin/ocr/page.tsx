"use client"

import React, { useState, useCallback, useRef } from 'react'
import { UploadCloud, Image as ImageIcon, CheckCircle2, AlertCircle, RefreshCw, Copy, Save, FileText } from 'lucide-react'
import Tesseract from 'tesseract.js'

export default function OcrToolPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('')
  const [extractedText, setExtractedText] = useState('')
  const [documentTitle, setDocumentTitle] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string)
        setExtractedText('')
        setProgress(0)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleExtractText = async () => {
    if (!imageSrc) return

    setIsProcessing(true)
    setProgress(0)
    setStatusText('Initializing OCR engine...')

    try {
      const result = await Tesseract.recognize(imageSrc, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.round(m.progress * 100))
            setStatusText('Extracting text...')
          } else {
            setStatusText(m.status)
          }
        },
      })

      setExtractedText(result.data.text)
      setStatusText('Extraction complete!')
    } catch (error) {
      console.error('OCR Error:', error)
      setStatusText('Error extracting text. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText)
    alert('Copied to clipboard!')
  }

  const handleSave = async () => {
    if (!extractedText) return
    if (!documentTitle.trim()) {
      alert('Please enter a document title before saving.')
      return
    }

    setIsSaving(true)
    try {
      const res = await fetch('/api/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: documentTitle, extractedText }),
      })
      
      if (res.ok) {
        alert('Document saved successfully!')
        setDocumentTitle('')
        setExtractedText('')
        setImageSrc(null)
      } else {
        const data = await res.json()
        alert(data.error || 'Failed to save document')
      }
    } catch (error) {
      console.error(error)
      alert('Network error while saving.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-full flex flex-col">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">Digital OCR Tool</h2>
        <p className="mt-2 text-lg text-gray-600">Upload an image to extract text instantly using client-side OCR.</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0">
        {/* Left Pane - Upload & Preview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-500" />
              Source Image
            </h3>
            {imageSrc && (
              <button 
                onClick={() => setImageSrc(null)}
                className="text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="flex-1 p-6 flex flex-col relative">
            {!imageSrc ? (
              <div 
                className="flex-1 border-2 border-dashed border-blue-200 rounded-xl bg-blue-50/50 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition-colors group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="p-4 bg-blue-100 text-blue-600 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <p className="text-blue-900 font-medium text-lg">Click to upload an image</p>
                <p className="text-blue-600/70 text-sm mt-2">Supports JPG, PNG, WEBP</p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload} 
                />
              </div>
            ) : (
              <div className="flex-1 relative rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={imageSrc} 
                  alt="Source" 
                  className="max-w-full max-h-[500px] object-contain"
                />
              </div>
            )}

            {imageSrc && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleExtractText}
                  disabled={isProcessing}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-full shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      {statusText} {progress > 0 && `${progress}%`}
                    </>
                  ) : (
                    'Extract Text Now'
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Pane - Extracted Text */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" />
              Extracted Text
            </h3>
            {extractedText && (
              <div className="flex gap-2">
                <button 
                  onClick={handleCopy}
                  className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-1 text-sm font-medium"
                >
                  <Copy className="w-4 h-4" /> Copy
                </button>
              </div>
            )}
          </div>
          
          <div className="flex-1 p-6 relative flex flex-col">
            {extractedText ? (
              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                className="flex-1 w-full h-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none resize-none font-mono text-sm leading-relaxed text-gray-800"
                placeholder="Edit extracted text here..."
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                {isProcessing ? (
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-gray-100 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="font-medium text-indigo-600">Processing Image...</p>
                  </div>
                ) : (
                  <>
                    <AlertCircle className="w-12 h-12 mb-3 opacity-20" />
                    <p>No text extracted yet.</p>
                  </>
                )}
              </div>
            )}

            {extractedText && (
               <div className="mt-6 flex flex-col gap-4">
                <input 
                  type="text" 
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  placeholder="Enter document title to save..." 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-500 text-white font-medium py-3 px-8 rounded-full shadow-md transition-all flex items-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {isSaving ? 'Saving...' : 'Save Document'}
                  </button>
                </div>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
