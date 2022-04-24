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

function createPost(post){
    return new Promise((resolve, reject) => {

        setTimeout(() => {
        posts.push(post);
        const error = false;
        if(!error){
            resolve();
            } else{
                reject('Something went wrong');
            }        
    }, 2000);

    });    
}

// // once it's resolved THEN it'll call the getPost func
// createPost({title: 'Post Three', body: 'This is post three'})
// .then(getPost)
// .catch(err => console.log(err)); // a nice clean error
// // promises mostly used in fetch API, mongoose, etc.. (the responses)


// // but if you have more than one promise you don't want to
// // keep writing .then .then .then, so Promise.all is used
// const promise1 = Promise.resolve('Hello');
// const promise2 = 21;
// const promise3 = new Promise((resolve, reject) => setTimeout(resolve, 2000, 'Goodbye'));
// Promise.all([promise1, promise2, promise3])
// .then(values => console.log(values));


// Async / Await
// function has to be async in order to use await
// await waits for synchronus to complete
async function init(){
    await createPost({title: 'Post Three', body: 'This is post three'});
    getPost();
}
init();