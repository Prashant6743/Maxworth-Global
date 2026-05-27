import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Plus, Minus, Maximize2 } from "lucide-react";

export function PremiumMap() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [zoomLevel, setZoomLevel] = useState(15);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Center coordinates for Dwarka, New Delhi office
    const officeCoords: [number, number] = [28.5882, 77.0601];

    if (!mapRef.current) {
      // Initialize map
      mapRef.current = L.map(mapContainerRef.current, {
        center: officeCoords,
        zoom: 15,
        zoomControl: false, // Disabling standard zoom controls to design premium ones
        attributionControl: false, // Handled custom attribution
      });

      // CartoDB Dark Matter tile layer for that sleek dark-navy aesthetic
      L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 20,
      }).addTo(mapRef.current);

      // Custom pulsing gold HTML marker
      const goldIcon = L.divIcon({
        className: "custom-gold-marker",
        html: `
          <div class="relative flex items-center justify-center w-12 h-12">
            <!-- Pulsing rings -->
            <div class="absolute w-12 h-12 bg-amber-500/25 rounded-full animate-ping"></div>
            <div class="absolute w-7 h-7 bg-amber-500/20 rounded-full animate-pulse"></div>
            <!-- Marker Pin -->
            <div class="relative w-5 h-5 rounded-full bg-slate-900 border-[1.5px] border-amber-500 shadow-2xl flex items-center justify-center">
              <div class="w-2 h-2 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400"></div>
            </div>
          </div>
        `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      });

      // Add marker to map
      const marker = L.marker(officeCoords, { icon: goldIcon }).addTo(mapRef.current);

      // Custom themed popup
      marker.bindPopup(
        `
        <div class="p-3 text-slate-100 max-w-[200px] select-none pointer-events-auto">
          <h4 class="font-serif font-bold text-sm text-amber-500 mb-1 flex items-center gap-1.5">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            THE MAXWORTH-GLOBAL LLP
          </h4>
          <p class="text-[11px] font-light text-slate-300 leading-relaxed mb-3">
            27, Sunview Apartments, Sector-11, Dwarka, New Delhi – 110075
          </p>
          <a href="https://maps.app.goo.gl/XkLHiRBzZwahZJ1h9" target="_blank" rel="noopener noreferrer" 
             class="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-500 hover:text-amber-400 transition-colors group">
            Get Directions
            <span class="transition-transform group-hover:translate-x-0.5">&rarr;</span>
          </a>
        </div>
        `,
        {
          className: "premium-map-popup",
          closeButton: false,
          offset: [0, -10],
        }
      );

      // Auto-open popup on load after a slight delay
      setTimeout(() => {
        if (mapRef.current && marker) {
          marker.openPopup();
        }
      }, 750);

      // Track zoom level changes
      mapRef.current.on("zoomend", () => {
        if (mapRef.current) {
          setZoomLevel(mapRef.current.getZoom());
        }
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Custom Zoom Control functions
  const zoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const zoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const resetView = () => {
    if (mapRef.current) {
      mapRef.current.setView([28.5882, 77.0601], 15);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-0">
      {/* CSS overrides injected directly for Leaflet custom design */}
      <style>{`
        /* Smooth zoom transitions */
        .leaflet-container {
          background: #0f172a !important; /* matches tailwind slate-900 */
          font-family: inherit !important;
        }
        
        /* Premium custom glassmorphic popup */
        .premium-map-popup .leaflet-popup-content-wrapper {
          background: rgba(15, 23, 42, 0.95) !important;
          backdrop-filter: blur(12px) !important;
          border: 1px solid rgba(245, 158, 11, 0.3) !important;
          border-radius: 12px !important;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3) !important;
          padding: 0 !important;
        }

        .premium-map-popup .leaflet-popup-content {
          margin: 0 !important;
          line-height: normal !important;
        }

        .premium-map-popup .leaflet-popup-tip-container {
          margin-top: -1px !important;
        }

        .premium-map-popup .leaflet-popup-tip {
          background: rgba(15, 23, 42, 0.95) !important;
          border-left: 1px solid rgba(245, 158, 11, 0.3) !important;
          border-bottom: 1px solid rgba(245, 158, 11, 0.3) !important;
          box-shadow: none !important;
        }

        /* Attribution styling */
        .leaflet-attribution-flag {
          display: none !important;
        }
      `}</style>

      {/* Map Element */}
      <div ref={mapContainerRef} className="w-full h-full absolute inset-0 z-0" />

      {/* Sleek Floating Compass/Coordinates HUD - top right */}
      <div className="absolute top-4 right-4 z-10 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/5 text-[9px] font-mono tracking-widest text-slate-400 pointer-events-none select-none">
        <span className="flex h-1.5 w-1.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-500"></span>
        </span>
        Dwarka SEC-11 · 28.5882° N, 77.0601° E
      </div>

      {/* Rebuilt Custom Zoom UI Controller - bottom right */}
      <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-2">
        <button
          onClick={zoomIn}
          disabled={zoomLevel >= 20}
          className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-950/85 backdrop-blur-md border border-white/10 text-slate-300 hover:text-amber-500 hover:border-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl disabled:opacity-50 disabled:pointer-events-none"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>

        <button
          onClick={zoomOut}
          disabled={zoomLevel <= 3}
          className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-950/85 backdrop-blur-md border border-white/10 text-slate-300 hover:text-amber-500 hover:border-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl disabled:opacity-50 disabled:pointer-events-none"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>

        <button
          onClick={resetView}
          className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-950/85 backdrop-blur-md border border-white/10 text-slate-300 hover:text-amber-500 hover:border-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl"
          title="Recenter Map"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Custom attribution badge - bottom left */}
      <div className="absolute bottom-2 left-2 z-10 text-[8px] text-slate-500 bg-slate-950/50 backdrop-blur-sm px-2 py-0.5 rounded border border-white/5 pointer-events-none select-none">
        &copy; OpenStreetMap &copy; CartoDB
      </div>
    </div>
  );
}
