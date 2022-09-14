import { FC } from "react";
import { Event } from "../../services/event/event.model";
import "./EventList.scss";

interface EventListProps {
  events: Event[];
}

export const EventList: FC<EventListProps> = (props) => {
  const { events } = props;

  return (
    <div className="event-list">
      {events.map((event) => {
        const { id, city, name, price } = event;
        return (
          <div className="event" key={id}>
            <div className="event__content">
              <h3 className="event__city">{name}</h3>
              <p>{city}</p>
            </div>
            <div className="event__price">${price}</div>
          </div>
        );
      })}
    </div>
  );
};
