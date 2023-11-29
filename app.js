let input=document.querySelector("#input");
let searchBtn=document.querySelector("#search");
let apiKey='12696b3b-a825-4dfe-9ed1-b83989e06e41';
//https://dictionaryapi.com/api/v3/references/learners/json/test?key=12696b3b-a825-4dfe-9ed1-b83989e06e41

let notFound=document.querySelector(".not_found");
let defBox = document.querySelector(".def");
let audioBox = document.querySelector(".audio");
let loading = document.querySelector(".loading");

searchBtn.addEventListener('click',function(e){
    e.preventDefault();

// clear data
    audioBox.innerHTML = '';
    notFound.innerText = '';
    defBox.innerText = '';




//get input data
    let word = input.value;

//call api get data
    if(word === '') {
        alert('Enter a word!');
        return;
    }


    getData(word);
})



async function getData(word){
    loading.style.display = 'block';

//Ajax call
    const response= await fetch (`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=${apiKey}`);
    const data = await response.json();
    console.log(data);


//if results empty
    if(!data.length){
        loading.style.display = 'none';
        notFound.innerText = 'No Result Found';
        return;
    }


 //if results are suggestions
    if(typeof data[0] === 'string'){
        loading.style.display = 'none';
        let heading = document.createElement('h5');
        heading.innerText = 'Did you mean?'
        notFound.appendChild(heading);
        data.forEach(element => {
            let suggestion = document.createElement('span');
            suggestion.classList.add('suggested');
            suggestion.innerText = element;
            notFound.appendChild(suggestion);
        })
        return;
    }


//if results found
    loading.style.display = 'none';
    let definition = data[0].shortdef[0];
    defBox.innerText = definition;

//sound
    const soundName = data[0].hwi.prs[0].sound.audio;
        if(soundName){
            renderSound(soundName);
        }




    console.log(data);
}


function renderSound(soundName) {
    

    let subFolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${subFolder}/${soundName}.mp3?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);



}