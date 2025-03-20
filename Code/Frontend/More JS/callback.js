const posts = [
    {title: 'Post One', body: 'This is post one'},
    {title: 'Post Two', body: 'This is post two'},
];

function getPost(){
    setTimeout(() => {
        let output = '';
        posts.forEach(post => {
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000)
}

// so when we create new post we pass it in
// we had it set on 2000ms, and result was the
// third post wasn't output because the print has
// already been done, therefore callback is used
function createPost(post, callback){
    setTimeout(() => {
        posts.push(post);
        callback();
    }, 2000);
}

// getPost();  <-- get rid of that after adding callback
// and careful not to put the function inside the array
// result: waited 2 seconds then showed all the posts
createPost({title: 'Post Three', body: 'This is post three'}, getPost);