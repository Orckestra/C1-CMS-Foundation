import spriteSheet from 'console/icons.svg!';

spriteSheet.style.display = 'none';
spriteSheet.id = 'spritesheet';

// support hot reloading
function insertSpriteSheet() {
	if (document.readyState === 'complete') {
		const oldSheet = document.getElementById('spritesheet');
		if (oldSheet) {
			document.body.replaceChild(spriteSheet, oldSheet);
		} else {
			document.body.appendChild(spriteSheet);
		}
	}
}

insertSpriteSheet();
document.addEventListener('readystatechange', insertSpriteSheet);
