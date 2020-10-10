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

function numberOfDaysLeft(minDate, maxDate) {
  let difference = maxDate.getTime() - minDate.getTime();

  /** converting milliseconds so we are converting it into days here. */
  return Math.ceil(difference / (1000 * 3600 * 24));
}

export { minMaxDateString, numberOfDaysLeft };
