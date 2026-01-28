'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, File, X, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DocumentUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Visual only - no actual file handling in MVP
    alert('File upload functionality will be available after backend integration.');
  };

  const handleFileSelect = () => {
    // Visual only - no actual file handling in MVP
    alert('File upload functionality will be available after backend integration.');
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-lg sm:text-xl">Document Upload</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Upload required documents for onboarding. This is a visual placeholder - functionality will be available after backend integration.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-4 sm:p-6 lg:p-8 text-center transition-colors',
            isDragging
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          role="button"
          aria-label="Document upload area"
          tabIndex={0}
        >
          <Upload className="h-8 w-8 sm:h-12 sm:w-12 mx-auto text-gray-400 mb-3 sm:mb-4" aria-hidden="true" />
          <p className="text-sm sm:text-base text-gray-600 mb-2">
            Drag and drop files here, or click to select
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
            Supported formats: PDF, JPG, PNG (Max 10MB)
          </p>
          <Button 
            onClick={handleFileSelect} 
            variant="outline" 
            disabled
            className="min-h-[44px]"
            aria-label="Select files (disabled in MVP)"
          >
            Select Files
          </Button>
          <p className="text-xs text-gray-400 mt-3 sm:mt-4">
            ⚠️ File upload is disabled in MVP - visual only
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Selected Files:</p>
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-50 rounded border"
              >
                <div className="flex items-center gap-2">
                  <File className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{file.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                  className="h-6 w-6"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
          <p className="text-xs text-blue-900">
            <strong>Required Documents:</strong>
          </p>
          <ul className="text-xs text-blue-700 mt-1 list-disc list-inside">
            <li>I-9 Form</li>
            <li>W-4 Form</li>
            <li>Direct Deposit Form</li>
            <li>Government-issued ID</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
