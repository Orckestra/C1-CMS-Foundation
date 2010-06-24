/**
 * The max score.
 */
SEOResult.MAX_SCORE = 6;

/**
 * @param {string} keyword
 */
function SEOResult ( keyword ) {
	
	this.keyword = keyword;
}

SEOResult.prototype = {
	
	_score : 0,
	keyword : null,
	isInTitle : false,
	isInURL : false,
	isInMenuTitle : false,
	isInDescription : false,
	isInHeading : false,
	isInContent : false	
};

/**
 * Result is cached, so you should Only compute  
 * the score when SEOResult is fully parsed.
 * @return {int}
 */
SEOResult.prototype.getScore = function () {
	
	if ( this._score == 0 ) {
		this._score += this.isInTitle ? 1 : 0;
		this._score += this.isInURL ? 1 : 0;
		this._score += this.isInMenuTitle ? 1 : 0;
		this._score += this.isInDescription ? 1 : 0;
		this._score += this.isInHeading ? 1 : 0;
		this._score += this.isInContent ? 1 : 0;
	}
	return this._score;
};