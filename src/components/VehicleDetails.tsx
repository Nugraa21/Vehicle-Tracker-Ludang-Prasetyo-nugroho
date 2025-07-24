import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useVehicleStore } from '@/store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -36],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  shadowSize: [45, 45],
});

const VehicleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedVehicle, loading, error, fetchVehicleDetail } = useVehicleStore();

  useEffect(() => {
    if (id) fetchVehicleDetail(Number(id));
  }, [id, fetchVehicleDetail]);

  return (
    <div className="max-w-6xl mx-auto my-10 px-4">
      <div className="flex flex-col md:flex-row gap-6">

        {/* MAP */}
        <div className="w-full md:w-2/3 rounded-3xl border border-blue-200 dark:border-blue-500 shadow-xl overflow-hidden bg-white/60 dark:bg-gray-800/40 backdrop-blur-md">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">
                Lokasi Saat Ini
              </h3>
              <Button
                variant="outline"
                onClick={() => id && fetchVehicleDetail(Number(id))}
                className="flex items-center gap-2 border-blue-400 dark:border-blue-500 text-blue-600 dark:text-blue-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 rounded-md shadow-sm"
              >
                <RefreshCcw className="h-5 w-5" />
                Muat Ulang
              </Button>
            </div>
          </div>
          <div className="h-[300px] sm:h-[400px] w-full">
            {selectedVehicle && (
              <MapContainer
                center={[selectedVehicle.latitude, selectedVehicle.longitude]}
                zoom={13}
                scrollWheelZoom
                className="h-full w-full z-0"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; OpenStreetMap contributors'
                />
                <Marker
                  position={[selectedVehicle.latitude, selectedVehicle.longitude]}
                  icon={customIcon}
                >
                  <Popup>
                    <div className="text-sm font-semibold">
                      Kendaraan {selectedVehicle.vehicleId}<br />
                      Lat: {selectedVehicle.latitude.toFixed(5)}<br />
                      Lng: {selectedVehicle.longitude.toFixed(5)}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
        </div>

        {/* DETAIL INFO */}
        <div className="w-full md:w-1/3">
          <Card className="rounded-3xl border bg-white/60 dark:bg-gray-900/30 backdrop-blur-md shadow-xl p-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-semibold text-blue-800 dark:text-blue-200">
                Detail Kendaraan
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading && (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
                </div>
              )}

              {error && (
                <div className="text-red-600 text-center py-4 bg-red-100 dark:bg-red-900 rounded-md">
                  {error}
                </div>
              )}

              {!loading && !error && selectedVehicle && (
                <div className="space-y-4">
                  <DetailItem label="ID Kendaraan" value={selectedVehicle.vehicleId} badge />
                  <DetailItem label="Odometer" value={`${selectedVehicle.odometer.toLocaleString()} km`} />
                  <DetailItem label="Bahan Bakar" value={`${selectedVehicle.fuel_level}%`} color="green" />
                  <DetailItem label="Kecepatan" value={`${selectedVehicle.speed} km/jam`} color="orange" />
                  <DetailItem label="Terakhir Update" value={new Date(selectedVehicle.timestamp).toLocaleString()} />
                </div>
              )}

              {!loading && !error && !selectedVehicle && (
                <div className="text-gray-600 text-center py-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  Data kendaraan tidak ditemukan.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

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
    : 'text-gray-800 dark:text-white';

  return (
    <div>
      <span className="font-medium text-gray-600 dark:text-gray-300">{label}:</span>
      {badge ? (
        <span className="ml-2 px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 rounded-md font-mono text-sm shadow-sm">
          {value}
        </span>
      ) : (
        <span className={`ml-2 font-semibold ${colorClass}`}>{value}</span>
      )}
    </div>
  );
};

export default VehicleDetail;
