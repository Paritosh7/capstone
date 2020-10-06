function handleSubmit(event) {
  event.preventDefault();

  console.log("inside handle submit");
  // check what text was put into the form field
  let destination = document.getElementById("destination").value;
  let date = document.getElementById("date").value;

  console.log(destination);
  console.log(date);

  // // date in yyyy-mm-dd format
  // let parts = date.split("-");
  // console.log(parts);

  // let newDate = new Date(parts[0], parts[1] - 1, parts[2]);
  // console.log(newDate);
  // console.log(typeof destination);
  // console.log(typeof date);
  // // Client.checkForName(destination, date);

  console.log("::: Form Submitted :::");
  fetch(`http://localhost:8081/get/${destination}`)
    .then((res) => res.json())
    .then(function (res) {
      console.log(res);
    });
}

export { handleSubmit };
