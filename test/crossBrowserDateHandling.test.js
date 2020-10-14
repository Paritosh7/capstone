/** tesing the crossBrowserDateValidation function, this function needs to return true | false for a valid & invalid date respectively.   */
import { crossBrowserDateValidation } from "../src/client/js/crossBrowserDateHandling";

/** providing min and max date dynamically, no need to hard code this */
const minDate = new Date();
const maxDate = new Date();
maxDate.setDate(new Date().getDate() + 15);

/** function should return true */
test("Testing the function for a valid date (today's date) + 15 days", () => {
  expect(crossBrowserDateValidation("2020/10/20", minDate, maxDate)).toBe(true);
});

/** function should return false */
test("Testing the function for an invalid date ", () => {
  expect(crossBrowserDateValidation("2021/10/30", minDate, maxDate)).toBe(
    false
  );
});
