import chalk from "chalk";

const valueLabel = (val) => chalk.black.bgYellow(` ${val} `);

export const fancyLogSeriesReport = function (serieObj) {
  // NOT: Tüm objeyi bu şekilde pass etmek iyi bir pratik değil!
  const { numberOfWatched, numberOfUnWatched, series } = serieObj;
  const {
    lastSerie: { name: lastSerie }, //this.lastSerie.name
    currentSerie: { name: currentSerie }, //this.currentSerie.name
    nextSerie: { name: nextSerie }, //this.nextSerie.name
  } = serieObj;

  console.log(`
  ${chalk.yellow(
    "+------------------------------------------------------------------+"
  )}
  ${chalk.yellow("|")} Last Watched:       ${chalk.yellow("|")} ${valueLabel(
    lastSerie
  )}
  ${chalk.yellow(
    "+------------------------------------------------------------------+"
  )}
  ${chalk.yellow("|")} Currently Watching: ${chalk.yellow("|")} ${valueLabel(
    currentSerie
  )}
  ${chalk.yellow(
    "+------------------------------------------------------------------+"
  )}
  ${chalk.yellow("|")} Next TV Serie:      ${chalk.yellow("|")} ${valueLabel(
    nextSerie
  )}
  ${chalk.yellow(
    "+------------------------------------------------------------------+"
  )}
  ${chalk.yellow("|")} Stats:              ${chalk.yellow(
    "|"
  )} Watched: ${valueLabel(numberOfWatched)} Unwatched: ${valueLabel(
    numberOfUnWatched
  )} ${chalk.yellow("|")} Total: ${valueLabel(series.length)}
  ${chalk.yellow(
    "+------------------------------------------------------------------+"
  )}
  `);
};
