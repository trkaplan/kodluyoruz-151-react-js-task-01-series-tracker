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
      this.numberOfWatched++;

      if (!this.lastSerie) {
        this.lastSerie = serie;
      } else if (Date.parse(this.lastSerie.finishedDate) < Date.parse(serie.finishedDate)) {
        this.lastSerie = serie;
      }
    } else {
      // If a serie hasn't been watched:
      // Check if serie has "isCurrent" prop
      // Check if we have a "currentSerie" property. Set if we don't.
      // Check if we have a "nextSerie" property as well - if we didn't
      // set the .currentSerie property, set the .nextSerie property.
      
      if (serie.hasOwnProperty("isCurrent") && serie.isCurrent) {
        this.currentSerie = serie;
      } else if (!this.nextSerie) {
        this.nextSerie = serie;
      }

      this.numberOfUnWatched++;
    }

    //it should also update the number of series marked as watched / unwatched:
    //"numberOfWatched" and "numberOfUnWatched"
  };

  //check to see if we have series to process
  if (series.length > 0) {
    //Loop through all of the series in the "series" argument
    //Use the .add function to handle adding series, so we keep counts updated.
    for (let i = 0; i < series.length; i++) {
      this.add(series[i]);
    }
  }

  this.finishSerie = function () {
    // find and update currently watching serie in "this.series" array
    // update "lastSerie" with the finished one
    // set "currentSerie" with the next one
    // set new nextSerie value with the next one which has not been watched.
    // update "numberOfWatched" and "numberOfUnWatched" props   
    if (this.currentSerie) {
      let today = new Date(Date.now()).toLocaleString('tr-TR').split(' ')[0];

      this.lastSerie = this.currentSerie;
      this.lastSerie.isWatched = true;
      this.lastSerie.finishedDate = today;

      this.numberOfWatched++;
      this.numberOfUnWatched--;

      if (this.nextSerie) {
        this.currentSerie = this.nextSerie;
        
        if (!series[this.nextSerie.id].isWatched) {
          this.nextSerie = series[this.nextSerie.id].name;
        } else {
          for (let i = this.nextSerie.id; i < series.length; i++) {
            if (!series[i].isWatched) {
              this.nextSerie = series[i];
              break;
            }
          }
        }
        /*
        for (let i = 0; i < series.length; i++) {
          if(!series[this.nextSerie.id].isWatched) {
            this.nextSerie = series[this.nextSerie.id].name;
          } else {
            this.nextSerie = null;
          }
        }*/
      }
    }
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
