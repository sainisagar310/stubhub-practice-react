import { FC, FormEvent, useState } from "react";
import "./Filter.scss";

export enum FilterType {
  OR = "OR",
  AND = "AND",
}

export interface FilterParams {
  city?: string;
  type: FilterType;
  price?: string | null;
}

interface FilterProps {
  onLoad: (params: FilterParams) => void;
}

export const Filter: FC<FilterProps> = (props) => {
  const { onLoad } = props;

  const [city, setCity] = useState<string | undefined>("");
  const [type, setType] = useState<FilterType>(FilterType.OR);
  const [price, setPrice] = useState<string | undefined>("");

  const load = (event: FormEvent) => {
    event.preventDefault();
    onLoad({ city, type, price });
  };

  return (
    <form className="filter" onSubmit={load}>
      <div className="filter__item">
        <label className="filter__label">City</label>
        <input
          className="filter__control"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="filter__item">
        <label className="filter__label">Type</label>
        <select
          className="filter__control"
          value={type}
          onChange={(e) => setType(e.target.value as any as FilterType)}
        >
          <option value={FilterType.OR}>OR</option>
          <option value={FilterType.AND}>AND</option>
        </select>
      </div>
      <div className="filter__item">
        <label className="filter__label">Price (&lt;=)</label>
        <input
          name="price"
          className="filter__control"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required={true}
        />
      </div>
      <div className="filter__item">
        <label className="filter__label">&nbsp;</label>
        <button className="filter__button" onClick={load}>
          Load
        </button>
      </div>
    </form>
  );
};
