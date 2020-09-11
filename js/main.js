//global inti 

let BackgroundInterval;

let switchMode = true;

//Global Function To Toggle Class Active between Elements

const toggleClassActive = (ev) => {
    
    //Remove Class Active From All
    ev.target.parentElement.querySelectorAll('.active').forEach(element=>{
        element.classList.remove('active')
    })

    //Add Class Active To Clicable Element
    ev.target.classList.add('active')
}

//Check If Local Storage Save Color Or Not

let mainColor = localStorage.getItem('main-color');

if(mainColor != null){

    // Add Saved Color To Main Color From Local Storage
    document.documentElement.style.setProperty('--main-color', mainColor); 

    //Edit Active Class When Reload 

    document.querySelectorAll('.colors li').forEach(element=>{
        element.classList.remove('active')

        if(element.dataset.color === mainColor){
            element.classList.add('active')
        }
    })

}

//Check If Local Storage Switch Mode Of Random Background

let rndBkg = localStorage.getItem('background_option');

if(rndBkg != null){
    
    //remove active class from all span 

    document.querySelectorAll('.background-options span').forEach(item=>{
        item.classList.remove('active')
    })

    if(rndBkg === 'true'){
        switchMode = true;
        document.querySelector('.yes').classList.add('active');
    }else{
        switchMode = false;
        document.querySelector('.no').classList.add('active');
    }

}

//Show-Hide Setting Box

document.querySelector('.toggle-settings .fa-gear').onclick = () => {
    document.querySelector('.toggle-settings .fa-gear').classList.toggle('fa-spin');
    document.querySelector('.setting-box').classList.toggle('open');
}

//Change Colors

let colorsLi = document.querySelectorAll('.colors li');

colorsLi.forEach(li => {

    li.addEventListener('click',(e)=>{

        //Get Color from Data in List Element
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color); 

        //Save the Color iN Local Storage
        localStorage.setItem('main-color', e.target.dataset.color)

        toggleClassActive(e);
    })

})

//Switch Background

let swithBackground = document.querySelectorAll('.background-options span');

swithBackground.forEach(span => {

    span.addEventListener('click',(e)=>{

        toggleClassActive(e);

        //Check Switch Mode

        if(e.target.dataset.background === 'yes'){
            switchMode = true;
            randomizeBackground();
            localStorage.setItem('background_option',true);
        }else{
            switchMode = false;
            clearInterval(BackgroundInterval);
            localStorage.setItem('background_option',false);
        }
    })

})

//Show & Hide Navigation Bullets

//check localstorge values

let navigationOptions = document.querySelectorAll('.navigation-options span');

let navOptionVal = localStorage.getItem('navigation_option');

if(navOptionVal != null){

    navigationOptions.forEach(span=>{
        span.classList.remove('active');
    })

    if(navOptionVal === 'true'){
        document.querySelector('.navigation-bullet').style.display = 'block';
        document.querySelector('.navigation-options .yes').classList.add('active');
    }else{
        document.querySelector('.navigation-bullet').style.display = 'none';
        document.querySelector('.navigation-options .no').classList.add('active');
    }
}

navigationOptions.forEach(span => {

    span.addEventListener('click',(e)=>{

        toggleClassActive(e);

        //Check option value

        if(e.target.dataset.show === 'yes'){
            document.querySelector('.navigation-bullet').style.display = 'block';
            localStorage.setItem('navigation_option',true);
        }else{
            document.querySelector('.navigation-bullet').style.display = 'none';
            localStorage.setItem('navigation_option',false);
        }

    })

})


//Change Landing Page Background Image

let landingPage = document.querySelector('.landing-page');

let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

const randomizeBackground = () => {

    if(switchMode === true){
        BackgroundInterval = setInterval(()=>{

            let randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            landingPage.style.backgroundImage = 'url("images/'+ imgsArray[randomNumber] +'")';
        
        },10000)
    }

}

randomizeBackground();

//Change width of score and assist for player on Scroll to team section

let legendHeight = document.querySelector('.our-legends');

window.onscroll = () => {
    let legendOffsetTop = legendHeight.offsetTop;

    let legendOuterHeight = legendHeight.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScrollTop = this.pageYOffset;

    if(windowScrollTop >= (legendOffsetTop + legendOuterHeight - windowHeight)){
        let allGoals = document.querySelectorAll('.goals');
        
        allGoals.forEach(element=>{
            element.style.width = element.dataset.goals;
            element.childNodes[1].style.display = 'block';
        });
      
        let allAssests = document.querySelectorAll('.assests');
        
        allAssests.forEach(element=>{
            element.style.width = element.dataset.assest;
            element.childNodes[1].style.display = 'block';
        });

    }

    //Display Scroll Top Button And Active It

    if(window.pageYOffset >= 350){
        document.querySelector('.scrollTop-btn').style.display = 'block';
    }else{
        document.querySelector('.scrollTop-btn').style.display = 'none';
    }

    //Change Background Of NavBar When Scroll
    
    if(window.pageYOffset > 60){
        document.querySelector('.header-area').classList.add('fixed');
	document.querySelector('.header-toggler').style.setProperty('color','#fff');
	document.querySelector('.landing-page .header-area.fixed').style.padding = '15px;
	document.querySelector('.landing-page .header-area.fixed').style.height = '87px';
    }else{
        document.querySelector('.header-area').classList.remove('fixed');
	document.querySelector('.header-toggler').style.setProperty('color','var(--main-color)');
    }
}

//Create PopUp Box to Images In Gallary

let gallaryImages = document.querySelectorAll('.gallary-box img');

gallaryImages.forEach(img => {
    
    img.addEventListener('click', ()=>{

        let popupOverlay = document.createElement('div');
        popupOverlay.className = 'popup-overlay';

        document.body.appendChild(popupOverlay)
        
        let overlay_box = document.createElement('div');
        overlay_box.className = 'overlay-box';

        let popupImg = document.createElement('img');
        popupImg.src = img.src;

        if(img.alt != null){
            let imgDesc = document.createElement('h2');

            let text = document.createTextNode(img.alt);

            imgDesc.appendChild(text);

            overlay_box.appendChild(imgDesc);
        }

        overlay_box.appendChild(popupImg)

        document.body.appendChild(overlay_box)

        //add close button

        let closeButton = document.createElement('span');

        closeButton.className = 'close-btn';

        let closeButtonText = document.createTextNode('X');

        closeButton.appendChild(closeButtonText);

        overlay_box.appendChild(closeButton)

    })

})

//close popup by click close Button

document.addEventListener('click', (e) => {
    if(e.target.className === 'close-btn'){
        e.target.parentNode.remove();

        document.querySelector('.popup-overlay').remove();
    }
})

//Testimonials Carousel

let testimonialsNav = document.querySelectorAll('.testimonials-navigator span');

testimonialsNav.forEach(element => {
    
    element.addEventListener('click', (e)=>{

        testimonialsNav.forEach(span=>{
            span.classList.remove('active');
        })

        e.target.classList.add('active')

        document.querySelectorAll('.ts-boxs').forEach(div => {
            div.style.opacity = 0;
        })

        document.querySelector(e.target.dataset.class).style.opacity = 1;
        
    })
})

//Navigation Bullets Scroll to Sections

let navigationBullets = document.querySelectorAll('.bullet');

//Function To Scroll To Any Where

const scrollIntoViewFun = (elements) => {
    elements.forEach(ele => {
        ele.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior : 'smooth'
            });
        })
    })  
}

scrollIntoViewFun(navigationBullets);

//Navbar Links Scroll

let navbarLinks = document.querySelectorAll('.header-area .links a');

scrollIntoViewFun(navbarLinks);

//Reset Button

document.querySelector('.reset_options').onclick = () => {
    
    localStorage.clear();

    window.location.reload();

}

//Navbar Toggler Button

let toggleBtn = document.querySelector('.header-toggler');

let menu = document.querySelector('.links');

toggleBtn.onclick = e => {

    e.stopPropagation();

    toggleBtn.classList.toggle('opened');

    menu.classList.toggle('open')

}

//Check If click on any place not menu & button

document.addEventListener('click', e => {
    if(e.target !== toggleBtn && e.target !== menu){
        if(menu.classList.contains('open')){
            menu.classList.toggle('open')
            toggleBtn.classList.toggle('opened')
        }
    }
})

//Stop Propogation

menu.onclick = e => {
    e.stopPropagation();
}

//Display Scroll Top Button And Active It

document.querySelector('.scrollTop-btn').onclick = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

//preload Code

function Ticker( elem ) {
	elem.lettering();
	this.done = false;
	this.cycleCount = 5;
	this.cycleCurrent = 0;
	this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()-_=+{}|[]\\;\':"<>?,./`~'.split('');
	this.charsCount = this.chars.length;
	this.letters = elem.find( 'span' );
	this.letterCount = this.letters.length;
	this.letterCurrent = 0;

	this.letters.each( function() {
		var $this = $( this );
		$this.attr( 'data-orig', $this.text() );
		$this.text( '-' );
	});
}

Ticker.prototype.getChar = function() {
	return this.chars[ Math.floor( Math.random() * this.charsCount ) ];
};

Ticker.prototype.reset = function() {
	this.done = false;
	this.cycleCurrent = 0;
	this.letterCurrent = 0;
	this.letters.each( function() {
		var $this = $( this );
		$this.text( $this.attr( 'data-orig' ) );
		$this.removeClass( 'done' );
	});
	this.loop();
};

Ticker.prototype.loop = function() {
	var self = this;

	this.letters.each( function( index, elem ) {
		var $elem = $( elem );
		if( index >= self.letterCurrent ) {
			if( $elem.text() !== ' ' ) {
				$elem.text( self.getChar() );
				$elem.css( 'opacity', Math.random() );
			}
		}
	});

	if( this.cycleCurrent < this.cycleCount ) {
		this.cycleCurrent++;
	} else if( this.letterCurrent < this.letterCount ) {
		var currLetter = this.letters.eq( this.letterCurrent );
		this.cycleCurrent = 0;
		currLetter.text( currLetter.attr( 'data-orig' ) ).css( 'opacity', 1 ).addClass( 'done' );
		this.letterCurrent++;
	} else {
		this.done = true;
	}

	if( !this.done ) {
		requestAnimationFrame( function() {
			self.loop();
		});
	} else {
		setTimeout( function() {
			self.reset();
		}, 1250 );
	}
};

$words = $( '.word' );

$words.each( function() {
	var $this = $( this ),
		ticker = new Ticker( $this ).reset();
	$this.data( 'ticker', ticker  );
});

//Disable preLoad 

$(document).ready(function(){
    let color = localStorage.getItem('main-color');
    console.log(color); 
    if(color != null){
        $('.preload').css('background-color',color);
    }else{
        $('.preload').css('background-color','var(--main-color)');    
    }

    setTimeout(()=>{
        $('.word').fadeOut(1000);
        $('.preload .overlay').fadeOut(1200);
        $('.preload').fadeOut(1300);
    },10000)
})
