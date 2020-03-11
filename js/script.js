/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

const studentList = document.querySelectorAll('.student-item');
const numberOfItems = 10; 


/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

function showPage(list, page) {
   const startIndex = (page * numberOfItems) - numberOfItems; 
   const endIndex = page * numberOfItems; 

   for(let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }
}


/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

function appendPageLinks(list) {
   const page = document.querySelector('.page');
   const pagination = document.createElement('div'); 
   const ul = document.createElement('ul');
   pagination.classList.add('pagination');
   page.appendChild(pagination);
   pagination.appendChild(ul);

   for(let i = 0; i <= (list.length / numberOfItems); i++) {
      ul.innerHTML += `<li><a href="#">${i}</a></li>`; 
   }

   ul.firstElementChild.firstElementChild.className = 'active';
   
   const anchor = document.querySelectorAll('.pagination a'); 
   pagination.addEventListener('click', (e) => {
      for(let i = 0; i < anchor.length; i++) {
         if(e.target === anchor[i]) {
            anchor[i].classList.add('active');
            showPage(studentList, i);
         } else {
            anchor[i].classList.remove('active');
         }
      }
      e.preventDefault();
   });
}

showPage(studentList, 1);
appendPageLinks(studentList);



// Remember to delete the comments that came with this file, and replace them with your own code comments.