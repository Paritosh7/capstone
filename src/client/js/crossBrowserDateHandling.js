function addDateSpanNote(minDate, maxDate) {
  document.getElementById(
    "cross-browser-date-message"
  ).innerHTML = `<i>Please select a date between ${minDate} & ${maxDate} in the correct format YYYY-MM-DD</i>`;
}

/** In an unsupported browser (eg. Safari) the user can enter an invalid
 * date, therefore this function checks the date
 */
function crossBrowserDateValidation(inputDate, minDate, maxDate) {
  let date = new Date(inputDate);

  /** to support the present date, as date passed by user can be less, equal or greather than the current time.  */
  date.setHours(
    minDate.getHours(),
    minDate.getMinutes(),
    minDate.getSeconds(),
    minDate.getMilliseconds()
  );

  if (
    date.getTime() < minDate.getTime() ||
    date.getTime() > maxDate.getTime()
  ) {
    return false;
  } else return true;
}

export { addDateSpanNote, crossBrowserDateValidation };
