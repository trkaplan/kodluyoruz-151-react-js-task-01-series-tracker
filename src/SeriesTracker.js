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
        this.numberOfWatched += 1; // Update the count of watched series: "numberOfWatched"
        if (this.lastSerie === undefined) { // Check for "lastSerie" property, set if we don't.
        this.lastSerie = serie;
        }
        const newFinishedDate = Date.parse(serie.finishedDate)
        const finishedDateOfLastSerie = Date.parse(this.lastSerie.finishedDate); // Check for "lastSerie"'s finishedDate, if the serie's "finishedDate" prop is greater,
        if (newFinishedDate > finishedDateOfLastSerie) this.lastSerie = serie; // set "lastSerie" prop to "serie" object.

    } else {
      if (serie.isCurrent != undefined) { // If a serie hasn't been watched:
        if (this.currentSerie === undefined){ // Check if serie has "isCurrent" prop
            this.currentSerie = serie; // Check if we have a "currentSerie" property. Set if we don't.
        }
        if (this.nextSerie === undefined) {
            this.currentSerie = serie; // Check if we have a "nextSerie" property as well - if we didn't
            this.nextSerie = series[series.indexOf(this.currentSerie)+1]; // set the .currentSerie property, set the .nextSerie property.
            }
        }
      this.numberOfUnWatched = series.length - this.numberOfWatched;
      }
    //it should also update the number of series marked as watched / unwatched:
    //"numberOfWatched" and "numberOfUnWatched"

  };
  if (series.length > 0) {
    //Loop through all of the series in the "series" argument
    //Use the .add function to handle adding series, so we keep counts updated.
    for (var i = 0; i < series.length; i++) {
        this.add(series[i]);
    }
  }

  this.finishSerie = function () {
    var index_currentSerie = this.series.indexOf(this.currentSerie);  // find and update currently watching serie in "this.series" array
    const today = new Date().toLocaleDateString("tr-TR");
    this.series[index_currentSerie].isWatched = true;
    delete this.series[index_currentSerie].isCurrent;
    this.series[index_currentSerie].finishDate = today;
    this.lastSerie = this.series[index_currentSerie]; // update "lastSerie" with the finished one
    this.currentSerie = this.nextSerie; // set "currentSerie" with the next one
    var index_currentSerie2 = this.series.indexOf(this.currentSerie);
    this.series[index_currentSerie2].isCurrent = true;

    var filteredObj = series.filter(function (el) {
        console.log(el);
        return el.isWatched === undefined &&
               el.isCurrent === undefined;
               //el.finishedDate > this.lastSerie.finishedDate;
        });
    this.nextSerie = filteredObj[0]; // set new nextSerie value with the next one which has not been watched.
    this.numberOfWatched += 1; // update "numberOfWatched" and "numberOfUnWatched" props
    this.numberOfUnWatched = series.length - this.numberOfWatched;
    }

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
