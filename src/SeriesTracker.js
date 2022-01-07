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
      this.numberOfWatched +=1;
      if(!this.lastSerie){
        this.lastSerie = serie;
      }

      const newFinishedDate = Date.parse(serie.finishedDate);
      const finishedDateOfLastSerie = Date.parse(this.lastSerie.finishedDate);
      if(newFinishedDate > finishedDateOfLastSerie){
        this.lastSerie = serie;
      } 



    } else {
      // If a serie hasn't been watched:
      // Check if serie has "isCurrent" prop
      // Check if we have a "currentSerie" property. Set if we don't.
      // Check if we have a "nextSerie" property as well - if we didn't
      // set the .currentSerie property, set the .nextSerie property.
      if(serie.hasOwnProperty("isCurrent")){
        this.currentSerie = serie;
      }else if (!this.nextSerie){
        this.nextSerie = serie;
      }
      this.numberOfUnWatched += 1;

    }

    //it should also update the number of series marked as watched / unwatched:
    //"numberOfWatched" and "numberOfUnWatched"
  };

  //check to see if we have series to process
  if (series.length > 0) {
    //Loop through all of the series in the "series" argument
    //Use the .add function to handle adding series, so we keep counts updated.
    series.forEach((item)=> this.add(item));
  }

  this.finishSerie = function () {
    // find and update currently watching serie in "this.series" array
    // update "lastSerie" with the finished one
    // set "currentSerie" with the next one
    // set new nextSerie value with the next one which has not been watched.
    // update "numberOfWatched" and "numberOfUnWatched" props

    const currWatchingSerie = this.series.find(serie =>serie.id == this.currentSerie.id);

    delete currWatchingSerie.isCurrent;
    const today = new Date().toLocaleDateString("tr-TR");
    currWatchingSerie.isWatched = true;
    currWatchingSerie.finishedDate = today;

    this.lastSerie = this.currentSerie;
    this.currentSerie = this.nextSerie;

    const currIndex = this.series.findIndex(
      (serie) => serie.id ===this.currentSerie.id
    );

    this.series[currIndex].isCurrent = true;
    const nextIndex = this.series.findIndex(serie => !serie.isWatched && !serie.isCurrent);

    this.nextSerie = this.series[nextIndex];

    this.numberOfWatched += 1;
    this.numberOfUnWatched -=1;

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
