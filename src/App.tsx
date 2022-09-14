import { FC, useEffect, useState } from "react";
import "./App.scss";
import { EventList } from "./components/EventList/EventList";
import { Filter, FilterParams, FilterType } from "./components/Filter/Filter";
import { Event } from "./services/event/event.model";
import { EventService } from "./services/event/event.service";
import { cloneDeep } from "lodash";

export const App: FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    EventService.getConcert()
      .then((res) => {
        setEvents(res.data);
        setFilteredEvents(res.data);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filter = (params: FilterParams) => {
    const { city, type, price } = params;

    const noFilterApplied = !city && !price;

    if (noFilterApplied) {
      setFilteredEvents(events);
      return;
    }

    const priceNum = price ? parseInt(price) : 0;
    const newFilteredEvents = events?.filter((event) => {
      const isCityMatched =
        city &&
        event.city.toLocaleLowerCase().indexOf(city.toLocaleLowerCase()) !== -1;
      const isPriceMatched = price && event.price <= priceNum;

      if (type === FilterType.OR && (isCityMatched || isPriceMatched)) {
        return true;
      }
      if (type === FilterType.AND && isCityMatched && isPriceMatched) {
        return true;
      }

      return false;
    });

    setFilteredEvents(cloneDeep(newFilteredEvents));
  };

  return (
    <div className="container">
      <Filter onLoad={filter} />
      <EventList events={filteredEvents} />
      {loading && <div className="loading">Fetching events...</div>}
    </div>
  );
};
