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

    if ( serie.isWatched  ) {
      
        // Update the count of watched series: "numberOfWatched"
        this.numberOfWatched ++;

      // Check for "lastSerie" property, set if we don't.  
        if(typeof this.lastSerie == "undefined"){
          this.lastSerie = serie;
        }

      // Check for "lastSerie"'s finishedDate, if the serie's "finishedDate" prop is greater,
      // set "lastSerie" prop to "serie" object.
        const lastSerieFinishedDate = Date.parse(this.lastSerie.finishedDate);
        const serieFinishedDate = Date.parse(serie.finishedDate);
        if(serieFinishedDate > lastSerieFinishedDate  ){
          this.lastSerie = serie;
        }

      } 
        // If a serie hasn't been watched:
      else {

        // Check if serie has "isCurrent" prop
        // Check if we have a "currentSerie" property. Set if we don't.
        if(serie.isCurrent){
          if(typeof this.currentSerie == "undefined"){
            this.currentSerie = serie;
          }
        
        // Check if we have a "nextSerie" property as well - if we didn't
        // set the .currentSerie property, set the .nextSerie property.
        
          if(typeof this.nextSerie == "undefined"){
              this.currentSerie = serie;    
              
              const nextIndex = series.indexOf(this.currentSerie) + 1;
              /* check if next index exists */
              if(  nextIndex < series.length  ){
                  this.nextSerie = series[nextIndex];
              }
              else{
                this.nextSerie = serie;
              }
          }
        
      }
      /* increment unWatched series count */
      this.numberOfUnWatched ++;        

    }
  };


    //check to see if we have series to process
    if (series.length > 0) {

      //Loop through all of the series in the "series" argument
      //Use the .add function to handle adding series, so we keep counts updated.
      for( const currentSerie of series){
        this.add(currentSerie);
      }

    }
  

  this.finishSerie = function () {
    
    // find and update currently watching serie in "this.series" array
    for(var serie of this.series ){
      if(serie == this.currentSerie){
        serie.isWatched = true;
        /*  if currentSerie has a isCurrent property delete it,
            if it does not have that property do nothing, null check */
        
                
        if(serie.isCurrent){
          delete serie.isCurrent;
        }

        /* set currenttime as finishedDate to finished serie */
        const todaysDate = new Date().toLocaleDateString("tr-TR");
        serie.finishedDate = todaysDate;

        // update "lastSerie" with the finished one
        this.lastSerie = serie;

        // set "currentSerie" with the next one        
        this.currentSerie = this.nextSerie;
        series[series.indexOf(this.currentSerie)].isCurrent = true;

        // set new nextSerie value with the next one which has not been watched.
        for(const potentialNextSerie of this.series){
          if( !potentialNextSerie.isWatched && !potentialNextSerie.isCurrent ){
            this.nextSerie = potentialNextSerie;
            break;  
          }
        }

        // update "numberOfWatched" and "numberOfUnWatched" props
        this.numberOfWatched++;
        this.numberOfUnWatched--;
        break;
      }
    }
  };

  this.printSeriesReport = function () {
    fancyLogSeriesReport(this);
  };
}


// Case 1
// -------------------------------------------------
// import { series } from "./data.js";

//  const mySeriesTracker = new SeriesTracker(series);
// console.log(mySeriesTracker);
 //mySeriesTracker.printSeriesReport(); 

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

