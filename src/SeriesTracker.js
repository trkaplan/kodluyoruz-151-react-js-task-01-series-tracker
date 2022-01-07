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

      if (this.lastSerie === undefined) {
        this.lastSerie = serie;
      } else {
        let lastSerieFinishedDate = this.lastSerie.finishedDate.split(".").map(Number); // tempd = [09, 09 , 2019] dd mm yyyy
        const lastSerieDate = new Date(lastSerieFinishedDate[2], lastSerieFinishedDate[1], lastSerieFinishedDate[0]);

        let serieFinishedDate = serie.finishedDate.split(".").map(Number);
        const serieDate = new Date(serieFinishedDate[2], serieFinishedDate[1], serieFinishedDate[0]);

        if (serieDate > lastSerieDate) {
          this.lastSerie = serie;
        }
      }

    } else {
      this.numberOfUnWatched+=1

      if (serie.isCurrent && this.currentSerie === undefined) {
        this.currentSerie = serie;
      }
      else if (this.nextSerie === undefined) {
        this.nextSerie = serie;
      }
    }
  };

  //check to see if we have series to process
  if (series.length > 0) {
    series.forEach(serie => { this.add(serie); })
  }

  this.finishSerie = function () {

    this.numberOfWatched += 1;
    this.numberOfUnWatched -=1;

    const currentSerie = this.series.find(serie =>serie.id === this.currentSerie.id);
    delete currentSerie.isCurrent;
    currentSerie.isWatched = true;
    currentSerie.finishedDate = new Date().getDate()

    this.lastSerie = this.currentSerie;
    this.currentSerie = this.nextSerie;

    const current = this.series.findIndex( (serie) => serie.id === this.currentSerie.id );
    this.series[current].isCurrent = true;
    const nextIndex = this.series.findIndex(serie => !serie.isWatched && !serie.isCurrent);
    this.nextSerie = this.series[nextIndex];
  };

  this.printSeriesReport = function () {
    fancyLogSeriesReport(this);
  };
}
