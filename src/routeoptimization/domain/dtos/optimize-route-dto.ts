export type Coordinates = {
  lat: string;
  long: string;
};

export type OptimizeRouteDTO = {
  originCoordinates: Coordinates;
  finishCoordinates: Coordinates;
  shippingsToOptimize: string[];
};
