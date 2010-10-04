<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Composite.Management.SourceEditor.Content</title>
		<script type="text/javascript" src="codepress.js"></script>
		<link rel="stylesheet" type="text/css" href="index.css"/>
	</head>
	<body>
		<textarea id="textarea"></textarea>
		<script type="text/javascript">
			var search = document.location.search;
			var syntax = search.split ( "=" )[ 1 ];
			document.getElementById ( "textarea" ).className = "codepress " + syntax;
		</script>
	</body>
</html>