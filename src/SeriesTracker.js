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
      // Update the count of watched series: "numberOfWatched"
      this.numberOfWatched++;

      // Check for "lastSerie" property, set if we don't.
      if (!this.lastSerie) {
        this.lastSerie = serie;
      }

      // Check for "lastSerie"'s finishedDate, if the serie's "finishedDate" prop is greater, set "lastSerie" prop to "serie" object.
      const finishedDateOfNewSerie = Date.parse(serie.finishedDate);
      const finishedDateOfLastSerie = Date.parse(this.lastSerie.finishedDate);
      if (finishedDateOfNewSerie > finishedDateOfLastSerie) {
        this.lastSerie = serie;
      }
    } else {
      // If a serie hasn't been watched:
      // Check if serie has "isCurrent" prop
      // Check if we have a "currentSerie" property. Set if we don't.
      if (serie.hasOwnProperty("isCurrent")) {
        if (!this.currentSerie) {
          this.currentSerie = serie;
        }
        // Check if we have a "nextSerie" property as well - if we didn't
        // set the .currentSerie property, set the .nextSerie property.
      } else if (!this.nextSerie) {
        this.nextSerie = serie;
      }
    }

    //it should also update the number of series marked as watched / unwatched:
    //"numberOfWatched" and "numberOfUnWatched"
    this.numberOfUnWatched = this.series.length - this.numberOfWatched;
  };

  //check to see if we have series to process
  if (series.length > 0) {
    //Loop through all of the series in the "series" argument
    //Use the .add function to handle adding series, so we keep counts updated.
    series.forEach((serie) => this.add(serie));
  }

  this.finishSerie = function () {
    // find and update currently watching serie in "this.series" array
    const currentlyWatching = this.series.find(
      (serie) => serie.id === this.currentSerie.id
    );
    delete currentlyWatching.currentSerie;
    currentlyWatching.isWatched = true;
    currentlyWatching.finishedDate = new Date();

    // update "lastSerie" with the finished one
    this.lastSerie = currentlyWatching;

    // set "currentSerie" with the next one
    this.currentSerie = this.nextSerie;
    const currWatch = this.series.find(
      (serie) => serie.id === this.currentSerie.id
    );
    currWatch.isCurrent = true;

    // set new nextSerie value with the next one which has not been watched.
    this.nextSerie = this.series.find(
      (serie) => !serie.isWatched && !serie.isCurrent
    );

    // update "numberOfWatched" and "numberOfUnWatched" props
    this.numberOfWatched++;
    this.numberOfUnWatched--;
  };
  this.printSeriesReport = function () {
    fancyLogSeriesReport(this);
  };
}

// Case 1
// -------------------------------------------------
/*
const mySeriesTracker = new SeriesTracker(series);
mySeriesTracker.printSeriesReport();
*/
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
