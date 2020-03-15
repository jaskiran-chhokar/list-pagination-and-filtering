// Declare Global Variables
const studentList = document.querySelectorAll('.student-item');
const pageClass = document.querySelector('.page');
const numberOfItems = 10; 

// Set Variable for No Search Results
const noMatches = document.createElement('h3');
pageClass.appendChild(noMatches);

// Create Show Page Function
const showPage = (list, page) => {
   const startIndex = (page * numberOfItems) - numberOfItems; 
   const endIndex = page * numberOfItems; 

   if(list.length > 0) {
      noMatches.style.display = 'none';
   } else if (list.length === 0) {
      noMatches.style.display = 'block';
      noMatches.textContent = 'sorry, no matches found.';
   } 

   for(let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
         list[i].style.display = '';
      } else {
         list[i].style.display = 'none';
      }
   }
}

// Create Append Page Links Function
const appendPageLinks = list => {
   const pagination = document.createElement('div'); 
   const ul = document.createElement('ul');
   pagination.classList.add('pagination');
   pageClass.appendChild(pagination);
   pagination.appendChild(ul);

   for(let i = 1; i < (list.length / numberOfItems + 1); i++) {
      ul.innerHTML += `<li><a href="#">${i}</a></li>`; 
   }

   if(!(ul.innerHTML === '')) {

      ul.firstElementChild.firstElementChild.className = 'active';
      
      const anchor = document.querySelectorAll('.pagination a'); 
      pagination.addEventListener('click', e => {

         for(let i = 0; i < anchor.length; i++) {
            if(e.target !== anchor[i]) {
               anchor[i].classList.remove('active');
            }      
         }
         e.target.classList.add('active');
         showPage(list, e.target.textContent);
         e.preventDefault();
      });

   }
}

showPage(studentList, 1);
appendPageLinks(studentList);

// Dynamically Insert Search Menu 
const insertSearchMenu = () => {
   const pageHeader = document.querySelector('.page-header'); 
   const studentSearchDiv = document.createElement('div'); 
   studentSearchDiv.className = 'student-search'; 
   studentSearchDiv.innerHTML = `<input placeholder="Search for students..."><button>Search</button>`; 
   pageHeader.appendChild(studentSearchDiv);
}

insertSearchMenu();

// Add Search Functionality to Search Bar
const searchInput = document.querySelector('.student-search input'); 
const searchButton = document.querySelector('.student-search button'); 
const names = document.querySelectorAll('.student-details h3');
let paginationResults = []; 

const search = (searchInput, names) => {

   const paginationContain = document.querySelector('.pagination');

   paginationResults = [];

   for(let i = 0; i < names.length; i++) {
      let name = names[i].parentElement.parentElement;
      name.style.display = 'none';

      if(searchInput.value !== 0 && names[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
         name.style.display = 'block';
         paginationResults.push(name);
      }

      if(searchInput.value === '') {
         name.style.display = 'block';
      } 
   }
   
   paginationContain.remove();
   appendPageLinks(paginationResults);
   showPage(paginationResults,1);
}

searchInput.addEventListener('keyup', () => {
   search(searchInput, names);
});

searchButton.addEventListener('click', e => {
   search(searchInput, names);
   e.preventDefault();
});