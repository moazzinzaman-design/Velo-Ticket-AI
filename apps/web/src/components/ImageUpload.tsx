"use client";

import { useState } from 'react';
import { createClient } from '../lib/supabase/client';
import { Loader2, Upload } from 'lucide-react';

interface ImageUploadProps {
    onUploadComplete: (url: string) => void;
    bucketName?: string;
    folderPath?: string;
}

export default function ImageUpload({ onUploadComplete, bucketName = 'events', folderPath = 'uploads' }: ImageUploadProps) {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            setError(null);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error('You must select an image to upload.');
            }

            const file = event.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
            const filePath = `${folderPath}/${fileName}`;

            const supabase = createClient();

            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

            onUploadComplete(data.publicUrl);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-white/5 border-white/20">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploading ? (
                            <Loader2 className="w-8 h-8 mb-4 text-white animate-spin" />
                        ) : (
                            <Upload className="w-8 h-8 mb-4 text-gray-400" />
                        )}
                        <p className="mb-2 text-sm text-gray-400">
                            <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={handleUpload} disabled={uploading} accept="image/*" />
                </label>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
