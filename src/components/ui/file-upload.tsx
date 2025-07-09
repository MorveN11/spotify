'use client';

import { useCallback, useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  accept: string;
  label: string;
  maxSize?: number;
  onFileSelect: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  preview?: boolean;
}

export function FileUpload({
  accept,
  label,
  maxSize = 5 * 1024 * 1024, // 5MB por defecto
  onFileSelect,
  error,
  disabled,
  className,
  preview = false,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = useCallback(
    (file: File | null) => {
      if (file) {
        if (file.size > maxSize) {
          return;
        }

        setSelectedFile(file);
        onFileSelect(file);

        if (preview && file.type.startsWith('image/')) {
          const url = URL.createObjectURL(file);
          setPreviewUrl(url);
        }
      } else {
        setSelectedFile(null);
        onFileSelect(null);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
      }
    },
    [maxSize, onFileSelect, preview, previewUrl],
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (disabled) return;

      const files = e.dataTransfer.files;
      if (files && files[0]) {
        handleFileSelect(files[0]);
      }
    },
    [disabled, handleFileSelect],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;

      const files = e.target.files;
      if (files && files[0]) {
        handleFileSelect(files[0]);
      }
    },
    [disabled, handleFileSelect],
  );

  const removeFile = useCallback(() => {
    handleFileSelect(null);
  }, [handleFileSelect]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={`file-upload-${label}`} className="text-sm font-medium">
        {label}
      </Label>

      <Card
        className={cn(
          'border-2 border-dashed transition-colors',
          dragActive && 'border-primary bg-primary/5',
          error && 'border-destructive',
          disabled && 'cursor-not-allowed opacity-50',
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <CardContent className="p-6">
          {selectedFile ? (
            <div className="space-y-4">
              {preview && previewUrl && (
                <div className="flex justify-center">
                  <div className="relative h-32 w-full overflow-hidden">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      className="rounded-lg object-cover"
                      fill
                      sizes="(max-width: 640px) 100vw, 640px"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{selectedFile.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                </div>

                <Button type="button" variant="ghost" size="sm" onClick={removeFile} disabled={disabled}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Arrastra y suelta tu archivo aquí</p>
                <p className="text-xs text-muted-foreground">o haz clic para seleccionar</p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled}
                onClick={() => document.getElementById(`file-upload-${label}`)?.click()}
              >
                Seleccionar archivo
              </Button>
            </div>
          )}

          <input
            id={`file-upload-${label}`}
            type="file"
            accept={accept}
            onChange={handleInputChange}
            className="hidden"
            disabled={disabled}
          />
        </CardContent>
      </Card>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
