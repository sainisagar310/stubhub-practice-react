import axios, { AxiosResponse } from "axios";
import { Concert, Event } from "./event.model";

export const EventService = {
  getConcert: (): Promise<AxiosResponse<Event[]>> => {
    return axios.get("/events.json").then((res) => {
      const events: Event[] = [];
      const data = res.data as Concert;
      flatEvents(data.children, events);
      res.data = events;
      return res;
    });
  },
};

const flatEvents = (concerts: Concert[], events: Event[]) => {
  concerts.forEach((concert) => {
    events.push(...concert.events);
    if (concert.children.length) {
      return flatEvents(concert.children, events);
    }
  });
};
