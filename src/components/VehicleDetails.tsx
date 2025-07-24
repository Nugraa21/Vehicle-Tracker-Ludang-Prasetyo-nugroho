import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVehicleStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
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
    if (id) fetchVehicleDetail(Number(id));
  }, [id, fetchVehicleDetail]);

  const currentVehicleIndex = vehicles.findIndex(v => v.id === Number(id));
  const prevVehicle = currentVehicleIndex > 0 ? vehicles[currentVehicleIndex - 1] : null;
  const nextVehicle = currentVehicleIndex < vehicles.length - 1 ? vehicles[currentVehicleIndex + 1] : null;

  const handlePrevVehicle = () => prevVehicle && navigate(`/vehicles/${prevVehicle.id}`);
  const handleNextVehicle = () => nextVehicle && navigate(`/vehicles/${nextVehicle.id}`);

  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        {selectedVehicle?.latitude && selectedVehicle?.longitude ? (
          <MapContainer
            center={[selectedVehicle.latitude, selectedVehicle.longitude]}
            zoom={13}
            scrollWheelZoom
            className="h-full w-full animate-in fade-in zoom-in duration-700 ease-in-out"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <CircleMarker
              center={[selectedVehicle.latitude, selectedVehicle.longitude]}
              radius={14}
              fillColor="#22d3ee"
              color="#0ea5e9"
              weight={3}
              fillOpacity={0.9}
              className="animate-pulse [animation-duration:1.2s]"
            >
              <Popup>
                <div className="text-sm font-bold text-gray-900 dark:text-gray-50 bg-white/90 dark:bg-gray-900/90 p-4 rounded-lg shadow-md">
                  Kendaraan {selectedVehicle.vehicleId}<br />
                  Lat: {selectedVehicle.latitude.toFixed(5)}<br />
                  Lng: {selectedVehicle.longitude.toFixed(5)}
                </div>
              </Popup>
            </CircleMarker>
            <MapController latitude={selectedVehicle.latitude} longitude={selectedVehicle.longitude} />
          </MapContainer>
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900">
            <p className="text-gray-700 dark:text-gray-200 text-xl font-semibold">Peta tidak tersedia: Data kendaraan tidak valid</p>
          </div>
        )}
      </div>

      <div className="absolute z-10 md:top-[64px] md:right-0 md:bottom-0 md:w-[28rem] px-6 md:px-0 md:py-0 bottom-6 left-0 right-0 flex md:justify-end justify-center">
        <Card className="rounded-none md:rounded-l-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-2xl border border-gray-200/60 dark:border-gray-700/60 w-full max-w-md sm:max-w-lg transition-all duration-500 ease-in-out hover:shadow-2xl overflow-y-auto max-h-[60vh] md:max-h-full">
          <CardHeader className="sticky top-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg z-10 px-6 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
            <CardTitle className="text-2xl font-bold text-blue-700 dark:text-blue-300 tracking-tight">Detail Kendaraan</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-4 space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
              </div>
            ) : error ? (
              <div className="text-red-600 text-center py-4 bg-red-100 dark:bg-red-900/50 rounded-lg shadow-md">
                Error: {error}
              </div>
            ) : selectedVehicle ? (
              <div className="space-y-4 text-sm">
                <DetailItem label="ID Kendaraan" value={selectedVehicle.vehicleId} badge />
                <DetailItem label="Odometer" value={`${selectedVehicle.odometer.toLocaleString()} km`} />
                <DetailItem label="Bahan Bakar" value={`${selectedVehicle.fuel_level}%`} color="cyan" />
                <DetailItem label="Kecepatan" value={`${selectedVehicle.speed} km/jam`} color="yellow" />
                <DetailItem label="Terakhir Update" value={new Date(selectedVehicle.timestamp).toLocaleString()} />
                <div className="flex justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrevVehicle}
                    disabled={!prevVehicle}
                    className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out hover:shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    <span className="hidden sm:inline">Sebelumnya</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleNextVehicle}
                    disabled={!nextVehicle}
                    className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out hover:shadow-md transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="hidden sm:inline">Berikutnya</span>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-gray-600 dark:text-gray-300 text-center py-6 bg-gray-100/50 dark:bg-gray-800/50 rounded-lg shadow-sm">
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
  color?: 'cyan' | 'yellow' | 'red' | 'blue';
  badge?: boolean;
};

const DetailItem: React.FC<DetailItemProps> = ({ label, value, color, badge = false }) => {
  const colorClass = color
    ? `text-${color}-500 dark:text-${color}-400`
    : 'text-gray-900 dark:text-gray-100';

  return (
    <div className="flex items-center">
      <span className="font-medium text-gray-600 dark:text-gray-400 min-w-[120px] text-sm">{label}:</span>
      {badge ? (
        <span className="ml-3 px-3 py-1 bg-cyan-100/80 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 rounded-full font-mono text-xs shadow-sm transition-all duration-300 ease-in-out hover:bg-cyan-200 dark:hover:bg-cyan-800">
          {value}
        </span>
      ) : (
        <span className={`ml-3 font-semibold ${colorClass}`}>{value}</span>
      )}
    </div>
  );
};

export default VehicleDetail;