const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
// Careful with the error: querySelectorAll returns
// A NODE LIST, and you have only one About section
// so querySelector suffices and returns a single HTML element
const articles = document.querySelectorAll(".content");

about.addEventListener("click", function(e){
    // this is where you're able to extract the ID
    // of the HTML element you click within the about
    // console.log(e.target.dataset.id);
    const id = e.target.dataset.id;
    if(id){ // if it exists
        // remove active from other buttons
        btns.forEach(function(btn){
            // button edits
            btn.classList.remove('active');
            e.target.classList.add('active');
        });
        // hide other articles
        articles.forEach(function(article){
            article.classList.remove('active');
        });
        // display other
        const element = document.getElementById(id);
        element.classList.add('active');
    }
});