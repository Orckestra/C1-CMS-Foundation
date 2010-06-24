Understand folder structure:

	1) Scripts in "top" folder are only included in root window.
	2) Scrips in "page" folder are included in subframes and popups.

Observe folder agenda:

	1) Please no global functions in this folder!
	2) You should only define "classes" and methods around here.
	3) If in doubt, consult the generated JSDoc output.
	4) Restrictions don't apply to scripts in the "/content" folder.

Note syntactic conventions:

	Files have been coded to play well with the Eclipse Web Tools 3.0 platform.
	This offeers cool features for Javascript authoring such as code-insight (intellisense) 
	and class exploration. These features requires a certain authoring style otherwise  
	not recommended; but this is the limitation of the platform. 
	
	Read more: http://www.eclipse.org/atf/