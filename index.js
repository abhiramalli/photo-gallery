const btnEl = document.getElementById('btn');
const apiKey = 'fbcNyLNpbTsfQTH9Fjn1sQDw-tSRQV2aw85ivRsptqU'
const errorMassageEl = document.getElementById('errorMessage');
const galleryEL = document.getElementById('gallery');
async function fetchImages() {
    const inputValue = document.getElementById('input').value;
    if (inputValue > 10 || inputValue < 1) {
        errorMassageEl.style.display = 'block';
        errorMassageEl.innerText = "Number should betweeen 0 and 11"
        return;
    }
    let imgs = '';
    try {
        btnEl.style.display = 'none';
        const loading = `<img src ='spinner.svg' />`
        galleryEL.innerHTML = loading;
        await fetch(`https://api.unsplash.com/photos?per_page=${inputValue}&page=${Math.round(Math.random()*1000)}&client_id=${apiKey}`)
            .then((res) => res.json()
                .then((data) => {
                    if (data) {
                        data.forEach((pic) => {
                            imgs += `<img src=${pic.urls.small} alt='image'/>`;
                        });
                        galleryEL.style.display = 'block';
                        galleryEL.innerHTML = imgs;
                        btnEl.style.display = 'block';
                    }
                }))
        errorMassageEl.style.display = 'none';
    } catch (error) {
        console.log(error);
        errorMassageEl.style.display = 'block';
        errorMassageEl.innerText = "An error accord please try again"
        btnEl.style.display = 'block';
    }
}

btnEl.addEventListener('click', fetchImages);