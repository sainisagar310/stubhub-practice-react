export interface Concert {
  id: number;
  name: string;
  events: Event[];
  children: Concert[];
}

export interface Event {
  id: number;
  name: string;
  venueName: string;
  city: string;
  price: number;
  distanceFromVenue: number;
  date: string;
}
