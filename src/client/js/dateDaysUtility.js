/** returns an array of min and max date string allowed. */

function minMaxDateString(minDate, maxDate) {
  var ddMin = String(minDate.getDate()).padStart(2, "0");
  var mmMin = String(minDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyyMin = minDate.getFullYear() + "";

  var ddMax = String(maxDate.getDate()).padStart(2, "0");
  var mmMax = String(maxDate.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyyMax = maxDate.getFullYear() + "";

  let minDateString = `${yyyyMin}-${mmMin}-${ddMin}`;
  let maxDateString = `${yyyyMax}-${mmMax}-${ddMax}`;

  return [minDateString, maxDateString];
}

/** returns number of days left for the trip */
function numberOfDaysLeft(minDate, maxDate) {
  let difference = maxDate.getTime() - minDate.getTime();

  /** in milliseconds, so we are converting it into days here. */
  return Math.ceil(difference / (1000 * 3600 * 24));
}

export { minMaxDateString, numberOfDaysLeft };
