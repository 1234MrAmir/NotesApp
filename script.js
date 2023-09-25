console.log('hii');
showNotes();

// If user add a note, add it to the localStorage.

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {

    let addTxt = document.getElementById('addTxt');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    //notesObj is an array which come after changing of notes.
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    console.log(notesObj);

    showNotes();
})

/* function to show elements from the local storage*/
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        // Template literals
        html += `
    <div class="card my-2 mx-2 noteCard" style="width: 18rem;">
                <div class="card-body my-2 mx-3">
                    <h5 class="card-title"> Note- ${index + 1} </h5>
                    <p class="card-text"> ${element} </p>
                    <Button id="${index} "onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</Button>
                </div>
            </div>
         `
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`
    }
}

/* function to delete  note */
function deleteNote(index) {
    console.log('i am deleting', index);

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    // yhe par hamne islo isly upadte ky h kuki hum value local storage se delete  kar rhe h to hme local storage me save bhi krna pdega jab hum delete unction ko call kre kuki delte funtion samajh nhi pyga ki kis bali store hui index ko delete karna h ok
    localStorage.setItem("notes", JSON.stringify(notesObj));
    /* yha par show function ko isly call karbaya kuki delete hame show function dwara dikhayi gyi template ko hi larbana hai*/
    showNotes();
}


/* serahing words through the inputs*/
let search = document.getElementById('searchTxt');
// console.log(searchTxt);
search.addEventListener("input", function () {
    let inputVal = search.value.toLowerCase();
    // console.log('input event fire', inputVal);
    let notecards = document.getElementsByClassName('noteCard');
 Array.from(notecards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerHTML;
    
    if (cardTxt.includes(inputVal)) {
       element.style.display ='block';
    }
    else{
        element.style.display ='none';
    }
    // console.log(cardTxt);
 });
})