// event listener on button
document.getElementById("add").addEventListener("click", remind)

// grab value from input and start counting
function remind() {
    const mins = parseInt(document.getElementById("num").value);

    if(isNaN(mins)){
        console.log("Not a number");
    }
    else{
        console.log(mins);
        chrome.runtime.sendMessage({mins}, function(response){
            console.log(response.farewell);
        });
    }
}