document.addEventListener('DOMContentLoaded', function() {
    initialize();
  });
  
  function getAllImages() {
    fetch('http://localhost:3000/ramens')
      .then(res => res.json())
      .then(ramenData => ramenData.forEach(ramen => renderOneRamen(ramen)));
  }
  
  function renderOneRamen(ramen) {
    let imgCreate = document.createElement('img');
    imgCreate.src = ramen.image;
    
    document.querySelector('#ramen-menu').appendChild(imgCreate);

    imgCreate.addEventListener('click', (e) => {
      let mainImg = document.getElementsByClassName('detail-image')
      let mainName = document.getElementsByClassName('name')
      let mainRest = document.getElementsByClassName('restaurant')

      let newDiv = document.createElement('div');
      let macroImg = document.createElement('img');
      macroImg.classList.add('detail-image');
      let macroName = document.createElement('h2');
      macroName.classList.add('name');
      let macroRest = document.createElement('h3');
      macroRest.classList.add('restaurant');


      macroImg.src = ramen.image
      macroName.textContent = ramen.name
      macroRest.textContent = ramen.restaurant

      newDiv.appendChild(macroImg);
      newDiv.appendChild(macroName);
      newDiv.appendChild(macroRest);


    });

    imgCreate.addEventListener("click", (e) => {
        // console.log('I was clicked')
        let ratingTab = document.getElementById('rating-display')
        let commentTab = document.getElementById('comment-display')

        ratingTab.innerHTML = ramen.rating
        commentTab.innerHTML = ramen.comment

  })

}
// renderOneRamen()
  
  function initialize() {
    getAllImages();
  }


const form = document.querySelector('#new-ramen');

// console.log(form)
form.addEventListener('submit', (event) => {
    console.log('New data was added')
    event.preventDefault();

    let newName = document.querySelector('#new-name').value;
    let newRestaurant = document.querySelector('#new-restaurant').value;
    let newImage = document.querySelector('#new-image').value;
    let newRating = document.querySelector('#new-rating').value;
    let newComment = document.querySelector('#new-comment').value;

    // check if input is empty
    if (newName === ""){
      alert ('Name is empty')
    }
    // constructing the JSON object
    let data = {
      name: newName,
      restaurant: newRestaurant,
      image: newImage,
      rating: newRating,
      comment: newComment,
    }

    data = JSON.stringify(data);
    console.log(data)


    fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.name) {
        console.log("succes");
      } else {
        console.log("Failure");
      }
    })
    .catch(function (error) {
      console.log("There was an error");
      console.log("Error", error);
    });
    form.reset();
})