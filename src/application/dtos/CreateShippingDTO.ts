export type CreateShippingDto = {
  clientName: string;
  shippingDescription: string;
  coordinates: {
    lat: string;
    long: string;
  };
};
