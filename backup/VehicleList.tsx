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

  // Filter dan sort kendaraan
  const filteredVehicles = vehicles
    .filter((vehicle) => statusFilter === 'all' || vehicle.status === statusFilter)
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'speed') return b.speed - a.speed;
      return 0;
    });

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Filter Status</h3>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                className={`${
                  statusFilter === 'all' ? 'bg-blue-500 hover:bg-blue-600' : 'border-blue-300 hover:bg-blue-50'
                } transition-colors duration-200 animate-in fade-in`}
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'ACTIVE' ? 'default' : 'outline'}
                className={`${
                  statusFilter === 'ACTIVE' ? 'bg-green-500 hover:bg-green-600' : 'border-blue-300 hover:bg-blue-50'
                } transition-colors duration-200 animate-in fade-in`}
                onClick={() => setStatusFilter('ACTIVE')}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === 'INACTIVE' ? 'default' : 'outline'}
                className={`${
                  statusFilter === 'INACTIVE' ? 'bg-red-500 hover:bg-red-600' : 'border-blue-300 hover:bg-blue-50'
                } transition-colors duration-200 animate-in fade-in`}
                onClick={() => setStatusFilter('INACTIVE')}
              >
                Inactive
              </Button>
            </div>
          </div>
          <div className="flex gap-2">
            <h3 className="text-sm font-semibold text-gray-700 mr-2 self-center">Sort By</h3>
            <Button
              variant={sortBy === 'name' ? 'default' : 'outline'}
              className={sortBy === 'name' ? 'bg-blue-500 hover:bg-blue-600' : 'border-blue-300 hover:bg-blue-50'}
              onClick={() => setSortBy('name')}
            >
              Name
            </Button>
            <Button
              variant={sortBy === 'speed' ? 'default' : 'outline'}
              className={sortBy === 'speed' ? 'bg-blue-500 hover:bg-blue-600' : 'border-blue-300 hover:bg-blue-50'}
              onClick={() => setSortBy('speed')}
            >
              Speed
            </Button>
          </div>
        </div>
      </div>
      {loading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center py-4 bg-red-50 rounded-lg">{error}</div>
      )}
      {!loading && !error && filteredVehicles.length === 0 && (
        <div className="text-gray-500 text-center py-4 bg-gray-50 rounded-lg">No vehicles found</div>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVehicles.map((vehicle, index) => (
          <Card
            key={vehicle.id}
            className="hover:shadow-xl transition-shadow duration-300 animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-blue-800">{vehicle.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm flex items-center gap-2">
                <span>Status:</span>
                <Badge
                  variant={vehicle.status === 'ACTIVE' ? 'default' : 'destructive'}
                  className={vehicle.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-500'}
                >
                  {vehicle.status}
                </Badge>
              </p>
              <p className="text-sm text-gray-600">Speed: {vehicle.speed} km/h</p>
              <p className="text-sm text-gray-600">Updated: {new Date(vehicle.updated_at).toLocaleString()}</p>
              <Button
                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
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