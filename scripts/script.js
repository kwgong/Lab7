// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('./sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        let main = document.querySelector('main');
        main.appendChild(newPost);
        newPost.addEventListener('click', function(event){
          let list = document.querySelector('main').childNodes;
          let i = 0;
          for (const entry of list){
            i++; 
            if(entry == newPost){
              document.querySelector('entry-page').entry = newPost.entry;
              router.setState(1, i, null, null, newPost);
            }
          }
        });
      });
    });
});

let homeButton = document.querySelector('h1');
homeButton.addEventListener('click', () => {
  router.setState(2); 
});

let settingButton = document.querySelector('img');
settingButton.addEventListener('click', () => {
  router.setState(3);
});

window.onpopstate = function(event){
  router.setState(0,0,true, event.state);
}
 