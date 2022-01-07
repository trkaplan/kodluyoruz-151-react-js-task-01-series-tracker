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
      }else{
        
        let tempD = this.lastSerie.finishedDate.split("."); // tempd = [09, 09 , 2019] dd mm yyyy
        [tempD[0], tempD[2]] = [tempD[2], tempD[0]]; // yyyy/mm/dd mm/dd/yyyy
        let lastFDate = new Date(tempD);

        tempD = serie.finishedDate.split("."); // tempd = [09, 09 , 2019] dd mm yyyy
        [tempD[0], tempD[2]] = [tempD[2], tempD[0]]; // yyyy/mm/dd mm/dd/yyyy
        let serieFDate = new Date(tempD);
        
        if (serieFDate > lastFDate) {
          this.lastSerie = serie;
        }
      }
      

    } else {
      this.numberOfUnWatched+=1
      
      if (serie.isCurrent) {
        if (this.currentSerie === undefined) {
          this.currentSerie = serie;
        }
      }
      else if (this.nextSerie === undefined) {
        this.nextSerie = serie;
      }
      
    }

  };

  //check to see if we have series to process
  if (series.length > 0) {
    
    series.forEach(s =>  this.add(s) );
  }

  this.finishSerie = function () {
   
    let curS = this.series.find(s => s.isCurrent);
    delete curS.isCurrent;
    curS.isWatched = true;
    curS.finishedDate = new Date().toLocaleDateString("tr-TR"); // System date to Tr format dd/mm/yyyy
    this.lastSerie = this.currentSerie;
    this.currentSerie = this.nextSerie;
    this.currentSerie.isCurrent = true;
    this.nextSerie = this.series.find( s => !s.isWatched && !s.isCurrent);
    this.numberOfUnWatched-=1;
    this.numberOfWatched+=1;
    
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
