// targetting form, function will be listened once button is clicked
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e){
    e.preventDefault(); // prevent reloading
    
    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validation(siteName, siteUrl)){
        return false;
    }

    // we're going to save as an array of objects
    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    //////////////////////////////////////////////////////////////////////
    // localStorage is a property that allows JavaScript sites and apps
    // to save key-value pairs in a web browser with no expiration date
    // Testing localStorage
    // localStorage.setItem('test', 'Hello World');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));
    //////////////////////////////////////////////////////////////////////

    // if it's null it means we need to initialize
    if(localStorage.getItem('bookmarks') === null) {
        var bookmarks = []; // init array
        // the bookmark object var
        bookmarks.push(bookmark); // add to array
        // and change JSON file to string
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else { // if there's something in the bookmark
        // get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // parse/turn it into JSON

        // Add bookmark to array
        bookmarks.push(bookmark);
        // Re-set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // Clear the text leftover from the form's input
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks because only gets added to the web
    // after reload
    fetchBookmarks();
}

// Delete function
function deleteBookmark(url){
    // get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // Remove from array
            bookmarks.splice(i, 1);
        }        
    }
    // Re-set LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks because only gets removed from the web
    // after reload
    fetchBookmarks();
}

// Fetch bookmarks to display the output into the web page
function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //console.log(bookmarks);

    // Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    // build output
    bookmarksResults.innerHTML = '';
    // loop through bookmarks that's already in localstorage and output them one by one
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                        '<h3>'+name+'</h3>'+
                                        ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                        '</div>';
    }
}

// LAST PART OF THE CODE: Validation //
function validation(siteName, siteUrl){
    if(!siteName || !siteUrl){  // if inputs are empty
        alert("Please fill in the form");
        return false; // so function stops and doesn't add empty row
    }

    // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    if(!siteUrl.match(regex)){
        alert("Please use a valid address");
        return false;
    }
    return true;
}

// jQuery Version
// $('#myForm').submit(function(e){
//     e.preventDefault();
//     console.log("works");
// });