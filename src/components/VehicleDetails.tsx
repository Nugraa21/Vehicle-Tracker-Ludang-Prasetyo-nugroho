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
    <Card className="max-w-6xl mx-auto my-10 p-6 md:p-10 rounded-3xl border bg-white/80 dark:bg-gray-900/60 dark:border-gray-700 shadow-xl transition-all">
      <CardHeader className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <CardTitle className="text-3xl font-bold text-blue-800 dark:text-blue-300">
          Detail Kendaraan
        </CardTitle>
        <Button
          variant="outline"
          onClick={() => id && fetchVehicleDetail(Number(id))}
          className="flex items-center gap-2 px-4 py-2 border-blue-400 dark:border-blue-500 text-blue-600 dark:text-blue-300 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 transition-all rounded-md shadow-sm"
        >
          <RefreshCcw className="h-5 w-5" />
          Muat Ulang
        </Button>
      </CardHeader>

      <CardContent>
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          </div>
        )}

        {error && (
          <div className="text-red-600 text-center py-4 bg-red-100 dark:bg-red-900 rounded-md">
            {error}
          </div>
        )}

        {selectedVehicle && !loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {/* Detail Informasi */}
            <div className="space-y-5">
              <DetailItem label="ID Kendaraan" value={selectedVehicle.vehicleId} badge />
              <DetailItem label="Odometer" value={`${selectedVehicle.odometer.toLocaleString()} km`} />
              <DetailItem label="Bahan Bakar" value={`${selectedVehicle.fuel_level}%`} color="green" />
              <DetailItem label="Kecepatan" value={`${selectedVehicle.speed} km/jam`} color="orange" />
              <DetailItem label="Terakhir Update" value={new Date(selectedVehicle.timestamp).toLocaleString()} />
            </div>

            {/* Peta Lokasi */}
            <div className="space-y-3 animate-in fade-in slide-in-from-right-6 duration-700">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300">Lokasi Saat Ini</h3>
              <div className="rounded-2xl border border-blue-200 dark:border-blue-500 shadow-lg overflow-hidden">
                <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] relative z-0">
                  <MapContainer
                    center={[selectedVehicle.latitude, selectedVehicle.longitude]}
                    zoom={13}
                    scrollWheelZoom
                    className="h-full w-full"
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
                </div>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && !selectedVehicle && (
          <div className="text-gray-600 text-center py-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
            Data kendaraan tidak ditemukan.
          </div>
        )}
      </CardContent>
    </Card>
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
