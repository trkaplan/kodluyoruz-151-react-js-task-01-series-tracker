import { fancyLogSeriesReport } from "./utils.js";

export function SeriesTracker(series) {
  this.numberOfWatched = 0;
  this.numberOfUnWatched = 0;
  this.series = [];
  this.lastSerie = undefined;
  this.currentSerie = undefined;
  this.nextSerie = undefined;

  this.add = function (serie) {
    this.series.push(serie);
 
    if (serie.isWatched) {
      this.numberOfWatched += 1;

      if (!this.lastSerie) this.lastSerie = serie;

      const newFinishedDate = Date.parse(serie.finishedDate)
      const finishedDateOfLastSerie = Date.parse(this.lastSerie.finishedDate);
      if (newFinishedDate > finishedDateOfLastSerie) this.lastSerie = serie;

    } else {

      if (serie.hasOwnProperty("isCurrent") && !this.currentSerie) {
        this.currentSerie = serie;

      } else if (!this.nextSerie) {
        this.nextSerie = serie;
      }
      this.numberOfUnWatched += 1;
    }

  };
  if (series.length > 0) {
    series.forEach((item) => this.add(item));
  }
  this.finishSerie = function () {
    const currWatchingSerie = this.series.find(serie => serie.id == this.currentSerie.id);

    delete currWatchingSerie.isCurrent;
    const today = new Date().toLocaleDateString("tr-TR");
    currWatchingSerie.isWatched = true;
    currWatchingSerie.finishedDate = today;

    this.lastSerie = this.currentSerie;
    this.currentSerie = this.nextSerie;

    const currIndex = this.series.findIndex(
      (serie) => serie.id === this.currentSerie.id
    );
    this.series[currIndex].isCurrent = true;
    const nextIndex = this.series.findIndex(serie => !serie.isWatched && !serie.isCurrent);

    this.nextSerie = this.series[nextIndex];

    this.numberOfWatched += 1;
    this.numberOfUnWatched -= 1;
  };""
  this.printSeriesReport = function () {
    fancyLogSeriesReport(this);
  };
}

// Case 1
// -------------------------------------------------

/* const mySeriesTracker = new SeriesTracker(series);
mySeriesTracker.printSeriesReport(); */

// Case 2
// -------------------------------------------------

/* const mySeriesTracker = new SeriesTracker(series);
mySeriesTracker.finishSerie();
mySeriesTracker.printSeriesReport(); */

// Case 3
// -------------------------------------------------

/* const mySeriesTracker = new SeriesTracker(series);
const newSerie = {
  id: "9",
  name: "Lost",
  genre: "Adventure",
  directorId: "4"
};
mySeriesTracker.add(newSerie);
mySeriesTracker.printSeriesReport(); */
