export const ROUTE_STOPS = [
  {
    id: "kul",
    label: "KUL",
    name: "Kuala Lumpur International Airport",
    note: "Depart for Cam Ranh on 1 Aug 2026.",
    query: "Kuala Lumpur International Airport",
    lat: 2.7456,
    lng: 101.7099,
    onMap: false
  },
  {
    id: "cxr",
    label: "CXR",
    name: "Cam Ranh International Airport",
    note: "Arrival at 11:00, then transfer to Nha Trang.",
    query: "Cam Ranh International Airport, Vietnam",
    lat: 11.9982,
    lng: 109.2191,
    onMap: true
  },
  {
    id: "nha-trang",
    label: "Nha Trang",
    name: "Nha Trang",
    note: "Day 1 mud bath; Day 2 Vinpearl cable car + VinWonders.",
    query: "Nha Trang, Vietnam",
    lat: 12.265,
    lng: 109.189,
    onMap: true
  },
  {
    id: "da-lat",
    label: "Da Lat",
    name: "Da Lat",
    note: "Market, Datanla waterfall, Crazy House, Lumiere light gardens.",
    query: "Da Lat, Vietnam",
    lat: 11.9404,
    lng: 108.4583,
    onMap: true
  },
  {
    id: "hoi-an",
    label: "Hoi An",
    name: "Hoi An",
    note: "Relaxed heritage day after the sleeper bus from Da Lat.",
    query: "Hoi An, Vietnam",
    lat: 15.877,
    lng: 108.328,
    onMap: true
  },
  {
    id: "da-nang",
    label: "Da Nang",
    name: "Da Nang",
    note: "Full day on 7 Aug; breakfast and airport on 8 Aug.",
    query: "Da Nang, Vietnam",
    lat: 16.047,
    lng: 108.206,
    onMap: true
  },
  {
    id: "dad",
    label: "DAD",
    name: "Da Nang International Airport",
    note: "Fly home on 8 Aug — leave a 2-hour buffer.",
    query: "Da Nang International Airport, Vietnam",
    lat: 16.0544,
    lng: 108.1994,
    onMap: true
  }
];

export const MAP_STOPS = ROUTE_STOPS.filter((stop) => stop.onMap);

export const ROUTE_LINE = MAP_STOPS.map((stop) => [stop.lat, stop.lng]);
