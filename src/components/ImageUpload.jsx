import React, { useState } from 'react';
import { Upload, X, Loader } from 'lucide-react';
import api from '../utils/api';

const ImageUpload = ({ onUploadSuccess, onRemove, currentImage, label = "Upload Gambar" }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFileSelect = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Hanya file gambar yang diizinkan');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file maksimal 5MB');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        onUploadSuccess(response.data.image);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Gagal mengupload gambar. Silakan coba lagi.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  if (currentImage) {
    return (
      <div className="relative">
        <img
          src={currentImage.url}
          alt="Uploaded"
          className="w-full h-48 object-cover rounded-lg"
        />
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
        >
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        dragOver 
          ? 'border-indigo-500 bg-indigo-50' 
          : 'border-gray-300 hover:border-gray-400'
      } ${uploading ? 'opacity-50' : ''}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        disabled={uploading}
        className="hidden"
        id="image-upload"
      />
      
      <label
        htmlFor="image-upload"
        className="cursor-pointer block"
      >
        {uploading ? (
          <Loader className="w-8 h-8 animate-spin mx-auto mb-2 text-indigo-600" />
        ) : (
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        )}
        
        <div className="text-sm text-gray-600">
          {uploading ? (
            'Mengupload...'
          ) : (
            <>
              <span className="text-indigo-600 font-medium">Klik untuk upload</span>
              <br />
              atau drag & drop
              <br />
              PNG, JPG, GIF (maks. 5MB)
            </>
          )}
        </div>
      </label>
    </div>
  );
};

export default ImageUpload;