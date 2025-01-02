export type Jobs = {
  id: number;
  description?: string;
  location?: [number, number]; // [lon, lat]
  location_index?: number;
  setup?: number; // defaults to 0
  service?: number; // defaults to 0
  delivery?: number[];
  pickup?: number[];
  amount: number[];
  skills?: number[];
  priority?: number; // 0-100, defaults to 0
  time_windows?: TimeWindow[];
};

export type Shipments = {
  pickup: Shipments;
  delivery: Step;
  amount?: number[];
  skills?: number[];
  priority?: number; // 0-100, defaults to 0
};

export type Vehicles = {
  id: number;
  profile?: string; // defaults to 'car'
  description?: string;
  start?: [number, number]; // [lon, lat]
  start_index?: number;
  end?: [number, number]; // [lon, lat]
  end_index?: number;
  capacity?: number[];
  costs?: Cost;
  skills?: number[];
  time_window?: TimeWindow;
  breaks?: Break[];
  speed_factor?: number; // 0-5, defaults to 1.0
  max_tasks?: number;
  max_travel_time?: number;
  max_distance?: number;
  steps?: VehicleStep[];
};

export type OptimizationRequest = {
  vehicles: Vehicles[];
  jobs: Jobs[];
  shipments?: Shipments[];
  matrices?: Matrices;
  options?: Options;
};

export type Matrices = {
  durations?: number[][];
  distances?: number[][];
  costs?: number[][];
};

export type Options = {
  max_iterations?: number;
  time_limit?: number; // in seconds
};

export type Cost = {
  fixed?: number; // defaults to 0
  per_hour?: number; // defaults to 3600
  per_km?: number; // defaults to 0
};

export type Break = {
  id: number;
  time_windows?: TimeWindow[];
  service?: number; // defaults to 0
  description?: string;
  max_load?: number[];
};

export type VehicleStep = {
  type: 'start' | 'job' | 'pickup' | 'delivery' | 'break' | 'end';
  id?: number;
  service_at?: number;
  service_after?: number;
  service_before?: number;
};

export type Step = {
  type: 'start' | 'job' | 'pickup' | 'delivery' | 'break' | 'end';
  arrival: number; // in seconds
  duration: number; // in seconds
  setup: number; // in seconds
  service: number; // in seconds
  waiting_time: number; // in seconds
  violations: Violation[];
  description?: string;
  location?: [number, number]; // [lon, lat]
  location_index?: number;
  id?: number;
  load?: number[];
  distance?: number; // in meters
};

export type TimeWindow = number[];

export type Violation = {
  cause: string;
  duration?: number; // in seconds
};

export interface OrsApiResponse {
  code: number;
  routes: Route[];
  summary: Summary;
  unassigned: any[];
}

export interface Route {
  amount: number[];
  cost: number;
  delivery: number[];
  duration: number;
  pickup: number[];
  priority: number;
  service: number;
  setup: number;
  steps: RouteStep[];
  vehicle: number;
  violations: any[];
  waiting_time: number;
}

export interface RouteStep {
  arrival: number;
  duration: number;
  load: number[];
  location: number[];
  service: number;
  setup: number;
  type: string;
  violations: any[];
  waiting_time: number;
  description?: string;
  id?: number;
  job?: number;
}

export interface Summary {
  amount: number[];
  computing_times: ComputingTimes;
  cost: number;
  delivery: number[];
  duration: number;
  pickup: number[];
  priority: number;
  routes: number;
  service: number;
  setup: number;
  unassigned: number;
  violations: any[];
  waiting_time: number;
}

export interface ComputingTimes {
  loading: number;
  routing: number;
  solving: number;
}
