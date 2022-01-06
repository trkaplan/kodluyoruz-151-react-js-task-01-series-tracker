import {
	fancyLogSeriesReport
} from "./utils.js";

export function SeriesTracker(series) {
	this.numberOfWatched = 0;
	this.numberOfUnWatched = 0;
	this.series = [];
	this.lastSerie = undefined;
	this.currentSerie = undefined;
	this.nextSerie = undefined;

	this.add = function(serie) {
		this.series.push(serie);
		if (serie.isWatched) {
			this.numberOfWatched += 1
			if (this.lastSerie == undefined) {
				this.lastSerie = serie
			}
			if (this.lastSerie.finishedDate < serie.finishedDate) {
				this.lastSerie = serie
			}
		} else {
			if ('isCurrent' in serie) {
				if (this.currentSerie == undefined) {
					this.currentSerie = serie
				};
			} else {
				if (this.nextSerie == undefined) {
					this.nextSerie = serie
				}
			}
		}
		this.numberOfUnWatched = this.series.length - this.numberOfWatched
	};
	if (series.length > 0) {
		for (let serie of series) {
			this.add(serie)
		}

	}

	this.finishSerie = function() {
		for (let serie of this.series) {
			if (serie == this.currentSerie) {
				delete serie.isCurrent
				serie.isWatched = true
				let today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth() + 1;
				var yyyy = today.getFullYear();
				if (dd < 10) {
					dd = '0' + dd;
				};

				if (mm < 10) {
					mm = '0' + mm;
				};
				let date = dd + '.' + mm + '.' + yyyy
				serie.finishedDate = date
				this.lastSerie = serie
				this.numberOfWatched++
				this.numberOfUnWatched -= 1
				this.currentSerie = Object.assign(this.nextSerie)
				break
			};


		};
		for (let serie of this.series) {
			if (!('isWatched' in serie)) {
				if (serie != this.currentSerie) {
					this.nextSerie = serie
					break
				}
			} else {
				console.log('whys')
				if (serie.id == series.length) {
					this.nextSerie = 'No new series to watch'
				}

			};

		};;




	};
	this.printSeriesReport = function() {
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