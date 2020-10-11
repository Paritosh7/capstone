function addDateSpanNote(minDate, maxDate) {
  document.getElementById(
    "cross-browser-date-message"
  ).innerHTML = `<i>Please select a date between ${minDate} & ${maxDate} in the correct format YYYY-MM-DD</i>`;
}

function crossBrowserDateValidation(inputDate, minDate, maxDate) {
  let date = new Date(inputDate);

  /** to support the present date, as date passed by user can be less, equal or greather than the current time.  */
  date.setHours(
    minDate.getHours(),
    minDate.getMinutes(),
    minDate.getSeconds(),
    minDate.getMilliseconds()
  );

  console.log(date);
  console.log(minDate);
  if (
    date.getTime() < minDate.getTime() ||
    date.getTime() > maxDate.getTime()
  ) {
    return false;
  } else return true;
}

export { addDateSpanNote, crossBrowserDateValidation };
