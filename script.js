let myLibrary = [];

const submitButton = document.querySelector(".submitButton")
submitButton.addEventListener("click", e => {
  e.preventDefault();
  addBookToLibrary();
  })

function Book(title, fname, lname, pubDate, pages, read) {
  this.title = title;
  this.fname = fname;
  this.lname = lname;
  this.pubDate = pubDate;
  this.pages = pages;
  this.read = read;
};

function addBookToLibrary() {
  let title = document.querySelector("#title").value;
  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  let pubDate = document.querySelector("#pubDate").value;
  let pages = document.querySelector("#pages").value;
  let read = document.querySelector("#read").checked;
  var addBook = new Book(title, fname, lname, pubDate, pages, read);
  // I could just put document.querySelector values into var addBook but this is clearer
  firebase.database().ref('/Book').push(addBook)
  myLibrary.push(addBook);
  render();
  document.querySelector("#title").value = "";
  document.querySelector("#fname").value = "";
  document.querySelector("#lname").value = "";
  document.querySelector("#pubDate").value = "";
  document.querySelector("#pages").value = "";
  document.querySelector("#read").checked = false;
  // I can also shorten this with form.reset()
  // https://discord.com/channels/505093832157691914/690590001486102589/736653879684628491
};

function render() {
  // this adds in the first batch of info to the card
  const newVolume = document.createElement("div");
  newVolume.classList.add("volume");
  newVolume.setAttribute('id', myLibrary.length - 1 + "");
  newVolume.innerHTML = "<br /><br />"
                        + "<b>" + myLibrary[myLibrary.length-1].title + "</b>" + "<br /><br />" 
                        + myLibrary[myLibrary.length-1].fname + "&nbsp;"
                        + myLibrary[myLibrary.length-1].lname + "<br /><br />"
                        + "Published: " + myLibrary[myLibrary.length-1].pubDate + "<br />"
                        + "Pages: " + myLibrary[myLibrary.length-1].pages + "<br />";

  // this works off the checkbox, adds it to the rendered volume and interprets value given
const checkbox = document.createElement('input'); 
checkbox.type = "checkbox"; 
checkbox.id = "checkbox"; 

if (document.getElementById("read").checked == true) {checkbox.checked = true}
else {checkbox.checked = false};

checkbox.addEventListener("change", function() {
  numberVolumes();
// number the array, for each volume, it gets an id number, ie <div id="1">
  console.log(newVolume.id)
  let volumeId = newVolume.getAttribute('id');
// take the id number and add a + to make it a number
// corresponds to its place in the array
  if (checkbox.checked === false) {
    myLibrary[+volumeId].read = false;
    console.log(myLibrary)
  } else if (checkbox.checked === true) {
    myLibrary[+volumeId].read = true
    console.log(myLibrary)
  }
});

const label = document.createElement("label"); 
label.appendChild(document.createTextNode("Read")); 
const linebreak = document.createElement("br")

newVolume.appendChild(checkbox);
newVolume.appendChild(label);
newVolume.appendChild(linebreak);

const removeButton = document.createElement('button')
newVolume.appendChild(removeButton)
removeButton.setAttribute('id', `${myLibrary.length - 1}`);
removeButton.classList.add('remove')
removeButton.textContent = 'Remove';
removeButton.addEventListener("click", function(event){
    numberVolumes();
    let volumeId = newVolume.getAttribute('id');
    // volumeID of newVolume corresponds to place in the array
    myLibrary.splice(+volumeId, 1);
    firebase.database().splice(+volumeId, 1);
    newVolume.remove();
    console.log(myLibrary)
})

libraryContainer.insertAdjacentElement('afterbegin',newVolume);
};

function numberVolumes() {
  let allVolumes = document.querySelectorAll('.volume');
  let i = allVolumes.length-1;
  allVolumes.forEach(element => {
    // review forEach fat arrow function
      element.setAttribute('id', i);
    // each volume gets an id equal to its place in the array
    // starting with the latest addition and giving id number backwards
    // because i arranged the .css to have the newest first
      i--;
  })
}


// Thanks for the help on the remove button:
// https://github.com/JuicyMelon/Library

// For checkbox, I used
// https://www.geeksforgeeks.org/html-dom-input-checkbox-property/

// LAST TASKS:
// Add a “NEW BOOK” button -- learn how to build a modal window
// upload to firebase, why is title last in firebase?

// function readStatus() {
//   const boxChecked = document.getElementById("read").checked;
//   console.log(boxChecked)
//   if (boxChecked == true) {x = "read"}
//   else {x = "unread"}
//   // if box checked, display this to the DOM
//   return(x)
// }