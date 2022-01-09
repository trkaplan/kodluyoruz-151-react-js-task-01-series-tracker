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
      //(If a serie has been watched) {
      // Update the count of watched series: "numberOfWatched"
      this.numberOfWatched += 1;
      // Check for "lastSerie" property, set if we don't.
      this.lastSerie ? {} : this.lastSerie = serie;
      // Check for "lastSerie"'s finishedDate, if the serie's "finishedDate" prop is greater,
      // set "lastSerie" prop to "serie" object.
      const pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
      const parser = (dateString) => new Date(dateString.replace(pattern,'$3-$2-$1'));
      parser(this.lastSerie.finishedDate) < parser(serie.finishedDate) ? this.lastSerie = serie : {};
      
    //}

    } else {
      // If a serie hasn't been watched:
      // Check if serie has "isCurrent" prop
        // Check if we have a "currentSerie" property. Set if we don't.
          if (serie.isCurrent && !this.currentSerie) {
            this.currentSerie = serie;           
          } 
          
          // Check if we have a "nextSerie" property as well - if we didn't
          // set the .currentSerie property, set the .nextSerie property.
          else if (!this.nextSerie) {
            this.nextSerie = serie;
          };   
          //it should also update the number of series marked as watched / unwatched:
          //"numberOfWatched" and "numberOfUnWatched"
          this.numberOfUnWatched++;
    };
    
  };

  //check to see if we have series to process
  if (series.length > 0) {
    //Loop through all of the series in the "series" argument
    for (let s of series) {
    //Use the .add function to handle adding series, so we keep counts updated.
    this.add(s)
    }

  }

  this.finishSerie = function () {
    // find and update currently watching serie in "this.series" array  
    const today = new Date().toLocaleDateString("tr-TR");
    
    let s = this.series.find(serie => serie.name == this.currentSerie.name)
    s.isCurrent = false;
    s.isWatched = true;
    s.finishedDate = today;
    
    // update "lastSerie" with the finished one
    this.lastSerie = this.currentSerie;
    
    // set "currentSerie" with the next one
    this.currentSerie = this.nextSerie;

    const curIndex = this.series.findIndex( (serie) => (serie.id === this.currentSerie.id) );
    this.series[curIndex].isCurrent = true;
    
    // set new nextSerie value with the next one which has not been watched.
    let nextIndex = this.series.findIndex((serie) => (!serie.isWatched && !serie.isCurrent));
    this.nextSerie = this.series[nextIndex]

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
