let addToy = false;
const toyCollection = document.getElementById("toy-collection");
const toySubmit = document.getElementsByClassName("add-toy-form")[0]

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  
  function addToys(object){
    object.forEach(e => { addToyCard(e)
    })
  }

  fetch("http://localhost:3000/toys/").then(function(response){
    return response.json();
  }).then(function(e){
    addToys(e)})

  
});


function submitData() {
  const toyData = {
      name: document.getElementsByClassName("input-text")[0].value,
      image: document.getElementsByClassName("input-text")[1].value,
      likes: 0
  };

  const configObj = {
    method: "post",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(toyData)
  };

  fetch("http://localhost:3000/toys", configObj).then(function(response){ 
    return response.json();
    })
    .then(function(e){
        addToyCard(e)
        console.log("success", e)
    })
};

function addToyCard(e) {
  const toyCollection = document.getElementById("toy-collection")
  const toyCard = document.createElement('div')
      toyCard.className = "card"
      let name = document.createElement("h2")
      name.innerText = e.name
      toyCard.appendChild(name) 
      let avatar = document.createElement("img")
      avatar.className = "toy-avatar"
      avatar.src = e.image
      toyCard.appendChild(avatar)
      let likesNumber = document.createElement("p")
      likesNumber.innerText = `${e.likes} like(s)`
      toyCard.appendChild(likesNumber)
      let button = document.createElement("button")
      button.className = "like-btn"
      button.innerHTML = "Like <3"
      button.id = e.id 
      button.addEventListener("click",addLikes)
      toyCard.appendChild(button)

  
      toyCollection.appendChild(toyCard)
}

toySubmit.addEventListener("submit", function(event) {submitData(); event.preventDefault();}, false);

function addLikes() { 

  liked = parseInt(this.previousSibling.innerHTML) + 1


  const configObj = {
    method: "PATCH",
    headers: {
        "mode": 'no-cors',
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify({likes : liked })
  };


  fetch(`http://localhost:3000/toys/${this.id}`, configObj)
  .then(r => r.json())
  .then(data => {this.previousSibling.innerText = `${liked} likes`})
  .catch(e => console.log(e))
};