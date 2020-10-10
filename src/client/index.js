import { handleSubmit } from "./js/formHandler";
import { updateUI } from "./js/uiUpdater";
import { minMaxDateString, numberOfDaysLeft } from "./js/validateDate";
import { addDateSpanNote } from "./js/crossBrowserHandling";
import "./styles/resets.scss";
import "./styles/base.scss";
import "./styles/footer.scss";
import "./styles/form.scss";
import "./styles/header.scss";

/** calculating the min and max Date allowed - 16days */
let minDate = new Date();
let maxDate = new Date();
maxDate.setDate(new Date().getDate() + 15);
let datesArr = minMaxDateString(minDate, maxDate);

/** to check for compatibility of input type date,
 * cross browser rendering
 */
let test = document.createElement("input");
try {
  test.type = "date";
} catch (e) {
  console.log(e.description);
}

/** unsupported browser will fallback to text when trying to
 * set the type of input to date
 */
if (test.type === "text") {
  addDateSpanNote(datesArr[0], datesArr[1]);
} else {
  let dateInput = document.getElementById("date");
  dateInput.setAttribute("min", datesArr[0]);
  dateInput.setAttribute("max", datesArr[1]);
}

document.getElementById("form").addEventListener("submit", (eve) => {
  handleSubmit(eve);
});

export { handleSubmit, updateUI };
