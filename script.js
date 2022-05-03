console.log("Welcome to spotify");

//Initialize the variables
let songIndex=0;
let audioElement=new Audio('Audio/Levitating.mp3');
let masterPlay=document.getElementById('masterPlay');
let masterForward=document.getElementById('masterForward');
let masterBackward=document.getElementById('masterBackward');
let myProgressBar=document.getElementById('myProgressBar');
let songItems=Array.from(document.getElementsByClassName('songItem'));


let songs=[
    {songName: "Levitating", filePath: "Audio/Levitating.mp3", coverPath: "Cover/Levitating.jpg"},
    {songName: "Besabriyaan", filePath: "Audio/Besabriyaan.mp3", coverPath: "Cover/Cover img.jpg"},
    {songName: "Look What You Made Me Do", filePath: "Audio/Look What You Made Me Do.mp3", coverPath: "Cover/Look_What_You_Made_Me_Do.png"},
    {songName: "Ek Tu Hi Toh", filePath: "Audio/Ek Tu Hi Toh.mp3", coverPath: "Cover/cover img.jpg"},
    {songName: "Buddhu Sa Mann", filePath: "Audio/Buddhu Sa Mann.mp3", coverPath: "Cover/cover img.jpg"},
    {songName: "Haaye Oye - Qaran", filePath: "Audio/Haaye Oye - Qaran.mp3", coverPath: "Cover/cover img.jpg"},
    {songName: "Raatan Lambiyan", filePath: "Audio/Raatan Lambiyan.mp3", coverPath: "Cover/cover img.jpg"},
    {songName: "Who-Says", filePath: "Audio/Who-Says.mp3", coverPath: "Cover/who says.jpg"},
]

songItems.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});

const playSong = () =>{
    let myElement=document.getElementById(songIndex);
    audioElement.src=songs[songIndex].filePath;
    audioElement.currentTime=0;
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    makeAllPlays();
    myElement.classList.remove('fa-circle-play');
    myElement.classList.add('fa-circle-pause');
}
//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    //Update Seeker
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress
    if(audioElement.currentTime==audioElement.duration){
        if(songIndex==7) songIndex=0;
        else songIndex=songIndex+1;
        playSong();    
    }
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach(element=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach(element=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        if(songIndex!=parseInt(e.target.id)){
            songIndex = parseInt(e.target.id)
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src=songs[songIndex].filePath;
            audioElement.currentTime=0;
            audioElement.play()
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
        else{
            if(audioElement.paused || audioElement.currentTime<=0){
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
                audioElement.play();
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
            }
            else{
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
                audioElement.pause();
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
            }
        }
    })
})

// Play/Pause song
masterPlay.addEventListener('click',()=>{
    let myElement=document.getElementById(songIndex);
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        myElement.classList.remove('fa-circle-play');
        myElement.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        myElement.classList.remove('fa-circle-pause');
        myElement.classList.add('fa-circle-play');
    }
})

masterForward.addEventListener('click',()=>{
    if(songIndex==7) songIndex=0;
    else songIndex=songIndex+1;
    playSong();
})
masterBackward.addEventListener('click',()=>{
    if(songIndex==0) songIndex=7;
    else songIndex=songIndex-1;
    playSong();
})