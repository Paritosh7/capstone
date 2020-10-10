function addDateSpanNote(minDate, maxDate) {
  document.getElementById(
    "cross-browser-date-message"
  ).innerHTML = `<i>Please select a date between ${minDate} & ${maxDate} in the correct format YYYY-MM-DD</i>`;
}

export { addDateSpanNote };
