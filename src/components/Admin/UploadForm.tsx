import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, Image as ImageIcon, Save } from 'lucide-react';
import { Button } from '../Shared/Button';
import { Input } from '../Shared/Input';
import { ListingItem, ListingStatus } from '../../types';
import { v4 as uuidv4 } from 'uuid';

interface UploadFormProps {
  onSubmit: (item: ListingItem) => void;
  initialData?: ListingItem | null;
  onCancelEdit?: () => void;
}

export const UploadForm: React.FC<UploadFormProps> = ({ onSubmit, initialData, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [status, setStatus] = useState<ListingStatus>(ListingStatus.Available);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAssetPicker, setShowAssetPicker] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setPrice(initialData.price.toString());
      setOldPrice(initialData.old_price ? initialData.old_price.toString() : '');
      setStatus(initialData.status);
      setImages(initialData.image_urls);
    } else {
      setTitle('');
      setDescription('');
      setPrice('');
      setStatus(ListingStatus.Available);
      setImages([]);
    }
  }, [initialData]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImages((prev) => [...prev, e.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif'],
      'image/webp': ['.webp']
    },
    maxFiles: 5,
  } as any);

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addAssetImage = (url: string) => {
    setImages((prev) => [...prev, url]);
    // Don't close picker immediately to allow multiple selections if desired, 
    // or close it. User preference. Let's keep it open for now or maybe close it.
    // Let's keep it open so they can pick multiple.
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !price || images.length === 0) return;

    setLoading(true);

    // Process immediately without artificial delay
    const now = new Date().toISOString();
    const newItem: ListingItem = {
      id: initialData ? initialData.id : uuidv4(),
      title,
      description,
      price: parseFloat(price),
      old_price: oldPrice ? parseFloat(oldPrice) : null,
      status,
      image_urls: images,
      dim_length: null,
      dim_width: null,
      dim_height: null,
      sort_order: initialData ? initialData.sort_order : 999,
      created_at: initialData ? initialData.created_at : now,
      updated_at: now,
    };

    onSubmit(newItem);
    
    if (!initialData) {
      // Reset form only if creating new
      setTitle('');
      setDescription('');
      setPrice('');
      setOldPrice('');
      setStatus(ListingStatus.Available);
      setImages([]);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          {initialData ? 'Edit Listing' : 'Add New Listing'}
        </h2>
        {initialData && onCancelEdit && (
          <Button variant="ghost" size="sm" onClick={onCancelEdit} type="button">
            Cancel
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {/* Image Upload Area */}
        <div
          {...getRootProps()}
          className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-6 py-10 transition-colors ${
            isDragActive ? 'border-black bg-gray-50' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4 flex text-sm text-gray-600">
              <span className="relative rounded-md bg-white font-medium text-black focus-within:outline-none focus-within:ring-2 focus-within:ring-black focus-within:ring-offset-2 hover:text-gray-500">
                Upload files
              </span>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB (Max 5)</p>
          </div>
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={() => setShowAssetPicker(!showAssetPicker)}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            {showAssetPicker ? 'Hide Info' : 'Info'}
          </button>
        </div>

        {showAssetPicker && (
          <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
            <p className="text-xs text-blue-700">
              💡 Images are uploaded directly from your device. After adding listings, images will be stored in Supabase Storage and automatically linked to your listings.
            </p>
          </div>
        )}

        {/* Image Previews */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative aspect-square w-full">
                <img
                  src={img}
                  alt={`Preview ${index}`}
                  className="h-full w-full rounded-md object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute right-1 top-1 rounded-full bg-white p-1 shadow-md hover:bg-gray-100"
                >
                  <X className="h-3 w-3 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        )}

        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Vintage Leather Bag"
          required
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            rows={3}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
            placeholder="Describe the item..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <Input
          label="Price ($)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="0.00"
          min="0"
          step="0.01"
          required
        />

        <Input
          label="Old Price ($) — optional, shown as crossed out"
          type="number"
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
          placeholder="0.00"
          min="0"
          step="0.01"
        />

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as ListingStatus)}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black sm:text-sm"
          >
            <option value={ListingStatus.Available}>Available</option>
            <option value={ListingStatus.Pending}>Pending</option>
            <option value={ListingStatus.Sold}>Sold</option>
          </select>
        </div>

        <Button type="submit" className="w-full" isLoading={loading}>
          {initialData ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              Update Listing
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Publish Listing
            </>
          )}
        </Button>
      </div>
    </form>
  );
};
