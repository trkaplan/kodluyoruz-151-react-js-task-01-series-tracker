import { SeriesTracker } from "./SeriesTracker.js";
import { series } from "./data.js";

const mySeriesTracker = new SeriesTracker(series);
const newSerie = {
  id: "9",
  name: "Lost",
  genre: "Adventure",
  directorId: "4",
};
mySeriesTracker.add(newSerie);

mySeriesTracker.printSeriesReport();
