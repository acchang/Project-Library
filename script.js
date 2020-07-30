let myLibrary = [];
// start by letting myLibrary take all values from firebase and render them

const test = new Book("L'Etranger", "Albert", "Camus", "1942", "Me", false);
firebase.database().ref('/Book').push(test);
myLibrary.push(test);
document.getElementById("own").checked = false;
render(test);
// can I render from the object in firebase?
document.getElementById("own").checked = false;

const test2 = new Book("White Teeth", "Zadie", "Smith", "2000", "Andrew", true);
firebase.database().ref('/Book').push(test);
myLibrary.push(test2);
document.getElementById("own").checked = true;
render(test2);
document.getElementById("own").checked = false;


const submitButton = document.querySelector(".submitButton")
submitButton.addEventListener("click", e => {
  e.preventDefault();
  addBookToLibrary();
  })

function Book(title, fname, lname, pubDate, contrib, own) {
  this.title = title;
  this.fname = fname;
  this.lname = lname;
  this.pubDate = pubDate;
  this.contrib = contrib;
  this.own = own;
};

function addBookToLibrary() {
  let title = document.querySelector("#title").value;
  let fname = document.querySelector("#fname").value;
  let lname = document.querySelector("#lname").value;
  let pubDate = document.querySelector("#pubDate").value;
  let contrib = document.querySelector("#contrib").value;
  let own = document.querySelector("#own").checked;
  var addBook = new Book(title, fname, lname, pubDate, contrib, own);
  // I could just put document.querySelector values into var addBook but this is clearer
  firebase.database().ref('/Book').push(addBook)
  myLibrary.push(addBook);
  render();
  document.querySelector("#title").value = "";
  document.querySelector("#fname").value = "";
  document.querySelector("#lname").value = "";
  document.querySelector("#pubDate").value = "";
  document.querySelector("#contrib").value = "";
  document.querySelector("#own").checked = false;
  // I can also shorten this with form.reset()
  // https://discord.com/channels/505093832157691914/690590001486102589/736653879684628491
};


// xxxxxxx//

function render() {
  // this adds in the first batch of info to the card
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book-container");

  const newVolume = document.createElement("div");
  newVolume.classList.add("volume");
  bookContainer.appendChild(newVolume);

  const frontCover = document.createElement("div");
  newVolume.appendChild(frontCover);
 
  frontCover.style.setProperty("background-color", getRandomColor());
  frontCover.setAttribute('id', myLibrary.length - 1 + "");
  frontCover.innerHTML = "<br /><br />"
                        + "<b>" + myLibrary[myLibrary.length-1].title + "</b>" + "<br /><br />" 
                        + myLibrary[myLibrary.length-1].fname + "&nbsp;"
                        + myLibrary[myLibrary.length-1].lname + "<br /><br />"
                        + "Published: " + myLibrary[myLibrary.length-1].pubDate + "<br />"
                        + "Added by: <br />" + myLibrary[myLibrary.length-1].contrib + "<br />";

  // this works off the checkbox, adds it to the rendered volume and interprets value given
const checkbox = document.createElement('input'); 
checkbox.type = "checkbox"; 
checkbox.id = "checkbox"; 

if (document.getElementById("own").checked == true) {checkbox.checked = true}
else {checkbox.checked = false};

checkbox.addEventListener("change", function() {
  numberContainers();
// number the array, for each volume, it gets an id number, ie <div id="1">
  let containerId = bookContainer.getAttribute('id');
// take the id number and add a + to make it a number
// corresponds to its place in the array
  if (checkbox.checked === false) {
    myLibrary[+containerId].own = false;
  } else if (checkbox.checked === true) {
    myLibrary[+containerId].own = true
  }
  console.log(myLibrary)
});

const label = document.createElement("label"); 
label.appendChild(document.createTextNode("I own a copy")); 
const newgraf = document.createElement("p")

frontCover.appendChild(checkbox);
frontCover.appendChild(label);
frontCover.appendChild(newgraf);

const removeButton = document.createElement('button')
frontCover.appendChild(removeButton)
removeButton.setAttribute('id', `${myLibrary.length - 1}`);
removeButton.classList.add('remove')
removeButton.textContent = 'Remove';
removeButton.addEventListener("click", function(event){
    numberContainers();
    let containerId = bookContainer.getAttribute('id');
    // containerId of bookContainer corresponds to place in the array
    myLibrary.splice(+containerId, 1);
    // firebase.database().splice(+containerId, 1);
    bookContainer.remove();
    console.log(myLibrary)
})

libraryContainer.insertAdjacentElement('afterbegin',bookContainer);
};

function numberContainers() {
  let allContainers = document.querySelectorAll('.book-container');
  let i = allContainers.length-1;
  allContainers.forEach(element => {
    // review forEach fat arrow function
      element.setAttribute('id', i);
    // each volume gets an id equal to its place in the array
    // starting with the latest addition and giving id number backwards
    // because i arranged the .css to have the newest first
      i--;
  })
}

function getRandomColor() {
  color = "hsl(" + Math.random() * 360 + ", 100%, 20%)";
  return color;
}


// Inpiration for the remove button:
// https://github.com/JuicyMelon/Library

// For checkbox, I used
// https://www.geeksforgeeks.org/html-dom-input-checkbox-property/

// LAST TASKS:
// upload to firebase, why is title last in firebase?

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}