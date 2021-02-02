/**
 * Stores the list of kittens
 * @type {Kitten[]}
 */
let kittens = [];
let mood = ""
let affection = 5
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * you can use robohash for images
 * https://robohash.org/<INSERTCATNAMEHERE>?set=set4
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
    event.preventDefault()
    let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "tolerant",
    affection: 5
  }
  

  if (form.name.value == ""){alert("You must enter a name!")}
  else {
    kittens.push(kitten)
    saveKittens()
    form.reset()
  }
  
  document.getElementById("kitten").classList.remove("hidden")

  drawKittens();
  
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens
 */
function saveKittens() {
    window.localStorage.setItem("kittens", JSON.stringify(kittens))
    drawKittens()
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
    let kittenData = JSON.parse(window.localStorage.getItem(kittens))
  if (kittenData) {
      kittens = kittenData
  }

  document.getElementById("kitten").classList.remove("hidden")
}


/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens() {
  loadKittens();
  let template = ""

  kittens.forEach(kitten => {
    template += `<form class="container card mt-2 w-15">
    <div id="mood-indicator" class="cat-border dark kitten ${kitten.mood} text-light">
      <img src="https://robohash.org/${kitten.name}?set=set4">
      </div>

    <div class="d-flex">
        <div>
          <label for="name">
            <span><h3>Name: ${kitten.name}</h3></span>
          </label>
        
          <label for="mood">
            <span><h3>Mood: ${kitten.mood}</h3></span>
            </label>
            
            <label for="affection"> 
            <span><h3>Affection: ${kitten.affection}</h3></span>
            </label>
            </div>
            </div>
            
            <label id="buttons" class="">
        <button id="buttonone" class="m-1" type="button" onclick="pet('${kitten.id}')">Pet</button>
        <button id="buttontwo" class="btn-cancel" type="button" onclick="catnip('${kitten.id}')">Catnip</button>
            </label>
        </form>
        `
    
    document.getElementById("kitten").innerHTML = template
    
  })
}

/**
 * Find the kitten in the array by its id
 * @param {string} id
 * @return {Kitten}
 */
function findKittenById(id) {
  return kittens.find(k => k.id == id);
}

/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .7
 * increase the kittens affection
 * otherwise decrease the affection
 * save the kittens
 * @param {string} id
 */
function pet(id) {
  let kitten = findKittenById(id)
  let randomNum = Math.random()

  if (randomNum > .7) {
    kitten.affection++;
    setKittenMood(kitten)
    saveKittens()
  } else {
    kitten.affection--;
    setKittenMood(kitten)
    saveKittens();
  }

  drawKittens();
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * save the kittens
 * @param {string} id
 */
function catnip(id) {
  let kitten = findKittenById(id)
  kitten.mood = "tolerant"
  kitten.affection = 5;
  saveKittens()
  drawKittens();
}

/**
 * Sets the kittens mood based on its affection
 * Happy > 6, Tolerant <= 5, Angry <= 3, Gone <= 0
 * @param {Kitten} kitten
 */
function setKittenMood(kitten) {
  if (kitten.affection >= 6) {
    kitten.mood = "happy"
  }
  if (kitten.affection <= 5) {
    kitten.mood ="tolerant"
  }
  if (kitten.affection <= 3) {
    kitten.mood = "angry"
  }
  if (kitten.affection <= 0) {
    kitten.mood = "gone"
    kitten.affection = 0;
    document.getElementById("buttons").classList.add("hidden")
  }

  saveKittens();
}

function getStarted() {
  document.getElementById("welcome").remove();
  document.getElementById("submission").classList.remove("hidden")
  loadKittens()
  drawKittens()
}

/**
 * Defines the Properties of a Kitten
 * @typedef {{id: string, name: string, mood: string, affection: number}} Kitten
 */

/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return (
    Math.floor(Math.random() * 10000000) +
    "-" +
    Math.floor(Math.random() * 10000000)
  );
}

function killKitten(id) {
  
  console.log(id);

  let index = kittens.findIndex(k => k.id == id)
  if (index == -1) {
    console.error("Invalid Id");
  }
  kittens.splice(index, 1);
  saveKittens()
}
