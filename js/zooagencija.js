var popupStatusRADOVI;
	var divRADOVI;
	var hashRADOVI;
	var q, r, s;

var zooagencijaSite = (function() {
	var settings = {},
		defaults = {
			startAt: 0,
			sectionCheckInterval: 1000,
			clampWidth: 1600,
			tracking: false
		},
		scrollAnimate,
		currentSection = -1,
		checkSectionLock = 0,
		updateCount = 0, 
		loadProgress;

	var wHeight, wWidth, wCenter, outroComp, ratio;
	var $scrollBar, $scrollThumb, isScrolling, scrollBarHeight, scrollThumbHeight, thumbDelta, scrollThumbPosition, scrollPercent;
	var pulseReminders = 3; //
	var t = 0;
	var totalHeightPx = 10000;
	var outroHeightPx = 1800;
	var detailStart = 2000;
	var outroStart = 1150;
	var outroLength = 0;
	var eventsDelta = 0;
	var maxScroll = 0; 
	var sectionIndex = [
		{id:"#slide1",name:"slide1",tag:"#slide1",position:0,correct:false},
		{id:"#slide2",name:"slide2",tag:"#slide2",position:201,correct:false},
		{id:"#slide3",name:"slide3",tag:"#slide3",position:400,correct:false},
		{id:"#slide4",name:"slide4",tag:"#slide4",position:600,correct:false},
		{id:"#slide5",name:"slide5",tag:"#slide5",position:801,correct:false},
		{id:"#slide6",name:"slide6",tag:"#slide6",position:1002,correct:false},
		{id:"#slide7",name:"slide7",tag:"#slide7",position:1203,correct:false},
		{id:"#slide8",name:"slide8",tag:"#slide8",position:1404,correct:false},
		{id:"#slide9",name:"slide9",tag:"#slide9",position:1605,correct:false},
		{id:"#slide10",name:"slide10",tag:"#slide10",position:1806,correct:false},
		{id:"#slide11",name:"slide11",tag:"#slide11",position:2007,correct:false},
	];
	outroLength = 1000;
	maxScroll = outroStart+outroLength;
	var i2delta = 50;
	var animation = [
	         		{
	         			selector: '#verticalScrollArea',
	         			startAt: 0,
	         			endAt: detailStart,
	         			onEndAnimate:function( anim ) {
	         			},
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					properties: {
	         						top: 0
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Linear.EaseNone,
	         					onInit: function( anim ) {
									this.properties['top'] = -10000 +  Math.max( ((wHeight-1000)/2) , 0);

     							},
	         					properties: {
	         					}
	         				}
	         			]
	         		},
	         		//---------------------------------------------
	         		//SLIDE 1
	         		//---------------------------------------------
        			{
	         			selector: '#slide1',
	         			startAt: 25,
	         			endAt: 350,
	         			onEndAnimate:function( anim ) {},
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					properties: {
	         						"background-position" : {x:"50%", y: 0}
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Sinusoidal.EaseInOut,
	         					properties: {
	         						"background-position" : {x:"50%", y: 850}
	         					}
	         				}
	         			]
	         		},
					//---------------------------------------------
	         		//SLIDE 5
	         		//---------------------------------------------
        			{
	         			selector: '#slide5',
	         			startAt: 450,
	         			endAt: 1150,
	         			onEndAnimate:function( anim ) {},
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					properties: {
	         						"background-position" : {x:"50%",y: -900}
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Sinusoidal.EaseInOut,
	         					properties: {
	         						"background-position" : {x:"50%",y: 900}
	         					}
	         				}
	         			]
	         		},
	         		{
	         			selector: '#slide5 > .content > .bg1',
	         			startAt: 450,
	         			endAt: 1250,
	         			onEndAnimate:function( anim ) {},
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					properties: {
	         						"top": -650
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Sinusoidal.EaseOut,
	         					properties: {
	         						"top": 1250
	         					}
	         				}
	         			]
	         		},
					//---------------------------------------------
	         		//SLIDE 6
	         		//---------------------------------------------
        			{
	         			selector: '#slide6',
	         			startAt: 650,
	         			endAt: 1850,
	         			onEndAnimate:function( anim ) {},
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					properties: {
	         						"background-position" : {x:"50%",y: -350}
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Sinusoidal.EaseInOut,
	         					properties: {
	         						"background-position" : {x:"50%",y: 1800}
	         					}
	         				}
	         			]
	         		},
					//---------------------------------------------
	         		//SLIDE 10
	         		//---------------------------------------------
        			{
	         			selector: '#slide10',
	         			startAt: 1050,
	         			endAt: 2550,
	         			onEndAnimate:function( anim ) {},
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					properties: {
	         						"background-position" : {x:"50%",y: -900}
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Sinusoidal.EaseInOut,
	         					properties: {
	         						"background-position" : {x:"50%",y: 900}
	         					}
	         				}
	         			]
	         		}
	         		];
	function checkSection() {
		if (checkSectionLock>0) {
			checkSectionLock--;
			return;
		}
		var scrollTop = scrollAnimate.getScrollTop();
		var extraFudgeFactor = Math.max(0,wHeight-1000);
		for (var i = 0; i<sectionIndex.length; i++) {
			
			var section = sectionIndex[i];
			
			var actualScrollTop = section.correct ? scrollTop+ratio+extraFudgeFactor : scrollTop;
			if (actualScrollTop > section.position ) {
				var sectionEnd = (i==sectionIndex.length-1) ? scrollAnimate.getMaxScroll()+ratio+extraFudgeFactor : sectionIndex[i+1].position;
				if (actualScrollTop < sectionEnd) {
					//if (i>11)
						//alert(sectionEnd);
						//pulseReminders = 0;
						if((i!=1) && (i!=2) && (i!=3) && (i!=4) && (i!=5) && (i!=7)) {
						enterSection(i);
						}
					return;
				}
			}
		};
	}
	function gotoSectionTag(sectionTag) {
		for (var i = 0; i<sectionIndex.length; i++) {
			if (sectionIndex[i].tag===sectionTag) {
				//alert(sectionTag);
				var newpos = sectionIndex[i].position + 1;
				//console.log(ratio);
				if (sectionIndex[i].correct == true ) 
					newpos -=ratio;
				scrollAnimate.scrollTo( newpos);
				enterSection(i);
				return;
			}
		}
	}
	function enterSection(index) {
		if (currentSection==index) {
			return;
		}
		//alert(index);
		currentSection = index;
		
		$('#navigation > a').each( function(i, elm){
											
			if(index == 6) {
				index = 1;
			} else if(index == 8) {
				index = 2;
			} else if(index == 9) {
				index = 3;
			} else if(index == 10) {
				index = 4;
			}
			
			if (i==index) {
				$(elm).addClass('active');
			} else {
				$(elm).removeClass('active');
			}
		});
	}
	function initalizeNavigation() {
		var navContent = "";
		
		$('.nav-link').click( function(e) {	
			e.preventDefault();
			var hash = this.href.substring( this.href.indexOf('#') );
			checkSectionLock = 1;
			pulseReminders = 0;
			gotoSectionTag(hash);
			return false;
		});
		
		enterSection(0);
	}
	function activateScrollBar(thumbHeight) {
		scrollThumbHeight = thumbHeight;
		scrollThumbPosition = 0;
		scrollPercent = 0;
		isScrolling = false;
		$scrollBar = $('#scrollBar');
		$scrollBar.show();
		$scrollThumb = $('#scrollBar .thumb');
		$scrollThumb.css('height',scrollThumbHeight+"px");
		$scrollThumb.bind('mousedown', startScroll);
	}
	function resizeScrollBar() {
		scrollBarHeight = wHeight;
		$scrollBar.css('height',scrollBarHeight+"px");
		setScrollBarPosition(scrollPercent);
	}
	function startScroll(event) {
		isScrolling = true;
		thumbDelta = scrollThumbPosition - event.pageY;
		$(document).bind('mousemove', scrollUpdate);
		$(document).bind('mouseup', endScroll);
		return false;
	}
	function scrollUpdate(event) {
		scrollThumbPosition = event.pageY+thumbDelta;
		scrollThumbPosition = Math.max(0, Math.min(scrollBarHeight-scrollThumbHeight, scrollThumbPosition));
		scrollPercent = scrollThumbPosition/(scrollBarHeight-scrollThumbHeight);
		scrollPercent = Math.max(0, Math.min(1, scrollPercent));
		scrollAnimate.scrollTo( maxScroll*scrollPercent );
		return false;
	}
	function setScrollBarPosition(percent) {
		scrollThumbPosition = (scrollBarHeight-scrollThumbHeight)*percent;
		$scrollThumb.css('top',scrollThumbPosition);
	}
	function endScroll(event) {
		isScrolling = false;
		$(document).unbind('mousemove', scrollUpdate);
		$(document).unbind('mouseup', endScroll);
		return false;
	}
/* ----------------------------------------------------------- BAVIMO START */
function centerPopup1(){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#mouseUP1").height();
	var popupWidth = $("#mouseUP1").width();
	//centering
	$("#mouseUP1").css({
		"top": 265,
		"left": windowWidth/2-popupWidth/2+150
	});
}
function centerPopup2(){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#mouseUP2").height();
	var popupWidth = $("#mouseUP2").width();
	//centering
	$("#mouseUP2").css({
		//"top": windowHeight/2-popupHeight/2,
		"top": 265,
		"left": windowWidth/2-popupWidth/2+150
	});
}
function centerPopup3(){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#mouseUP3").height();
	var popupWidth = $("#mouseUP3").width();
	//centering
	$("#mouseUP3").css({
		//"top": windowHeight/2-popupHeight/2,
		"top": 265,
		"left": windowWidth/2-popupWidth/2+150
	});
}
function centerPopup4(){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#mouseUP4").height();
	var popupWidth = $("#mouseUP4").width();
	//centering
	$("#mouseUP4").css({
		//"top": windowHeight/2-popupHeight/2,
		"top": 265,
		"left": windowWidth/2-popupWidth/2+150
	});
}
function centerPopup5(){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#mouseUP5").height();
	var popupWidth = $("#mouseUP5").width();
	//centering
	$("#mouseUP5").css({
		//"top": windowHeight/2-popupHeight/2,
		"top": 265,
		"left": windowWidth/2-popupWidth/2+150
	});
}
function centerPopup6(){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#mouseUP6").height();
	var popupWidth = $("#mouseUP6").width();
	//centering
	$("#mouseUP6").css({
		//"top": windowHeight/2-popupHeight/2,
		"top": 265,
		"left": windowWidth/2-popupWidth/2+150
	});
}
function centerPopup7(){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#mouseUP7").height();
	var popupWidth = $("#mouseUP7").width();
	//centering
	$("#mouseUP7").css({
		//"top": windowHeight/2-popupHeight/2,
		"top": 265,
		"left": windowWidth/2-popupWidth/2+150
	});
}
function centerPopup8(){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#mouseUP8").height();
	var popupWidth = $("#mouseUP8").width();
	//centering
	$("#mouseUP8").css({
		//"top": windowHeight/2-popupHeight/2,
		"top": 265,
		"left": windowWidth/2-popupWidth/2+150
	});
}
function centerPopup9(){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#mouseUP9").height();
	var popupWidth = $("#mouseUP9").width();
	//centering
	$("#mouseUP9").css({
		//"top": windowHeight/2-popupHeight/2,
		"top": 265,
		"left": windowWidth/2-popupWidth/2+150
	});
}
function centerPopup10(){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#mouseUP10").height();
	var popupWidth = $("#mouseUP10").width();
	//centering
	$("#mouseUP10").css({
		//"top": windowHeight/2-popupHeight/2,
		"top": 265,
		"left": windowWidth/2-popupWidth/2+150
	});
}
function centerPopup11(){
	//request data for centering
	var windowWidth = document.documentElement.clientWidth;
	var windowHeight = document.documentElement.clientHeight;
	var popupHeight = $("#mouseUP11").height();
	var popupWidth = $("#mouseUP11").width();
	//centering
	$("#mouseUP11").css({
		//"top": windowHeight/2-popupHeight/2,
		"top": 265,
		"left": windowWidth/2-popupWidth/2+150
	});
}
/* ----------------------------------------------------------- RADOVI START */
function loadPopupRADOVI(divRADOVI, hashRADOVI){
	if(popupStatusRADOVI==0){
		$(divRADOVI).hide();
		$('#back_fader').show();
		$('#popup').show();
		//$('body').addClass('freeze');
		$("#popup").load("portfolio/" + hashRADOVI + "/_index.html");
		window.history.pushState("", "ZOO Agencija", "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html");
		scrollAnimate.pause();
		popupStatusRADOVI = 1;
	}
}
function unloadPopupRADOVI(divRADOVI, hashRADOVI){
	if(popupStatusRADOVI==1){
		$(divRADOVI).show();
		$("#popup").empty();
		$('#back_fader').hide();
		$('#popup').hide();
		scrollAnimate.resume();
		//$('body').removeClass('freeze');
		window.history.pushState("", "ZOO Agencija", "http://zooagencija.hr/");
		popupStatusRADOVI = 0;
	}
}
function showRADOVI_AFTER(q,r,s){ 
	document.getElementById('sr_' + r).setAttribute('src','imgR/s'+q+'r'+r+'_'+s+'.jpg');
}
/* ----------------------------------------------------------- RADOVI END */
function isTouch() {
	return 'ontouchstart' in window;
}
function track(a,b,c) {
	if (settings.tracking==true) {
	}
}
function initalizePage() {
// ---------------------------------------------------------------------------------------------------- BAVIMO //
	$("#MO01").mouseover(function(){
		centerPopup1();
		$("#mouseUP1").show();
		scrollAnimate.pause();
	});
	$("#MO01").mouseout(function(){
		$("#mouseUP1").hide();
		scrollAnimate.resume();
	});
	$("#MO01").click(function(event){
		event.preventDefault();
	});
	
	$("#MO02").mouseover(function(){
		centerPopup2();
		$("#mouseUP2").show();
		scrollAnimate.pause();
	});
	$("#MO02").mouseout(function(){
		$("#mouseUP2").hide();
		scrollAnimate.resume();
	});
	$("#MO02").click(function(event){
		event.preventDefault();
	});
	
	$("#MO03").mouseover(function(){
		centerPopup3();
		$("#mouseUP3").show();
		scrollAnimate.pause();
	});
	$("#MO03").mouseout(function(){
		$("#mouseUP3").hide();
		scrollAnimate.resume();
	});
	$("#MO03").click(function(event){
		event.preventDefault();
	});
	
	$("#MO04").mouseover(function(){
		centerPopup4();
		$("#mouseUP4").show();
		scrollAnimate.pause();
	});
	$("#MO04").mouseout(function(){
		$("#mouseUP4").hide();
		scrollAnimate.resume();
	});
	$("#MO04").click(function(event){
		event.preventDefault();
	});
	
	$("#MO05").mouseover(function(){
		centerPopup5();
		$("#mouseUP5").show();
		scrollAnimate.pause();
	});
	$("#MO05").mouseout(function(){
		$("#mouseUP5").hide();
		scrollAnimate.resume();
	});
	$("#MO05").click(function(event){
		event.preventDefault();
	});
	
	$("#MO06").mouseover(function(){
		centerPopup6();
		$("#mouseUP6").show();
		scrollAnimate.pause();
	});
	$("#MO06").mouseout(function(){
		$("#mouseUP6").hide();
		scrollAnimate.resume();
	});
	$("#MO06").click(function(event){
		event.preventDefault();
	});
	
	$("#MO07").mouseover(function(){
		centerPopup7();
		$("#mouseUP7").show();
		scrollAnimate.pause();
	});
	$("#MO07").mouseout(function(){
		$("#mouseUP7").hide();
		scrollAnimate.resume();
	});
	$("#MO07").click(function(event){
		event.preventDefault();
	});
	
	$("#MO08").mouseover(function(){
		centerPopup8();
		$("#mouseUP8").show();
		scrollAnimate.pause();
	});
	$("#MO08").mouseout(function(){
		$("#mouseUP8").hide();
		scrollAnimate.resume();
	});
	$("#MO08").click(function(event){
		event.preventDefault();
	});
	
	$("#MO09").mouseover(function(){
		centerPopup9();
		$("#mouseUP9").show();
		scrollAnimate.pause();
	});
	$("#MO09").mouseout(function(){
		$("#mouseUP9").hide();
		scrollAnimate.resume();
	});
	$("#MO09").click(function(event){
		event.preventDefault();
	});
	
	$("#MO010").mouseover(function(){
		centerPopup10();
		$("#mouseUP10").show();
		scrollAnimate.pause();
	});
	$("#MO010").mouseout(function(){
		$("#mouseUP10").hide();
		scrollAnimate.resume();
	});
	$("#MO010").click(function(event){
		event.preventDefault();
	});
	
	$("#MO011").mouseover(function(){
		centerPopup11();
		$("#mouseUP11").show();
		scrollAnimate.pause();
	});
	$("#MO011").mouseout(function(){
		$("#mouseUP11").hide();
		scrollAnimate.resume();
	});
	$("#MO011").click(function(event){
		event.preventDefault();
	});
// ---------------------------------------------------------------------------------------------------- SCREEN 1 //
	$("#s1r1").click(function(){
		divRADOVI = '#s1r1';
		hashRADOVI = 'k_rva-_ucka';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 1;
			r = 1;
			s = 1;
			loadPopupRADOVI('#s1r1', 'k_rva-_ucka');
		}
	});
	$("#s1r2").click(function(){
		divRADOVI = '#s1r2';
		hashRADOVI = 'cineplexx-obecanja';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 1;
			r = 2;
			s = 1;
			loadPopupRADOVI('#s1r2', 'cineplexx-obecanja');
		}
	});
	$("#s1r3").click(function(){
		divRADOVI = '#s1r3';
		hashRADOVI = 'zamislite-da-ste-ovo-vi';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 1;
			r = 3;
			s = 1;
			loadPopupRADOVI('#s1r3', 'zamislite-da-ste-ovo-vi');
		}
	});
	$("#s1r4").click(function(){
		divRADOVI = '#s1r4';
		hashRADOVI = 'fakti';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 1;
			r = 4;
			s = 1;
			loadPopupRADOVI('#s1r4', 'fakti');
		}
	});
	$("#s1r5").click(function(){
		divRADOVI = '#s1r5';
		hashRADOVI = 'cco-east';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 1;
			r = 5;
			s = 1;
			loadPopupRADOVI('#s1r5', 'cco-east');
		}
	});
	/* ZADNJE 22.08.2013
	$("#s1r6").click(function(){
		divRADOVI = '#s1r6';
		hashRADOVI = 'fiksirali-smo-kamatu';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 1;
			r = 6;
			s = 1;
			loadPopupRADOVI('#s1r6', 'fiksirali-smo-kamatu');
		}
	});
	*/
	$("#s1r6").click(function(){
		divRADOVI = '#s1r6';
		hashRADOVI = 'sigurno-je-sigurno';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 1;
			r = 6;
			s = 1;
			loadPopupRADOVI('#s1r6', 'sigurno-je-sigurno');
		}
	});
	
	$("#s1r7").click(function(){
		divRADOVI = '#s1r7';
		hashRADOVI = 'autostoperica';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 1;
			r = 7;
			s = 1;
			loadPopupRADOVI('#s1r7', 'autostoperica');
		}
	});
	$("#s1r8").click(function(){
		divRADOVI = '#s1r8';
		hashRADOVI = 'radijski';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 1;
			r = 8;
			s = 1;
			loadPopupRADOVI('#s1r8', 'radijski');
		}
	});
	/* ZADNJE 22.08.2013
	$("#s1r9").click(function(){
		divRADOVI = '#s1r9';
		hashRADOVI = 'bc-web';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 1;
			r = 9;
			s = 1;
			loadPopupRADOVI('#s1r9', 'bc-web');
		}
	});
	*/
	$("#s1r9").click(function(){
		divRADOVI = '#s1r9';
		hashRADOVI = 'fiksirali-smo-kamatu';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 1;
			r = 9;
			s = 1;
			loadPopupRADOVI('#s1r9', 'fiksirali-smo-kamatu');
		}
	});
	/*
	$("#s1r10").click(function(){
		divRADOVI = '#s1r10';
		hashRADOVI = 'baci-oko-na-izlog';
		if((BrowserDetect.browser == 'Explorer') || (BrowserDetect.browser == 'Opera')) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 1;
			r = 10;
			s = 1;
			loadPopupRADOVI('#s1r10', 'baci-oko-na-izlog');
		}
	});
	*/
	$("#s1r10").click(function(){
		divRADOVI = '#s1r10';
		hashRADOVI = 'dajmo-vocu-sansu';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 1;
			r = 10;
			s = 1;
			loadPopupRADOVI('#s1r10', 'dajmo-vocu-sansu');
		}
	});
	$("#s1r11").click(function(){
		divRADOVI = '#s1r11';
		hashRADOVI = 'biiiiip';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 1;
			r = 11;
			s = 1;
			loadPopupRADOVI('#s1r11', 'biiiiip');
		}
	});
// ---------------------------------------------------------------------------------------------------- SCREEN 2 //
	$("#s2r1").click(function(){
		divRADOVI = '#s2r1';
		hashRADOVI = 'uniqat';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 12;
			s = 1;
			loadPopupRADOVI('#s2r1', 'uniqat');
		}
	});
	/*
	$("#s2r2").click(function(){
		divRADOVI = '#s2r2';
		hashRADOVI = 'facebook-strategija';
		if((BrowserDetect.browser == 'Explorer') || (BrowserDetect.browser == 'Opera')) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 13;
			s = 1;
			loadPopupRADOVI('#s2r2', 'facebook-strategija');
		}
	});
	*/
	/* ZADNJE 22.08.2013
	$("#s2r2").click(function(){
		divRADOVI = '#s2r2';
		hashRADOVI = 'baci-oko-na-izlog';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 13;
			s = 1;
			loadPopupRADOVI('#s2r2', 'baci-oko-na-izlog');
		}
	});
	*/
	$("#s2r2").click(function(){
		divRADOVI = '#s2r2';
		hashRADOVI = 'getro-vrbani';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 13;
			s = 1;
			loadPopupRADOVI('#s2r2', 'getro-vrbani');
		}
	});
	$("#s2r3").click(function(){
		divRADOVI = '#s2r3';
		hashRADOVI = 'zasto';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 14;
			s = 1;
			loadPopupRADOVI('#s2r3', 'zasto');
		}
	});
	/* ZADNJE 22.08.2013
	$("#s2r4").click(function(){
		divRADOVI = '#s2r4';
		hashRADOVI = 'interliber-stand';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 15;
			s = 1;
			loadPopupRADOVI('#s2r4', 'interliber-stand');
		}
	});
	*/
	$("#s2r4").click(function(){
		divRADOVI = '#s2r4';
		hashRADOVI = 'mobendo';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 15;
			s = 1;
			loadPopupRADOVI('#s2r4', 'mobendo');
		}
	});
	$("#s2r5").click(function(){
		divRADOVI = '#s2r5';
		hashRADOVI = 'cco-split';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 16;
			s = 1;
			loadPopupRADOVI('#s2r5', 'cco-split');
		}
	});
	$("#s2r6").click(function(){
		divRADOVI = '#s2r6';
		hashRADOVI = 'go-spring-go-fashion';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 17;
			s = 1;
			loadPopupRADOVI('#s2r6', 'go-spring-go-fashion');
		}
	});
	$("#s2r7").click(function(){
		divRADOVI = '#s2r7';
		hashRADOVI = 'tko-se-krije-u-autonomnoj';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 18;
			s = 1;
			loadPopupRADOVI('#s2r7', 'tko-se-krije-u-autonomnoj');
		}
	});
	$("#s2r8").click(function(){
		divRADOVI = '#s2r8';
		hashRADOVI = 'studio-smijeha';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 19;
			s = 1;
			loadPopupRADOVI('#s2r8', 'studio-smijeha');
		}
	});
	$("#s2r9").click(function(){
		divRADOVI = '#s2r9';
		hashRADOVI = 'h1tv-logo';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 20;
			s = 1;
			loadPopupRADOVI('#s2r9', 'h1tv-logo');
		}
	});
	$("#s2r10").click(function(){
		divRADOVI = '#s2r10';
		hashRADOVI = 'avon-walk';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 21;
			s = 1;
			loadPopupRADOVI('#s2r10', 'avon-walk');
		}
	});
	$("#s2r11").click(function(){
		divRADOVI = '#s2r11';
		hashRADOVI = 'mobis';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 22;
			s = 1;
			loadPopupRADOVI('#s2r11', 'mobis');
		}
	});
	$("#s2r12").click(function(){
		divRADOVI = '#s2r12';
		hashRADOVI = 'cijene-za-mene';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 2;
			r = 23;
			s = 1;
			loadPopupRADOVI('#s2r13', 'cijene-za-mene');
		}
	});
// ---------------------------------------------------------------------------------------------------- SCREEN 3 //
	$("#s3r1").click(function(){
		divRADOVI = '#s3r1';
		hashRADOVI = 'bc-bor';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 3;
			r = 24;
			s = 1;
			loadPopupRADOVI('#s3r1', 'bc-bor');
		}
	});
	$("#s3r2").click(function(){
		divRADOVI = '#s3r2';
		hashRADOVI = 'autobus';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 3;
			r = 25;
			s = 1;
			loadPopupRADOVI('#s3r2', 'autobus');
		}
	});
	$("#s3r3").click(function(){
		divRADOVI = '#s3r3';
		hashRADOVI = 'brisalica';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 3;
			r = 26;
			s = 1;
			loadPopupRADOVI('#s3r3', 'brisalica');
		}
	});
	$("#s3r4").click(function(){
		divRADOVI = '#s3r4';
		hashRADOVI = 'osmi-rodjendan';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 3;
			r = 27;
			s = 1;
			loadPopupRADOVI('#s3r4', 'osmi-rodjendan');
		}
	});
	$("#s3r5").click(function(){
		divRADOVI = '#s3r5';
		hashRADOVI = 'h1-web';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 3;
			r = 28;
			s = 1;
			loadPopupRADOVI('#s3r5', 'h1-web');
		}
	});
	/*
	$("#s3r6").click(function(){
		divRADOVI = '#s3r6';
		hashRADOVI = 'pako';
		if((BrowserDetect.browser == 'Explorer') || (BrowserDetect.browser == 'Opera')) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 3;
			r = 29;
			s = 1;
			loadPopupRADOVI('#s3r6', 'pako');
		}
	});
	*/
	$("#s3r6").click(function(){
		divRADOVI = '#s3r6';
		hashRADOVI = 'facebook-strategija';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 3;
			r = 29;
			s = 1;
			loadPopupRADOVI('#s3r6', 'facebook-strategija');
		}
	});
	$("#s3r7").click(function(){
		divRADOVI = '#s3r7';
		hashRADOVI = 'stupvertajzing';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 3;
			r = 30;
			s = 1;
			loadPopupRADOVI('#s3r7', 'stupvertajzing');
		}
	});
	$("#s3r8").click(function(){
		divRADOVI = '#s3r8';
		hashRADOVI = 'dam-ti-amsterdam';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 3;
			r = 31;
			s = 1;
			loadPopupRADOVI('#s3r8', 'dam-ti-amsterdam');
		}
	});
	$("#s3r9").click(function(){
		divRADOVI = '#s3r9';
		hashRADOVI = 'ormar-cco';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 3;
			r = 32;
			s = 1;
			loadPopupRADOVI('#s3r9', 'ormar-cco');
		}
	});
	$("#s3r10").click(function(){
		divRADOVI = '#s3r10';
		hashRADOVI = 'chekiraj-se-u-branimircu';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 3;
			r = 33;
			s = 1;
			loadPopupRADOVI('#s3r10', 'chekiraj-se-u-branimircu');
		}
	});
	$("#s3r11").click(function(){
		divRADOVI = '#s3r11';
		hashRADOVI = 'najvece-kokice-na-svijetu';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 3;
			r = 34;
			s = 1;
			loadPopupRADOVI('#s3r11', 'najvece-kokice-na-svijetu');
		}
	});
	$("#s3r12").click(function(){
		divRADOVI = '#s3r12';
		hashRADOVI = 'zoo-invaders';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 3;
			r = 35;
			s = 1;
			loadPopupRADOVI('#s3r12', 'zoo-invaders');
		}
	});
// ---------------------------------------------------------------------------------------------------- SCREEN 4 //
	$("#s4r1").click(function(){
		divRADOVI = '#s4r1';
		hashRADOVI = 'post-it-kampanja';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 4;
			r = 36;
			s = 1;
			loadPopupRADOVI('#s4r1', 'post-it-kampanja');
		}
	});
	$("#s4r2").click(function(){
		divRADOVI = '#s4r2';
		hashRADOVI = 'cvrckov-web';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 4;
			r = 37;
			s = 1;
			loadPopupRADOVI('#s4r2', 'cvrckov-web');
		}
	});
	$("#s4r3").click(function(){
		divRADOVI = '#s4r3';
		hashRADOVI = 'encian';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 4;
			r = 38;
			s = 1;
			loadPopupRADOVI('#s4r3', 'encian');
		}
	});
	$("#s4r4").click(function(){
		divRADOVI = '#s4r4';
		hashRADOVI = 'cvrckove-vjezbalice';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 4;
			r = 39;
			s = 1;
			loadPopupRADOVI('#s4r4', 'cvrckove-vjezbalice');
		}
	});
	$("#s4r5").click(function(){
		divRADOVI = '#s4r5';
		hashRADOVI = 'staza-za-utrke';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 4;
			r = 40;
			s = 1;
			loadPopupRADOVI('#s4r5', 'staza-za-utrke');
		}
	});
	$("#s4r6").click(function(){
		divRADOVI = '#s4r6';
		hashRADOVI = 'plakati-za-wc';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 4;
			r = 41;
			s = 1;
			loadPopupRADOVI('#s4r6', 'plakati-za-wc');
		}
	});
	$("#s4r7").click(function(){
		divRADOVI = '#s4r7';
		hashRADOVI = 'prava-pravcata';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 4;
			r = 42;
			s = 1;
			loadPopupRADOVI('#s4r7', 'prava-pravcata');
		}
	});
	$("#s4r8").click(function(){
		divRADOVI = '#s4r8';
		hashRADOVI = 'savjetura';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 4;
			r = 43;
			s = 1;
			loadPopupRADOVI('#s4r8', 'savjetura');
		}
	});
	$("#s4r9").click(function(){
		divRADOVI = '#s4r9';
		hashRADOVI = '2-godine-sretne-veze';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 4;
			r = 44;
			s = 1;
			loadPopupRADOVI('#s4r9', '2-godine-sretne-veze');
		}
	});
	$("#s4r10").click(function(){
		divRADOVI = '#s4r10';
		hashRADOVI = '3d-fico';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 4;
			r = 45;
			s = 1;
			loadPopupRADOVI('#s4r10', '3d-fico');
		}
	});
	/* ZADNJE 22.08.2013
	$("#s4r11").click(function(){
		divRADOVI = '#s4r11';
		hashRADOVI = 'batman-u-cineplexxu';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 4;
			r = 46;
			s = 1;
			loadPopupRADOVI('#s4r11', 'batman-u-cineplexxu');
		}
	});
	*/
	$("#s4r11").click(function(){
		divRADOVI = '#s4r11';
		hashRADOVI = 'okusi-domace';
		if(BrowserDetect.browser == 'Opera') {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Explorer') && (BrowserDetect.version < 10 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Firefox') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Chrome') && (BrowserDetect.version < 9 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else if((BrowserDetect.browser == 'Safari') && (BrowserDetect.version < 5 )) {
			window.location = "http://zooagencija.hr/portfolio/" + hashRADOVI + "/index.html";
		} else {
			popupStatusRADOVI = 0;
			q = 4;
			r = 46;
			s = 1;
			loadPopupRADOVI('#s4r11', 'okusi-domace');
		}
	});
	
	$("#close_fader").mouseover(function(){
		$('#close_fader').css('background-image','url("http://zooagencija.hr/img/zatvori2.png")');
	});
	$("#close_fader").mouseout(function(){
		$('#close_fader').css('background-image','url("http://zooagencija.hr/img/zatvori1.png")');
	});
	
	$('#close_fader').click(function(e) {
		if(e.target.id == "close_fader") {
			unloadPopupRADOVI(divRADOVI, hashRADOVI);
			showRADOVI_AFTER(q,r,s);
   		}
	});
	
	$('#back_fader').click(function(e) {
		if(e.target.id == "back_fader") {
			unloadPopupRADOVI(divRADOVI, hashRADOVI);
			showRADOVI_AFTER(q,r,s);
   		}
	});
	
	$(window).bind( "popstate", function( e ) {
		if(popupStatusRADOVI == 1) {	
			//alert('usao 1');
			showRADOVI_AFTER(q,r,s);
			$(divRADOVI).show();
			$("#popup").empty();
			$('#back_fader').hide();
			$('#popup').hide();
			scrollAnimate.resume();
			//$('body').removeClass('freeze');
			popupStatusRADOVI = 0;
		} else if(popupStatusRADOVI == 0) {
			//alert('usao 0');
			$(divRADOVI).hide();
			$('#back_fader').show();
			$('#popup').show();
			scrollAnimate.pause();
			//$('body').addClass('freeze');
			$("#popup").load("http://zooagencija.hr/portfolio/" + hashRADOVI + "/_index.html");
			popupStatusRADOVI = 1;
		} else { }
	});
}



	var init = function( opts ) {
		settings = $.extend( defaults, opts );
		initalizeNavigation();
		if (!isTouch())
			activateScrollBar(37);
		if (window.location.hash) {
		};
		scrollAnimate = ScrollAnimator();
		scrollAnimate.init({
			animation: animation,
			maxScroll: maxScroll,
			useRAF : false, 
			tickSpeed: 50, 
			scrollSpeed: 15,
			debug: false,
			tweenSpeed: .2,
			startAt: settings.startAt,
			container: $('#main'),
			onStart: function() {
			},
			onResize: function(page) {
				wHeight = page.wHeight;
				wWidth = (settings.clampWidth > 0 && page.wWidth > settings.clampWidth) ? settings.clampWidth : page.wWidth;
				wCenter = page.wCenter;	
				outroComp = Math.max(0,1000-wHeight)/2;
				var pcent = (outroComp*2)/outroHeightPx;
				ratio = (outroLength*pcent);
				$('.scale').css({'width':wWidth+'px','height':wHeight+'px'});
				var centerPcent = 100;
				if (wHeight<750) {
					centerPcent = ((wHeight/750)*100);
				}
				$('#horizontalSection').css('background-position','center '+centerPcent+'%');
				if ($scrollBar) 
					resizeScrollBar();
				scrollAnimate.scrollTo(scrollAnimate.getScrollTop()+3);
			},
			onUpdate: function(scrollTop) {
				updateCount++;
				if ($scrollBar) 
					setScrollBarPosition(scrollTop/maxScroll);
			}
		});
		initalizePage();
		setInterval(checkSection, settings.sectionCheckInterval);
		return scrollAnimate;
	}
	return {
		init: init,
		scrollAnimate: scrollAnimate
	}
})();
$(document).ready( function() {
	window.siteAnimator = zooagencijaSite.init();
});



// BROWSER DETECT
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();