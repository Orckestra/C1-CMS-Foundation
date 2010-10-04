/*
 * CodePress regular expressions for XML syntax highlighting
 */

// XML
Language.syntax = [
	{ input : /(&lt;[^!]*?&gt;)/g, output : '<b>$1</b>'	}, // all tags
	{ input : /=(".*?")/g, output : '=<s>$1</s>' }, // atributes double quote
	{ input : /=('.*?')/g, output : '=<s>$1</s>' }, // atributes single quote
	{ input : /(&lt;!--.*?--&gt.)/g, output : '<ins>$1</ins>' } // comments  
]

Language.snippets = []

/*
Language.complete = [
	{ input : '"', output : '"$0"' }	
]
*/                     
Language.complete = [];
Language.shortcuts = [];