import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapController: React.FC<{ latitude: number; longitude: number }> = ({ latitude, longitude }) => {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
      map.setView([latitude, longitude], 13, { animate: true });
    }, 100);
  }, [map, latitude, longitude]);
  return null;
};

const VehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { selectedVehicle, loading, error, fetchVehicleDetail, vehicles } = useVehicleStore();

  useEffect(() => {
    if (id) {
      fetchVehicleDetail(Number(id));
    }
  }, [id, fetchVehicleDetail]);

  // Fungsi untuk memusatkan peta ke lokasi kendaraan
  const handleViewLocation = () => {
    if (selectedVehicle && selectedVehicle.latitude && selectedVehicle.longitude) {
      const map = document.querySelector('.leaflet-container') as HTMLElement;
      if (map) {
        const leafletMap = (window as any).L.map(map);
        leafletMap.setView([selectedVehicle.latitude, selectedVehicle.longitude], 13, { animate: true });
      }
    }
  };

  // Logika untuk navigasi ke kendaraan sebelumnya/berikutnya
  const currentVehicleIndex = vehicles.findIndex(v => v.id === Number(id));
  const prevVehicle = currentVehicleIndex > 0 ? vehicles[currentVehicleIndex - 1] : null;
  const nextVehicle = currentVehicleIndex < vehicles.length - 1 ? vehicles[currentVehicleIndex + 1] : null;

  const handlePrevVehicle = () => {
    if (prevVehicle) {
      navigate(`/vehicles/${prevVehicle.id}`);
    }
  };

  const handleNextVehicle = () => {
    if (nextVehicle) {
      navigate(`/vehicles/${nextVehicle.id}`);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden font-inter">
      <div className="absolute inset-0 w-full h-full z-0">
        {selectedVehicle && selectedVehicle.latitude && selectedVehicle.longitude ? (
          <MapContainer
            center={[selectedVehicle.latitude, selectedVehicle.longitude]}
            zoom={13}
            scrollWheelZoom
            className="h-full w-full z-0 animate-in fade-in zoom-in duration-500"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <CircleMarker
              center={[selectedVehicle.latitude, selectedVehicle.longitude]}
              radius={10}
              fillColor="#3b82f6"
              color="#1e40af"
              weight={2}
              fillOpacity={0.8}
              className="animate-pulse"
            >
              <Popup>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-100 shadow-md p-3 rounded-lg bg-white/95 dark:bg-gray-800/95">
                  Kendaraan {selectedVehicle.vehicleId}<br />
                  Lat: {selectedVehicle.latitude.toFixed(5)}<br />
                  Lng: {selectedVehicle.longitude.toFixed(5)}
                </div>
              </Popup>
            </CircleMarker>
            <MapController latitude={selectedVehicle.latitude} longitude={selectedVehicle.longitude} />
          </MapContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-300">Peta tidak tersedia: Data kendaraan tidak valid</p>
          </div>
        )}
      </div>

      <div className="absolute md:top-20 md:left-4 md:w-96 md:bottom-auto md:right-auto bottom-0 left-0 right-0 z-10 flex justify-center">
        <Card className="w-full md:w-96 mx-0 px-0 sm:max-w-lg rounded-t-2xl md:rounded-2xl bg-gradient-to-br from-blue-100/95 to-blue-200/90 dark:from-gray-900/95 dark:to-blue-900/90 backdrop-blur-2xl shadow-3xl border border-blue-300 dark:border-blue-800 transition-all duration-300 hover:shadow-4xl animate-in md:slide-in-from-left-4 slide-in-from-bottom-4 overflow-y-auto max-h-[50vh] md:max-h-[70vh]">
          <CardHeader className="sticky top-0 bg-blue-100/95 dark:bg-gray-900/95 backdrop-blur-xl z-10 px-4 py-3 flex flex-row items-center justify-between border-b border-blue-300 dark:border-blue-800">
            <CardTitle className="text-xl font-extrabold text-blue-700 dark:text-blue-300">Detail Kendaraan</CardTitle>
            <Button
              variant="outline"
              onClick={() => id && fetchVehicleDetail(Number(id))}
              className="flex items-center gap-2 border-2 border-blue-400 dark:border-blue-600 text-blue-600 dark:text-blue-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105"
            >
              <RefreshCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Muat Ulang</span>
            </Button>
          </CardHeader>
          <CardContent className="p-4 pt-3 space-y-4">
            {loading && (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            )}
            {error && (
              <div className="text-red-600 text-center py-4 bg-red-100/80 dark:bg-red-900/60 rounded-lg shadow-sm">
                Error: {error}
              </div>
            )}
            {!loading && !error && selectedVehicle && (
              <div className="space-y-4 text-sm">
                <DetailItem label="ID Kendaraan" value={selectedVehicle.vehicleId} badge />
                <DetailItem label="Odometer" value={`${selectedVehicle.odometer.toLocaleString()} km`} />
                <DetailItem label="Bahan Bakar" value={`${selectedVehicle.fuel_level}%`} color="green" />
                <DetailItem label="Kecepatan" value={`${selectedVehicle.speed} km/jam`} color="orange" />
                <DetailItem label="Terakhir Update" value={new Date(selectedVehicle.timestamp).toLocaleString()} />
                <Button
                  variant="default"
                  onClick={handleViewLocation}
                  className="w-full bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-800 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Lihat Lokasi
                </Button>
                <div className="flex justify-between mt-4">
                  <Button
                    variant="outline"
                    onClick={handlePrevVehicle}
                    disabled={!prevVehicle}
                    className="flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Sebelumnya</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleNextVehicle}
                    disabled={!nextVehicle}
                    className="flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-105 disabled:opacity-50"
                  >
                    <span className="hidden sm:inline">Berikutnya</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            {!loading && !error && !selectedVehicle && (
              <div className="text-gray-600 text-center py-6 bg-gray-100/80 dark:bg-gray-800/60 rounded-lg shadow-sm">
                Data kendaraan tidak ditemukan.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

type DetailItemProps = {
  label: string;
  value: string | number;
  color?: 'green' | 'orange' | 'red' | 'blue';
  badge?: boolean;
};

const DetailItem: React.FC<DetailItemProps> = ({ label, value, color, badge = false }) => {
  const colorClass = color
    ? `text-${color}-600 dark:text-${color}-400`
    : 'text-gray-800 dark:text-gray-100';

  return (
    <div className="flex items-center">
      <span className="font-medium text-gray-600 dark:text-gray-300 min-w-[120px]">{label}:</span>
      {badge ? (
        <span className="ml-3 px-3 py-1 bg-blue-100/80 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 rounded-full font-mono text-xs shadow-sm transition-all duration-200">
          {value}
        </span>
      ) : (
        <span className={`ml-3 font-semibold ${colorClass}`}>{value}</span>
      )}
    </div>
  );
};

export default VehicleDetail;