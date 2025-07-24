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
    <div className="space-y-6">
      {/* Filter & Sort */}
      <Card className="p-5 rounded-2xl bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {/* Filter */}
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Filter by Status</h3>
            <div className="flex gap-2 flex-wrap">
              {['all', 'ACTIVE', 'INACTIVE'].map(status => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  className={`capitalize text-sm px-4 py-1.5 rounded-md transition-all duration-200 ${
                    statusFilter === status
                      ? status === 'ACTIVE'
                        ? 'bg-green-500 hover:bg-green-600 text-white'
                        : status === 'INACTIVE'
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex gap-2 items-center">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Sort By</h3>
            <Button
              variant={sortBy === 'name' ? 'default' : 'outline'}
              className={`text-sm px-4 py-1.5 rounded-md ${
                sortBy === 'name'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setSortBy('name')}
            >
              Name
            </Button>
            <Button
              variant={sortBy === 'speed' ? 'default' : 'outline'}
              className={`text-sm px-4 py-1.5 rounded-md ${
                sortBy === 'speed'
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              onClick={() => setSortBy('speed')}
            >
              Speed
            </Button>
          </div>
        </div>
      </Card>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-500 text-center py-4 bg-red-100 dark:bg-red-900 rounded-lg">{error}</div>
      )}

      {/* Empty */}
      {!loading && !error && filteredVehicles.length === 0 && (
        <div className="text-gray-500 text-center py-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          No vehicles found
        </div>
      )}

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVehicles.map((vehicle, index) => (
          <Card
            key={vehicle.id}
            className="rounded-2xl bg-white/30 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-2xl transition-transform duration-300 hover:scale-[1.015] animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-blue-300">
                {vehicle.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <p className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <Badge
                  variant="outline"
                  className={`text-white text-xs px-2 py-1 rounded-md ${
                    vehicle.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {vehicle.status}
                </Badge>
              </p>
              <p>
                Speed: <span className="font-semibold">{vehicle.speed} km/h</span>
              </p>
              <p>
                Updated: <span className="font-medium">{new Date(vehicle.updated_at).toLocaleString()}</span>
              </p>
              <Button
                className="w-full mt-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-all duration-300"
                onClick={() => navigate(`/vehicles/${vehicle.id}`)}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VehicleList;
