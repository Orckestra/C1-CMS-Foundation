<html>
    
<%@ Page Language="C#" %>    

	<head>
		<title>TinyMCE</title>
		<script type="text/javascript">
			top.Application.declareTopLocal ( window );
		</script>
		<script type="text/javascript" src="tinymce/tinymce.min.js"></script>
		<script type="text/javascript" src="scripts/Format.js"></script>
		<script type="text/javascript" src="visualeditor.js"></script>
		<style type="text/css">
			html,
			body {
				border: none;
			}
			body {
				background-color: white;
				overflow: hidden;
				margin: 0;
				padding: 0;
			}
		</style>
	</head>
	<body>
		<textarea id="editor" name="editor" style="width:100%;height:100%;"></textarea>
	</body>
</html>