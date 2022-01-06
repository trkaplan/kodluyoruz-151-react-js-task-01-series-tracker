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
      // Check if we have a "currentSerie" property. Set if we don't
      if (serie.hasOwnProperty("isCurrent") && !this.currentSerie) {
        this.currentSerie = serie;

      // Check if we have a "nextSerie" property as well - if we didn't
      } else if (!this.nextSerie) {
        this.nextSerie = serie;
      }
      this.numberOfUnWatched += 1;
    }
  };

  //check to see if we have series to process
  if (series.length > 0) {
    series.forEach((item) => this.add(item));
  }

  this.finishSerie = function () {
    // find and update currently watching serie in "this.series" array
    const currWatchingSerie = this.series.find(serie => serie.id == this.currentSerie.id);

    delete currWatchingSerie.isCurrent;
    const today = new Date().toLocaleDateString("tr-TR");
    currWatchingSerie.isWatched = true;
    currWatchingSerie.finishedDate = today;

    // update "lastSerie" with the finished one
    this.lastSerie = this.currentSerie;
    // set "currentSerie" with the next one
    this.currentSerie = this.nextSerie;

    const currIndex = this.series.findIndex(
      (serie) => serie.id === this.currentSerie.id
    );
    this.series[currIndex].isCurrent = true;

    // set new nextSerie value with the next one which has not been watched.
    const nextIndex = this.series.findIndex(serie => !serie.isWatched && !serie.isCurrent);

    this.nextSerie = this.series[nextIndex];

    // update "numberOfWatched" and "numberOfUnWatched" props
    this.numberOfWatched += 1;
    this.numberOfUnWatched -= 1;
  };
  this.printSeriesReport = function () {
    fancyLogSeriesReport(this);
  };
}
