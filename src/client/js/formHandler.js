async function handleSubmit(event) {
  event.preventDefault();

  // check what text was put into the form field
  let destination = document.getElementById("destination").value;
  let date = document.getElementById("date").value;

  console.log(destination);
  console.log(date);

  console.log("::: Form Submitted :::");

  await fetch(
    `http://localhost:8081/get/?destination=${destination}&date=${date}`
  )
    .then((res) => res.json())
    .then((response) => Client.updateUIForValidResponse(response))
    .catch(() => Client.updateUIForError());
}

export { handleSubmit };
