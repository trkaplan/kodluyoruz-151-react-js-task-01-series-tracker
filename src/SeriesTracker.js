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
    //(If a serie has been watched) {
    // Update the count of watched series: "numberOfWatched"
    // Check for "lastSerie" property, set if we don't.
    // Check for "lastSerie"'s finishedDate, if the serie's "finishedDate" prop is greater,
    // set "lastSerie" prop to "serie" object.
    //}
    if (serie.isWatched) {
        this.numberOfWatched += 1;
        if (this.lastSerie === undefined) {
            this.lastSerie = serie;
        } else {
            if (serie.finisDate != undefined) {
                if (this.lastSerie.finishDate != undefined) {
                    if (serie.finishDate > this.lastSerie.finishDate) {
                        this.lastSerie = serie;
                    }
                }
            }
          }
    } else {
      // If a serie hasn't been watched:
      // Check if serie has "isCurrent" prop
      // Check if we have a "currentSerie" property. Set if we don't.
      // Check if we have a "nextSerie" property as well - if we didn't
      // set the .currentSerie property, set the .nextSerie property.
      if (serie.isCurrent != undefined) {
        if (this.currentSerie === undefined){
            this.currentSerie = serie;
        }
        if (this.nextSerie === undefined) {
            this.currentSerie = serie;
            var index_current = = this.series.indexOf(this.currentSerie);
            if (index < this.series.length){
                this.nextSerie = this.series[index_current+1];
            }
        }
      }
    }
    //it should also update the number of series marked as watched / unwatched:
    //"numberOfWatched" and "numberOfUnWatched"
    this.numberOfUnWatched = series.length - this.numberOfWatched;
  };

  //check to see if we have series to process
  if (series.length > 0) {
    //Loop through all of the series in the "series" argument
    //Use the .add function to handle adding series, so we keep counts updated.
    for (var i = 0; i < series.length; i++) {
        this.add(series[i]);
    }
  }

  this.finishSerie = function () {
    // find and update currently watching serie in "this.series" array
    // update "lastSerie" with the finished one
    // set "currentSerie" with the next one
    // set new nextSerie value with the next one which has not been watched.
    // update "numberOfWatched" and "numberOfUnWatched" props
    var index_currentSerie = this.series.indexOf(this.currentSerie);
    this.series[index_currentSerie].isWatched = true;
    this.lastSerie = this.currentSerie;
    if (index < this.series.length) {
        this.currentSerie = this.series[index_currentSerie+1];
    } else {
        this.currentSerie = undefined;
    }
    var unWatched = this.series.filter( function(series){return (series.isWatched==false);} );
    if (unWatched[0] != undefined) {
        this.nextSerie = unWatched[0];
    } else {
        this.nextSerie = undefined;
    }
    this.numberOfWatched += 1;
    this.numberOfUnWatched = this.series.length - this.numberOfWatched;

  };
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
