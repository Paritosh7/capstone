import { handleSubmit } from "./js/formHandler";
import { updateUIForValidResponse, updateUIForError } from "./js/uiUpdater";
import {
  minMaxDateCompressedString,
  numberOfDaysLeft,
} from "./js/dateDaysUtility";
import {
  addDateSpanNote,
  crossBrowserDateValidation,
} from "./js/crossBrowserDateHandling";
import "./styles/base.scss";
import "./styles/weather-card.scss";
import "./styles/form.scss";
import "./styles/error.scss";
import "./styles/multiple-weather-card.scss";

/** - getting the form element.
 *  - getting today's date.
 *  - getting today's date again, to
 *    calculate the max date allowed from today.
 */
const form = document.getElementById("form");
const minDate = new Date();
const maxDate = new Date();

/** calculating the max Date allowed - 16days */
maxDate.setDate(new Date().getDate() + 15);

/** calling minMaxDateString to get the
 *  minimum and maximum date allowed.
 *  - used for cross browser (eg. Safari) date message.
 *  - used for setting the Date's min and max attribute.
 */
let datesArr = minMaxDateCompressedString(minDate, maxDate);

/** for cross browser rendering, unsupported browser will
 * fallback to text, when trying to set the type of input
 * to date  */
let test = document.createElement("input");
try {
  test.type = "date";
} catch (e) {
  console.log(e.description);
}

/** if text, unsupported browser, so we have to check if
 *  the user entered the wrong date -
 *    1. correct date -> call handleSubmit
 *    2. wrong date -> error message!
 */
if (test.type === "text") {
  addDateSpanNote(datesArr[0], datesArr[1]);
  form.addEventListener("submit", (eve) => {
    eve.preventDefault();
    let inputDate = document.getElementById("date").value;
    if (crossBrowserDateValidation(inputDate, minDate, maxDate)) {
      const daysLeft = numberOfDaysLeft(minDate, inputDate);
      handleSubmit(eve, inputDate, daysLeft);
    } else {
      updateUIForError("Date isn't correct");
    }
  });

  /** supported browser, so can set the date's min and max
   * attribute, further calling handleSubmit.
   */
} else {
  let dateElement = document.getElementById("date");
  dateElement.setAttribute("min", datesArr[0]);
  dateElement.setAttribute("max", datesArr[1]);
  form.addEventListener("submit", (eve) => {
    eve.preventDefault();
    let inputDate = document.getElementById("date").value;
    const daysLeft = numberOfDaysLeft(minDate, inputDate);
    handleSubmit(eve, inputDate, daysLeft);
  });
}

export { handleSubmit, updateUIForValidResponse, updateUIForError };
