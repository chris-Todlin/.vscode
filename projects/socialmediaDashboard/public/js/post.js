/* Get te data */
const postForm = document.forms.post;
const hiddenField = postForm.username;

const locat = location.href;
const indeOfWord = locat.indexOf('=') + 1;

hiddenField.value = locat.substring(indeOfWord);

// function to ectract the dta
function extractDate(){
    return {username: postForm.username.value,title: postForm.title.value, content: postForm.postcontent.value};
}

// Function to send the data
async function sendData(url,data){
    await fetch(url,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(async(res)=>{
        if(res.redirected){
            window.location.href = res.url;
        }
    }).catch(err=>{
        console.log('Error Ocorred');
    })
}

// Function to check padd
function savePost(e){
    e.preventDefault();
    const userData = extractDate();
    sendData(postForm.action, userData);
}

postForm.addEventListener('submit', savePost);