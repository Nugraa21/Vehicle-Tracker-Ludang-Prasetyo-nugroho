import { create } from 'zustand';
import { toast } from 'sonner'; // Impor toast dari sonner, bukan @/components/ui/sonner

interface Vehicle {
  id: number;
  name: string;
  status: string;
  speed: number;
  updated_at: string;
}

interface VehicleDetail {
  vehicleId: number;
  odometer: number;
  fuel_level: number;
  timestamp: string;
  latitude: number;
  longitude: number;
  speed: number;
}

interface VehicleState {
  vehicles: Vehicle[];
  selectedVehicle: VehicleDetail | null;
  loading: boolean;
  error: string | null;
  fetchVehicles: () => Promise<void>;
  fetchVehicleDetail: (id: number) => Promise<void>;
}

// Mock data untuk pengujian
const mockVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Toyota Avanza",
    status: "ACTIVE",
    speed: 60,
    updated_at: "2025-07-23T10:00:00Z",
  },
  {
    id: 2,
    name: "Honda Civic",
    status: "INACTIVE",
    speed: 0,
    updated_at: "2025-07-23T09:30:00Z",
  },
    {
    id: 3,
    name: "BMW E36",
    status: "INACTIVE",
    speed: 0,
    updated_at: "2025-07-23T09:30:00Z",
  },
];

const mockVehicleDetails: VehicleDetail[] = [
  {
    vehicleId: 1,
    odometer: 123456.78,
    fuel_level: 70.2,
    timestamp: "2025-07-23T10:00:00Z",
    latitude: -6.12,
    longitude: 106.85,
    speed: 60,
  },
  {
    vehicleId: 2,
    odometer: 98765.43,
    fuel_level: 20.5,
    timestamp: "2025-07-23T09:30:00Z",
    latitude: -6.15,
    longitude: 106.90,
    speed: 0,
  },
    {
    vehicleId: 3,
    odometer: 98765.43,
    fuel_level: 20.5,
    timestamp: "2025-07-23T09:30:00Z",
    latitude: -6.15,
    longitude: 106.90,
    speed: 0,
  },
];

export const useVehicleStore = create<VehicleState>((set: (state: Partial<VehicleState> | ((state: VehicleState) => Partial<VehicleState>)) => void) => ({
  vehicles: [],
  selectedVehicle: null,
  loading: false,
  error: null,
  fetchVehicles: async () => {
    set({ loading: true, error: null });
    try {
      // Simulasi panggilan API dengan delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      set({ vehicles: mockVehicles, loading: false });
    } catch (error) {
      const message = 'Failed to fetch vehicles';
      set({ error: message, loading: false });
      toast.error(message);
    }
  },
  fetchVehicleDetail: async (id: number) => {
    set({ loading: true, error: null });
    try {
      // Simulasi panggilan API dengan delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const vehicle = mockVehicleDetails.find((v) => v.vehicleId === id);
      if (!vehicle) throw new Error('Vehicle not found');
      set({ selectedVehicle: vehicle, loading: false });
    } catch (error) {
      const message = 'Failed to fetch vehicle details';
      set({ error: message, loading: false });
      toast.error(message);
    }
  },
}));