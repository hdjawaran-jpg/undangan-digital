import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

const Preview = ({ template, data }) => {
  const [deviceSize, setDeviceSize] = useState('mobile');
  const [zoomLevel, setZoomLevel] = useState(100);

  const deviceSizes = {
    mobile: { width: 375, height: 667, icon: Smartphone },
    tablet: { width: 768, height: 1024, icon: Tablet },
    desktop: { width: 1200, height: 800, icon: Monitor }
  };

  const DeviceIcon = deviceSizes[deviceSize].icon;

  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'luxury':
        return <LuxuryTemplate data={data} />;
      default:
        return <ClassicTemplate data={data} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Preview Controls */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
        
        <div className="flex items-center space-x-4">
          {/* Device Size Selector */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            {Object.entries(deviceSizes).map(([key, { icon: Icon }]) => (
              <button
                key={key}
                onClick={() => setDeviceSize(key)}
                className={`p-2 rounded ${
                  deviceSize === key 
                    ? 'bg-white shadow-sm text-indigo-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={18} />
              </button>
            ))}
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <ZoomOut size={18} />
            </button>
            <span className="text-sm text-gray-600 w-12 text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel(Math.min(150, zoomLevel + 10))}
              className="p-2 text-gray-500 hover:text-gray-700"
            >
              <ZoomIn size={18} />
            </button>
          </div>

          {/* Reset Button */}
          <button
            onClick={() => setZoomLevel(100)}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="flex justify-center">
        <div 
          className="border-4 border-gray-200 rounded-lg bg-white overflow-auto shadow-inner"
          style={{ 
            width: deviceSizes[deviceSize].width,
            height: deviceSizes[deviceSize].height,
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center'
          }}
        >
          <div className="w-full h-full">
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

// Template Components
const ClassicTemplate = ({ data }) => (
  <div className="min-h-full bg-gradient-to-br from-rose-50 to-amber-50 p-8">
    <div className="text-center">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-gray-800 mb-2">
          {data.event.title}
        </h1>
        <div className="w-20 h-1 bg-rose-300 mx-auto"></div>
      </div>

      {/* Couple Names */}
      <div className="mb-8">
        <div className="text-4xl font-serif text-rose-600 mb-2">
          {data.bride.name}
        </div>
        <div className="text-xl text-gray-600 mb-4">&</div>
        <div className="text-4xl font-serif text-rose-600">
          {data.groom.name}
        </div>
      </div>

      {/* Event Details */}
      <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
        <div className="space-y-3 text-gray-700">
          <div>
            <div className="font-semibold">Hari & Tanggal</div>
            <div>{data.event.date}</div>
          </div>
          <div>
            <div className="font-semibold">Waktu</div>
            <div>{data.event.time}</div>
          </div>
          <div>
            <div className="font-semibold">Tempat</div>
            <div>{data.event.venue}</div>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="text-gray-600 leading-relaxed">
        {data.message}
      </div>
    </div>
  </div>
);

const ModernTemplate = ({ data }) => (
  <div className="min-h-full bg-white p-8">
    <div className="text-center">
      {/* Minimalist Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-light text-gray-900 mb-4">
          {data.bride.nickname} & {data.groom.nickname}
        </h1>
        <div className="text-lg text-gray-500">We're Getting Married</div>
      </div>

      {/* Date */}
      <div className="mb-8">
        <div className="text-2xl text-indigo-600 font-medium">
          {data.event.date}
        </div>
        <div className="text-gray-500">{data.event.time}</div>
      </div>

      {/* Venue */}
      <div className="mb-8 p-6 border border-gray-200 rounded-lg">
        <div className="text-lg font-medium text-gray-900 mb-2">
          {data.event.venue}
        </div>
        <div className="text-gray-600 text-sm">
          {data.event.address}
        </div>
      </div>
    </div>
  </div>
);

const LuxuryTemplate = ({ data }) => (
  <div className="min-h-full bg-gradient-to-br from-amber-900 to-rose-900 text-white p-8">
    <div className="text-center">
      {/* Gold Border Header */}
      <div className="border-b border-amber-400 pb-4 mb-8">
        <h1 className="text-4xl font-serif mb-2">The Wedding Of</h1>
        <div className="text-3xl font-light">{data.bride.name}</div>
        <div className="text-xl my-2">&</div>
        <div className="text-3xl font-light">{data.groom.name}</div>
      </div>

      {/* Date in Elegant Style */}
      <div className="mb-8">
        <div className="text-2xl font-serif mb-2">{data.event.date}</div>
        <div className="text-amber-300">{data.event.time}</div>
      </div>

      {/* Venue */}
      <div className="mb-8">
        <div className="text-xl font-serif mb-2">{data.event.venue}</div>
        <div className="text-amber-200 text-sm">{data.event.address}</div>
      </div>
    </div>
  </div>
);

export default Preview;