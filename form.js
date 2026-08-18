const form = document.getElementById('echo-form');

form.addEventListener('submit', async function (event) {
    event.preventDefault(); // stop the normal HTML form submission

    const method = document.getElementById('method').value;
    const queryString = document.getElementById('query').value;
    const lang = document.getElementById('language').value;

    if(method == 'GET'){
        console.log("if statement works", lang);
    }
});