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

    if ("isWatched" in serie) {
      this.numberOfWatched += 1;
      // Checking "lastSerie" and setting it if doesn't exist.
      if (this.lastSerie === undefined) {
        this.lastSerie = serie;
      } else {
        // Converting from DD.MM.YYYY to MM.DD.YYYY format and comparing finishedDate of serie and "lastSerie" with Date() object for a more accurate result 
        let lastSerieArray = this.lastSerie.finishedDate.split(".");
        [lastSerieArray[0], lastSerieArray[1]] = [lastSerieArray[1], lastSerieArray[0]];
        let serieArray = serie.finishedDate.split(".");
        [serieArray[0], serieArray[1]] = [serieArray[1], serieArray[0]];
        const lastSerieTempDate = new Date(lastSerieArray);
        const serieTempDate = new Date(serieArray);
        if (serieTempDate > lastSerieTempDate) {
          this.lastSerie = serie;
        }
      }
    } else {
      this.numberOfUnWatched += 1;
      // Checking "isCurrent" property in serie and setting it to "currentSerie" if not.
      if ("isCurrent" in serie && this.currentSerie === undefined) {
        this.currentSerie = serie;
      } else if (this.nextSerie === undefined) {
        this.nextSerie = serie;
      }
    }
  };

  //check to see if we have series to process
  if (series.length > 0) {
    series.forEach(serie => {
      this.add(serie);
    })
  }

  this.finishSerie = function () {
    this.numberOfWatched += 1;
    this.numberOfUnWatched -= 1;

    // Updating "lastSerie" with the finished one and "currentSerie" with the next unwatched one
    this.lastSerie = this.currentSerie;
    this.currentSerie = this.nextSerie;

    // Getting today's date with Date object
    const date = new Date();
    const today = ("0" + date.getDate()).slice(-2) + '.' + ("0" + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();

    // Updating "lastSerie" properties
    const lastSerieIndex = this.series.findIndex((serie) => {
      return serie.id === this.lastSerie.id;
    });
    delete this.series[lastSerieIndex].isCurrent;
    this.series[lastSerieIndex].isWatched = true;
    this.series[lastSerieIndex].finishedDate = today;

    // Updating "currentSerie" properties
    const currentSerieIndex = this.series.findIndex((serie) => {
      return serie.id === this.currentSerie.id;
    });
    this.series[currentSerieIndex].isCurrent = true;

    // Updating "nextSerie" properties
    const nextSerieIndex = this.series.findIndex((serie) => {
      return !("isWatched" in serie) && !("isCurrent" in serie);
    });
    this.nextSerie = this.series[nextSerieIndex];

  };
  this.printSeriesReport = function () {
    fancyLogSeriesReport(this);
  };
}
