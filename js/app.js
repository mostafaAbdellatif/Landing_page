/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sectionsListArray  = []; //array that stores the list of sections
const sectionsList = document.createElement('ol'); // the list element that contain the sections
const navBar = document.getElementById('navbar__list'); //the nav bar ul list
navBar.setAttribute('class','navbar__menu ');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// function to intialize list containing sections in the page
function intializeSections (){
    let sectionEnds = false;
    let i =1;
    const listFragment = document.createDocumentFragment();
    while(!sectionEnds){
        section = document.getElementById('section'+i);
        if(section == null){
            break;
        }
        listFragment.appendChild(section);
        sectionsListArray.push(section);
        i++
    }
    sectionsList.appendChild(listFragment);
}
// function to activate class and deactivate another.
function activateClass(){
    for(let i = 0;i<sectionsListArray.length;i++){
        //get the current section
        const sectionBox = sectionsListArray[i].getBoundingClientRect();
        if(sectionBox.top <=150 && sectionBox.bottom>=150){
            //if the section is in the viewport activate it
            const viewPortSection = document.getElementById(('section'+(i+1)));
            viewPortSection.setAttribute('class','your-active-class');
            let navCurrent = document.querySelector(".section"+(i+1));
            navCurrent.classList.add("active_class");
            
        }
        else{
            const viewPortSection = document.getElementById('section'+(i+1));
            viewPortSection.removeAttribute('class');
            let navCurrent = document.querySelector(".section"+(i+1));
            navCurrent.classList.remove("active_class");
        }
    }    
}


//function to build the navigation bar
function buildNavBar(){
    const listFragment = document.createDocumentFragment();
    for(let i= 0 ;i<sectionsListArray.length;i++){
        let sectionList = document.createElement('li');
        //sectionList.innerText=("section"+(i+1));
        // Scroll to section on link click
        sectionList.innerHTML=`<a class="section${i+1} navbar__menu menu__link" href="#section${i+1}"; onclick="return false";> section${i+1} </a>`;
        listFragment.appendChild(sectionList);
    }
    navBar.appendChild(listFragment);
    // a listner function to all the childs of the sections in navigation list
    // delegation concept is applied to navigate to the clicked child
    navBar.addEventListener('click',function(evt){
        const sectionNumber = evt.target.getAttribute("href");
        const sectionElement = document.querySelector(`${sectionNumber}`);
        sectionElement.scrollIntoView({behavior: "smooth"});
    })
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

//get the sections and add them as a child of the newly created ordered list
intializeSections();
const header = document.querySelector('.main__hero');
header.insertAdjacentElement('afterend',sectionsList);
//we now have the sections combined in an ordered list

// build the nav
// Scroll to section on link click
buildNavBar();

// Add class 'active' to section when near top of viewport
// Set sections as active
document.addEventListener('scroll',function(){
    activateClass();
})


/**
 * End Main Functions


*/




