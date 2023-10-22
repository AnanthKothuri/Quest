export type Place = {
  place_id: string;
  current_opening_hours: string;
  formatted_address: string;
  formatted_phone_number: string;
  geometry: {
    location: LatLng;
    viewport: {northeast: LatLng; southwest: LatLng};
  };
  name: string;
  photos: string;
  rating: number;
  reviews: Object[];
  url: string;
  website: string;
};

type LatLng = {
  lat: number;
  lng: number;
};
