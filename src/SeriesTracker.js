import { fancyLogSeriesReport } from "./utils.js";

export function SeriesTracker(series) {
  this.numberOfWatched = 0;
  this.numberOfUnWatched = 0;
  this.series = [];
  this.lastSerie = undefined;
  this.currentSerie = undefined;
  this.nextSerie = undefined;


  this.watchedAdd = function (serie){
    this.numberOfWatched += 1
    if(typeof this.lastSerie === "undefined" ){
        this.lastSerie = serie
        return
    }
    const lastSerieDate = new Date(this.lastSerie.finishedDate)
    const addedSerieDate = new Date(serie.finishedDate)
    if(addedSerieDate > lastSerieDate){ // if addedSerieDate is greater compare func return 1
        this.lastSerie = serie
    }
  }

  this.unWatchedAdd = function (serie){
    this.numberOfUnWatched += 1
    if((serie.hasOwnProperty('isCurrent') && serie.isCurrent === true) || typeof this.currentSerie === 'undefined' ){
        this.currentSerie = serie
        return // provides that if a serie is set as currentSerie, it won't be set as nextSerie
    }
    if(typeof this.nextSerie === 'undefined'){
        this.nextSerie = serie
    }
  }

  this.add = function (serie) {
    this.series.push(serie);
    if (serie.isWatched) {
        this.watchedAdd(serie)
    } else {
        this.unWatchedAdd(serie)
    }
  };
  if (series.length > 0) {
    for(let serie of series){
        this.add(serie)
    }
  }

  this.finishSerie = function () {
    // find and update currently watching serie in "this.series" array
    for(let index = 0; index < this.series.length ; index++){
        let serie = this.series[index]
        if (serie == this.currentSerie){
            this.lastSerie = serie
            this.currentSerie = this.nextSerie
            this.currentSerie.isCurrent = true
            serie.isCurrent = false
            serie.isWatched = true
            serie.finishedDate = new Date().toLocaleDateString('tr-TR')
            this.numberOfWatched += 1
            this.numberOfUnWatched -= 1
            for (let indexNext = index + 1; indexNext < this.series.length ; indexNext ++){
                let candidateNextSerie = this.series[indexNext]
                if (!candidateNextSerie.isCurrent && (typeof candidateNextSerie.isWatched === 'undefined' || candidateNextSerie.isWatched == false)){
                    this.nextSerie = candidateNextSerie
                    break
                }
            }
            break
        }
    }
  };
  this.printSeriesReport = function () {
    fancyLogSeriesReport(this);
  };
}
