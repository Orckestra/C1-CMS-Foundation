<!DOCTYPE html>
<html>
    
<%@ Page Language="C#" %>

<head>
	<title>Codemirror</title>
	<script type="text/javascript">
		top.Application.declareTopLocal(window);
	</script>
	<script type="text/javascript" src="../../../../lib/codemirror/lib/codemirror.js"></script>
    <script type="text/javascript" src="../../../../lib/codemirror/addon/search/searchcursor.js"></script>
	<script type="text/javascript" src="../../../../lib/codemirror/mode/xml/xml.js"></script>
	<script type="text/javascript" src="../../../../lib/codemirror/mode/javascript/javascript.js"></script>
	<script type="text/javascript" src="../../../../lib/codemirror/mode/css/css.js"></script>
	<script type="text/javascript" src="../../../../lib/codemirror/mode/htmlmixed/htmlmixed.js"></script>
	<script type="text/javascript" src="../../../../lib/codemirror/addon/mode/multiplex.js"></script>
	<script type="text/javascript" src="../../../../lib/codemirror/mode/htmlembedded/htmlembedded.js"></script>
	<script type="text/javascript" src="../../../../lib/codemirror/mode/clike/clike.js"></script>
	<script type="text/javascript" src="../../../../lib/codemirror/mode/razor/razor.js"></script>
	<script type="text/javascript" src="../../../../lib/codemirror/mode/sass/sass.js"></script>
    <script type="text/javascript" src="../../../../lib/codemirror/mode/sql/sql.js"></script>
	<script type="text/javascript" src="../../../../lib/codemirror/addon/dropmedia/dropmedia.js"></script>
	<link rel="stylesheet" type="text/css" href="../../../../lib/codemirror/lib/codemirror.css" />
	<link rel="stylesheet" type="text/css" href="codemirror.css" />
	<link rel="stylesheet" type="text/css" href="theme/composite.css" />
	<script type="text/javascript" src="codemirror.js"></script>
</head>
<body class="editor">
	<textarea id="textarea" rows="20" cols="80"></textarea>
</body>
</html>
