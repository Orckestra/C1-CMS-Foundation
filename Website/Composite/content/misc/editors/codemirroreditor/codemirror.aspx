<!DOCTYPE html>
<html>
    
<%@ Page Language="C#" %>

<head>
	<title>Codemirror</title>
	<script type="text/javascript">
		top.Application.declareTopLocal(window);
	</script>
	<script type="text/javascript" src="CodeMirror/lib/codemirror.js"></script>
	<script type="text/javascript" src="CodeMirror/mode/xml/xml.js"></script>
	<script type="text/javascript" src="CodeMirror/mode/javascript/javascript.js"></script>
	<script type="text/javascript" src="CodeMirror/mode/css/css.js"></script>
	<script type="text/javascript" src="CodeMirror/mode/htmlmixed/htmlmixed.js"></script>
	<script type="text/javascript" src="CodeMirror/mode/htmlembedded/htmlembedded.js"></script>
	<script type="text/javascript" src="CodeMirror/mode/clike/clike.js"></script>
	<script type="text/javascript" src="CodeMirror/mode/razor/razor.js"></script>
	<script type="text/javascript" src="CodeMirror/mode/sass/sass.js"></script>
	<script type="text/javascript" src="CodeMirror/addon/dropmedia/dropmedia.js"></script>
	<link rel="stylesheet" type="text/css" href="CodeMirror/lib/codemirror.css" />
	<link rel="stylesheet" type="text/css" href="codemirror.css" />
	<link rel="stylesheet" type="text/css" href="theme/composite.css" />
	<script type="text/javascript" src="codemirror.js"></script>
	<style type="text/css">
		.CodeMirror {
			border-top: 1px solid black;
			border-bottom: 1px solid black;
		}
	</style>
</head>
<body class="editor">
	<textarea id="textarea" rows="20" cols="80"></textarea>
</body>
</html>
