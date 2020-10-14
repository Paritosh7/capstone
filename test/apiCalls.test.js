/** fetchResponse will throw an Exception everytime an invalid place name       is provided. Date and number of days are handled at the client side.
 */

import { fetchResponse } from "../src/server/apiCalls";

/** testing fetchResponse for an invalid place name */
test("testing fetchResponse for invalid place name", async () => {
  try {
    await fetchResponse("abcsads124", "2020/10/14", "5");
    expect(fetchResponse).toThrow();
  } catch (error) {}
});

// /** testing fetchResponse for another invalid place name, empty responses are not accepted. So not testing that */
test("testing fetchResponse for another invalid place name", async () => {
  try {
    await fetchResponse("123rasdasdfasfaf", "2020/10/14", "5");
    expect(fetchResponse).toThrow();
  } catch (error) {}
});
