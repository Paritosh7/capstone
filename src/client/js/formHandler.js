/** This function is a bridge between the client and server, the
 * request is done from here. Based on the response from server,
 * further actions are taken.
 */
async function handleSubmit(event, date, daysLeft) {
  event.preventDefault();

  /** extracting destination from the form, getting an entire String
   * representation for the user. */
  const destination = document.getElementById("destination").value;
  const entireDateString = new Date(date);

  console.log("::: Form Submitted :::");

  /** asynchronous call to the server, to fetch the relavant information */
  await fetch(
    `http://localhost:8081/get/?destination=${destination}&date=${entireDateString}&days=${daysLeft}`
  )
    .then((res) => res.json())
    .then((response) => {
      console.log(response.flag);
      if (response.flag) Client.updateUIForValidResponse(response.jsonResponse);
      else throw new Error(response.jsonResponse);
    })
    .catch((err) => Client.updateUIForError(err));
}

export { handleSubmit };
