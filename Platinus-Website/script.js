//Change alfa of element background color in RGBA
function changeAlfaOfElementFromRGBA(element, alpha) {
 backgroundColor = element.css('backgroundColor');
 element.css('backgroundColor', 'rgba' + backgroundColor.slice(backgroundColor.indexOf('('), ( (backgroundColor.match(/,/g).length == 2) ? -1 : backgroundColor.lastIndexOf(',') - backgroundColor.length) ) + ', '+alpha+')');
}


//Change navbar opacity based on scroll
const navbar = $(".navbar");
$(window).scroll(() => {
 let scrollPercent = $(window).scrollTop().toFixed() / 500;
 changeAlfaOfElementFromRGBA(navbar,scrollPercent);
});