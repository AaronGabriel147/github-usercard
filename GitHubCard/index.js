import axios from 'axios';
/* DONE - STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>

DONE - STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

DONE - STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">                            
      <img src={image url of user} />              // res.data.avatar_url
      <div class="card-info">
        <h3 class="name">{users name}</h3>         // res.data.name
        <p class="username">{users user name}</p>  // res.data.login
        <p>Location: {users location}</p>          // res.data.location
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>        // res.data.html_url           // "GitHub Page Link"
        <p>Followers: {users followers count}</p> // res.data.followers
        <p>Following: {users following count}</p> // res.data.following
        <p>Bio: {users bio}</p>                   // res.data.bio       
      </div>
    </div> */

/*
DONE - STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/
/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers, or
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/


function gitHubCardMaker(user) {

  // Creating elements. With indentation.
  const container = document.createElement('div') // Parent element of card
    const userImg = document.createElement('img')
    const cardContent = document.createElement('div') 
      const userNameHeading = document.createElement('h3')
      const userName = document.createElement('p')
      const userLocation = document.createElement('p')
      const userProfile = document.createElement('p')
        const userGithubLink = document.createElement('a')
      const userFollowerCount = document.createElement('p')
      const userFollowingCount = document.createElement('p')
      const userBio = document.createElement('p')

  // Creating classes.
  container.classList.add('card')
  cardContent.classList.add('card-info')
  userNameHeading.classList.add('name')
  userName.classList.add('username')

  // Adding values.
  userImg.src = user.data.avatar_url    
  userNameHeading.textContent = user.data.name
  userName.textContent = user.data.login
  userLocation.textContent = `Location: ${user.data.location}`
  userProfile.textContent = 'Profile: '
  userGithubLink.href = user.data.html_url
  userGithubLink.title = "User's Github Link"
  userGithubLink.textContent = user.data.html_url
  userFollowerCount.textContent = `Followers: ${user.data.followers}`
  userFollowingCount.textContent = `Following: ${user.data.following}`
  userBio.textContent = `Bio: ${user.data.bio}`

  // Appending elements. With Indentation.
  container.appendChild(userImg)
  container.appendChild(cardContent)
    cardContent.appendChild(userNameHeading)
    cardContent.appendChild(userName)
    cardContent.appendChild(userLocation)
    cardContent.appendChild(userProfile)
      userProfile.appendChild(userGithubLink)
    cardContent.appendChild(userFollowerCount)
    cardContent.appendChild(userFollowingCount)
    cardContent.appendChild(userBio)

  return container; // Return parent element.
}

const userName = "aarongabriel147"
axios.get(`https://api.github.com/users/${userName}`)
.then(user => {
  const newGithubUserCard = gitHubCardMaker(user)
  document.querySelector('.cards').appendChild(newGithubUserCard)
  console.log(user.data)
  axios.get(user.data.followers_url)
  .then((res) => {
    console.log(res.data)
    res.data.forEach((follower) => {
      axios.get(follower.url)
      .then((res) => {
        const newGithubUserCard = gitHubCardMaker(res)
        document.querySelector('.cards').appendChild(newGithubUserCard)
      })
    })
    followersArray.forEach((follower) => {
      axios.get(`https://api.github.com/users/${follower}`)
      .then((res) => {
        const newGithubUserCard = gitHubCardMaker(res)
        document.querySelector('.cards').appendChild(newGithubUserCard)
      })
    })
  })
})
.catch((err) => {
  console.log('This is not working.', err)
});

const followersArray = [
  'tetondan',
  'dustinmyers',
  'justsml',
  'luishrd',
  'bigknell'
];



