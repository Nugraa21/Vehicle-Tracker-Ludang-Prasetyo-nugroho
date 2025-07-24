import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicleStore } from '@/store';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2 } from "lucide-react";

const VehicleList: React.FC = () => {
  const navigate = useNavigate();
  const { vehicles, loading, error, fetchVehicles } = useVehicleStore();
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  const filteredVehicles = vehicles
    .filter((vehicle) => statusFilter === 'all' || vehicle.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'speed') return b.speed - a.speed;
      return 0;
    });

  return (
    <div className="space-y-6 py-6 px-4 md:px-10 font-inter">
      <Card className="p-6 rounded-3xl bg-gradient-to-br from-white/70 via-blue-50/70 to-white/70 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-md border border-gray-200 dark:border-gray-800 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">Filter by Status</h3>
            <div className="flex gap-3 flex-wrap">
              {['all', 'ACTIVE', 'INACTIVE'].map(status => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  className={`capitalize text-sm px-5 py-2 rounded-xl transition-all duration-200 font-medium
                    ${statusFilter === status
                      ? status === 'ACTIVE'
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : status === 'INACTIVE'
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 sm:mr-2">Sort By</h3>
            {['name', 'speed'].map((key) => (
              <Button
                key={key}
                variant={sortBy === key ? 'default' : 'outline'}
                className={`text-sm px-5 py-2 rounded-xl font-medium
                  ${sortBy === key
                    ? 'bg-blue-500 hover:bg-blue-600 text-white'
                    : 'border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'}`}
                onClick={() => setSortBy(key)}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </Card>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
        </div>
      )}

      {error && (
        <div className="text-red-600 text-center py-4 bg-red-100 dark:bg-red-900/50 rounded-xl shadow-md">
          Error: {error}
        </div>
      )}

      {!loading && !error && filteredVehicles.length === 0 && (
        <div className="text-gray-600 text-center py-6 bg-gray-100 dark:bg-gray-800/50 rounded-xl shadow-md">
          Tidak ada kendaraan ditemukan.
        </div>
      )}

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredVehicles.map((vehicle, index) => (
          <Card
            key={vehicle.id}
            className="rounded-3xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-xl hover:shadow-2xl transition-transform duration-300 hover:scale-[1.025] animate-fade-in"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-extrabold text-blue-700 dark:text-blue-300 tracking-tight">
                {vehicle.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p className="flex items-center gap-2">
                <span className="font-semibold">Status:</span>
                <Badge
                  variant="outline"
                  className={`text-white text-xs px-3 py-1 rounded-full font-semibold shadow-sm
                    ${vehicle.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}`}
                >
                  {vehicle.status}
                </Badge>
              </p>
              <p>
                Kecepatan: <span className="font-semibold text-blue-600 dark:text-blue-400">{vehicle.speed} km/jam</span>
              </p>
              <p>
                Terakhir Update: <span className="font-medium text-gray-800 dark:text-gray-200">{new Date(vehicle.updated_at).toLocaleString()}</span>
              </p>
              <Button
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                onClick={() => navigate(`/vehicles/${vehicle.id}`)}
              >
                Lihat Detail
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
