import { SeriesTracker } from "./SeriesTracker.js";
import { series } from "./data.js";

const mySeriesTracker = new SeriesTracker(series);
mySeriesTracker.finishSerie();

mySeriesTracker.printSeriesReport();
