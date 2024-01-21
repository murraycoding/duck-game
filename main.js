// Duck Race Game - Developer: Brian Murray
// logic file

var flock = [];

//elements
const start_stop_button = document.getElementById("startButton")

// Duck Class
class Duck {
    constructor(name, color, duck_number) {
        this.name = name;
        this.color = color; // place holder for now <-- replace with shade of yellow
        this.duck_number = duck_number;
        this.distance_traveled = 0;
        this.speed = 0;
    }

    info() {
        console.log(`${this.name} has traveled ${this.distance_traveled}.`)
    }
}

function page_load(event) { 
    console.log("Instructors: We always give a challenege to recreate the duck game we use each session. It's open to anyone.")
    console.log("Brian Murray: Hold my beer.")

    // puts the ducks on the screen
    var num_ducks = 10           // this will later get replaced with the number of files
    populate_ducks(num_ducks)

}

function populate_ducks(num_ducks) {
    let game_screen = document.getElementById("game-screen")
    let game_height = game_screen.clientHeight;
    const spacing = game_height / num_ducks;

    for (i=0; i < num_ducks; i++) {
        let offset = i*spacing;
        let duck_number = i+1;
        create_duck("Brian", offset, duck_number)  // this will need to get replaced
    }
}

function create_duck(name, offset, number) {
    const game_screen = document.getElementById("game-screen")
    //adds a new duck to the flock
    flock.push(new Duck(name, '#f7f48d', number));
    console.log("A new duck was born!")
    // HTML Elements
    const new_duck_box = document.createElement("div")
    const new_duck = document.createElement("div")

    let colors = ["red", "orange", "green", "blue", "yellow"]
    var randomColor = colors[Math.floor(Math.random()*colors.length)]
    fetch('duck.svg')
    .then(response => response.text())
    .then(svgData => {
        new_duck.innerHTML = svgData;
    });

// new_duck.innerHTML = '<img src="duck.svg" alt="some file"  height="100" width="100"/>'
    // Classes & IDs
    new_duck_box.className = `duck-box`;
    new_duck.className = `duck`
    new_duck.id = `duck${number}`
    new_duck.classList.add(randomColor)

    // Positioning
    new_duck_box.style.top = `${offset}px`
    new_duck_box.style.animationDelay = `${Math.random()}s`
    new_duck_box.append(new_duck)
    game_screen.append(new_duck_box)
}



/* Logic for the movement of the ducks */
function start_race(event) {

    // adds the 'move-game-screen' class to the game screen
    const game_screen = document.getElementById('game-screen')
    game_screen.classList.add('move-game-screen') 

    // adds the 'racing-ducks' to the ducks
    for (let duck of flock) {
        console.log(duck['duck_number'])
        let duck_div = document.querySelector(`#duck${duck['duck_number']}`)
        
        // randomly pick a racing speed
        let random_number = Math.ceil(Math.random()*3)

        switch(random_number) {
            case 1:
                duck_div.classList.add('racing-ducks-1')
                break;
            case 2:
                duck_div.classList.add('racing-ducks-2')
                break;
            default:
                duck_div.classList.add('racing-ducks-3')
        }

        duck_div.style.animationDelay = `${Math.random()*3}s`
        duck_div.style.animationTimingFunction = `cubic-bezier(${Math.random()},${Math.random()},${Math.random()},${Math.random()})`
    }
}


// event listeners
document.addEventListener("DOMContentLoaded", page_load)
start_stop_button.addEventListener("click", start_race)
