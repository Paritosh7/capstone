function handleSubmit(event) {
  event.preventDefault();

  console.log("inside handle submit");
  // check what text was put into the form field
  let destination = document.getElementById("destination").value;
  let date = document.getElementById("date").value;

  console.log(destination);
  console.log(date);

  console.log("::: Form Submitted :::");
  fetch(`http://localhost:8081/get/?destination=${destination}&date=${date}`)
    .then((res) => res.json())
    .then(function (res) {
      Client.updateUI(res);
    })
    .catch((err) => console.log(err.message));
}

export { handleSubmit };
