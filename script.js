// getting input from input areas -->

function inputs(userName, bookName, type) {
    this.userName = userName;
    this.bookName = bookName;
    this.type = type;
  }
  
  class Display {
    constructor() {}
    add(arrayInputs) {
      let tableBody = document.getElementById("table-body");
      let today = new Date().toLocaleDateString();
      let htmltobeadded = "";
      for (let i = 0; i < arrayInputs.length; i++) {
        htmltobeadded += `
                    <tr>
                      <td>${i + 1}</td>
                      <td>${today}</td>
                      <td>${arrayInputs[i].userName}</td>
                      <td>${arrayInputs[i].bookName}</td>
                      <td>${arrayInputs[i].type}</td>
                      <td> <button type="button" onclick = "deleteItem(${i})" class ="dlt-btn btn-primary btn " id ="dlt-btn"> Delete </button> </td>
                    </tr>
                `;
      }
      tableBody.innerHTML = htmltobeadded;
    }
    clear() {
      let myForm = document.getElementById("mylibraryform");
      myForm.reset();
    }
    validate(inputs) {
      if (inputs.userName == "" || inputs.bookName == "") {
        return false;
      } else return true;
    }
    alertuser(type, sub, massage) {
      let alertuser = document.getElementById("alertuser");
      let htmltobeaddedinalert = ` <div class="alert alert-${type} alert-dismissible fade show" id="alert" role="alert" >
        <strong>${sub}</strong> ${massage}
        <button type="button" class="close"  data-dismiss="alert" aria-label="Close">
  
    <span aria-hidden="true">×</span>
        </button>
      </div>`;
      alertuser.innerHTML += htmltobeaddedinalert;
      setTimeout(() => {
        alertuser.innerHTML = "";
      }, 4000);
    }
  
    // check if the book is issued or not -->
    checkIssue(listArray, o1) {
      for (let i = 0; i < listArray.length; i++) {
        if (listArray[i].bookName == o1.bookName) {
            this.issuedUser = listArray[i].userName;
          return 0;
        }
      }
      return 1;
    }
  }
  
  // Show BookList even after reload -->
  function showList() {
    let listItems = localStorage.getItem("listItems");
    if (listItems == null) {
      listArray = [];
    } else {
      listArray = JSON.parse(listItems);
    }
    new Display().add(listArray);
    // console.log(listArray);
  }
  showList();
  
  // Deleting List Item -->
  function deleteItem(index) {
    let listItems = localStorage.getItem("listItems");
    if (listItems == null) {
      listArray = [];
    } else {
      listArray = JSON.parse(listItems);
    }
    listArray.splice(index, 1);
    localStorage.setItem("listItems", JSON.stringify(listArray));
    showList();
  }
  
  // add submit finction to the form -->
  const form = document.getElementById("mylibraryform");
  form.addEventListener("submit", formSubmit);
  function formSubmit(e) {
    e.preventDefault();
    let givenUserName = document.getElementById("User-Name").value;
    let givenBookName = document.getElementById("Book-Name").value;
    let givenType;
    let checkFiction = document.getElementById("Fiction");
    let checkPrograming = document.getElementById("Programing");
    let checkcooking = document.getElementById("Cooking");
    if (checkFiction.checked) {
      givenType = checkFiction.value;
    } else if (checkPrograming.checked) {
      givenType = checkPrograming.value;
    } else {
      givenType = checkcooking.value;
    }
  
    let o1 = new inputs(givenUserName, givenBookName, givenType);
  
    let displayObj = new Display();
    if (displayObj.validate(o1) && displayObj.checkIssue(listArray, o1) == 1) {
      let listItems = localStorage.getItem("listItems");
      if (listItems == null) {
        listArray = [];
      } else {
        listArray = JSON.parse(listItems);
      }
      listArray.push(o1);
      localStorage.setItem("listItems", JSON.stringify(listArray));
      // console.log(listArray.length);
  
      new Display().add(listArray);
      displayObj.clear();
      displayObj.alertuser("success", "Success", "Book is issued");
    } else if (displayObj.checkIssue(listArray, o1) == 0) {
        let issuedUser =
      displayObj.alertuser(
        "danger",
        "Oops!",
        `Book is already issued by ${displayObj.issuedUser}`
      );
      displayObj.clear();
    } else {
      displayObj.alertuser("danger", "Oops!", "Book is not issued");
      displayObj.clear();
    }
  }



  // script.js
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('mylibraryform');
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission
  
      // Get form values
      const userName = document.getElementById('User-Name').value;
      const bookName = document.getElementById('Book-Name').value;
      const genre = document.querySelector('input[name="check-box"]:checked').value;
  
      // Perform actions with the form values (e.g., add to a table)
      addToTable(userName, bookName, genre);
  
      // Clear the form
      form.reset();
    });
  });
  
  function addToTable(userName, bookName, genre) {
    // Add your code here to update the table with the new book entry
    // You might want to create a new row and append it to the table body
    // Example:
    const tableBody = document.getElementById('table-body');
    const newRow = tableBody.insertRow(tableBody.rows.length);
  
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);
  
    // Update cell content with form values
    cell1.textContent = tableBody.rows.length; // You can use a counter for Sl No.
    cell2.textContent = new Date().toLocaleDateString(); // Date of issue
    cell3.textContent = userName; // Reader
    cell4.textContent = bookName; // Book Name
    cell5.textContent = genre; // Genre
    cell6.innerHTML = '<button class="dlt-btn btn-primary btn">Delete</button>'; // Delete button (example)
  
    // You can customize this based on your table structure
  }