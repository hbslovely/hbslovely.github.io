export interface MapLocation {
  lat: number;
  lng: number;
}

export interface MapOptions {
  center: MapLocation;
  zoom: number;
}

export interface MapMarker extends MapLocation {
  title?: string;
  popup?: string;
  icon?: string;
} 