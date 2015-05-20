

var SimplusCad = (function() {
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
		{id:"#slide41",name:"slide41",tag:"#slide41",position:801,correct:false},
		{id:"#slide42",name:"slide42",tag:"#slide42",position:1002,correct:false},
		{id:"#slide43",name:"slide43",tag:"#slide43",position:1203,correct:false},
		{id:"#slide44",name:"slide44",tag:"#slide44",position:1404,correct:false},
	];
	outroLength = 255;
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
	         			endAt: 250,
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
	         						"background-position" : {x:"50%", y: 800}
	         					}
	         				}
	         			]
	         		},
        			{
	         			selector: '#slide2',
	         			startAt: 200,
	         			endAt: 750,
	         			onEndAnimate:function( anim ) {},
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					properties: {
	         						"background-position" : {x:"50%",y: 0}
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Sinusoidal.EaseInOut,
	         					properties: {
	         						"background-position" : {x:"50%",y: 1200}
	         					}
	         				}
	         			]
	         		},
	         		{
	         			selector: '#slide3',
	         			startAt: 400,
	         			endAt: 950,
	         			onEndAnimate:function( anim ) {},
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					properties: {
	         						"background-position" : {x:"50%",y: 0}
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Sinusoidal.EaseInOut,
	         					properties: {
	         						"background-position" : {x:"50%",y: 800}
	         					}
	         				}
	         			]
	         		},
	         		{
	         			selector: '#slide4',
	         			startAt: 600,
	         			endAt: 1250,
	         			onEndAnimate:function( anim ) {},
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					properties: {
	         						"background-position" : {x:"50%",y: 0}
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Sinusoidal.EaseInOut,
	         					properties: {
	         						"background-position" : {x:"50%",y: 800}
	         					}
	         				}
	         			]
	         		},
	         		{
	         			selector: '#slide41',
	         			startAt: 801,
	         			endAt: 2000,
	         			onEndAnimate:function( anim ) {},
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					properties: {
	         						"background-position" : {x:"50%",y: 0}
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Sinusoidal.EaseInOut,
	         					properties: {
	         						"background-position" : {x:"50%",y: 1200}
	         					}
	         				}
	         			]
	         		},
	         		{
	         			selector: '#slide42',
	         			startAt: 1002,
	         			endAt: 2400,
	         			onEndAnimate:function( anim ) {},
	         			keyframes: [
	         				{ 
	         					position: 0,
	         					properties: {
	         						"background-position" : {x:"50%",y: 0}
	         					}
	         					
	         				},
	         				{
	         					position: 1,
	         					ease: TWEEN.Easing.Sinusoidal.EaseInOut,
	         					properties: {
	         						"background-position" : {x:"50%",y: 1200}
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
						if((i!=2) && (i!=3) && (i!=4) && (i!=5) ) {
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
				index = 2;
			} else if(index == 7) {
				index = 3;
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
	function isTouch() {
		return 'ontouchstart' in window;
	}
	function track(a,b,c) {
		if (settings.tracking==true) {
		}
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
		setInterval(checkSection, settings.sectionCheckInterval);
		return scrollAnimate;
	}
	return {
		init: init,
		scrollAnimate: scrollAnimate
	}
})();
$(document).ready( function() {
	window.siteAnimator = SimplusCad.init();
	
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
BrowserDetect.init

