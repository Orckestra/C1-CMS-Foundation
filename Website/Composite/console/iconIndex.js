import spriteSheet from './icons.svg!';

spriteSheet.style.display = 'none';
spriteSheet.id = 'spritesheet';
// support hot reloading
var oldSheet = document.getElementById('spritesheet');
if (oldSheet) {
	document.body.replaceChild(spriteSheet, oldSheet);
} else {
	document.body.appendChild(spriteSheet);
}
