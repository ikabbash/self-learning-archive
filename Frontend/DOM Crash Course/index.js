var form = document.getElementById('addForm'); // the form of Add Items to access the i/p text box
var itemList = document.getElementById('items');
var filter = document.getElementById('filter'); // the search i/p box


// ~~~~~~ the event listeners ~~~~~~ //

// User clicks submit, function addItem will operate
form.addEventListener('submit', addItem);
// delete event
itemList.addEventListener('click', removeItem);
// filter event
filter.addEventListener('keyup', filterItems);
// ~~~~~~ the event listeners ~~~~~~ //




// ~~~~~~ the functions for the event listeners ~~~~~~ //

function addItem(event){
    event.preventDefault(); // to prevent the initial (page refresh)
    // Get input value
    var newItem = document.getElementById('item').value + ' '
    // if you don't put value this will happen: [object HTMLInputElement]
    // could use QuerySelector but it could select the one above by accident

    // Create new Li element
    var li = document.createElement('li');
    li.className = 'list-group-item'; // so it can have the same class
    // the value you got from submitting the i/p text
    // will be appended to the list
    li.appendChild(document.createTextNode(newItem));

    // add delete button starting with creating the button element
    var deleteBtn = document.createElement('button');
    // add the bootstrap classes
    deleteBtn.className = 'btn btn-danger btn-sm float-right delete';
    deleteBtn.appendChild(document.createTextNode('X')); // add text into the button
    
    // now we need to add the button to the li itself
    li.appendChild(deleteBtn);
    // then finally add the li to the Unordered List (UL)
    itemList.appendChild(li);
}
function removeItem(event){
    // the if condition to prevent the click listened to
    // anywhere in the list except for the X button only
    if(event.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li = event.target.parentElement; // the Li (because button is a child)
            itemList.removeChild(li);
        }
    }
}
function filterItems(event){
    // convert to lower case that's in the search box
    var text = event.target.value.toLowerCase();
    // get list
    var items = itemList.getElementsByTagName('li');
    // turn collection into array, why? For example you type 'item'
    // then the search filters all items that has the word 'item'
    Array.from(items).forEach(function(item){ // loop into items with index of item
        var itemName = item.firstChild.textContent; // what will be returned
        // to convert the item text to lower for matching
        if(itemName.toLowerCase().indexOf(text) != -1){
            item.style.display = 'block';
        }
        else{
            item.style.display = 'none';
        }
    })
}

// ~~~~~~ the functions for the event listeners ~~~~~~ //