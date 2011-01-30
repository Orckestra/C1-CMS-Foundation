<%@ Page Language="C#" %>
<html>
	<head>
		<title>Word</title>
		<style type="text/css">
			body {
				background-color: white;
				font-family: Verdana, sans-serif;
				font-size: 13px;
				line-height: 1.3em;
				margin: 0;
				padding: 4px 7px 7px 7px;
			}
		</style>
		<script type="text/javascript" src="wordcontent.js"></script>
	</head>
	<body spellcheck="false"><%= Composite.Core.ResourceSystem.StringResourceSystemFacade.GetString("Composite.Web.VisualEditor","WordPaste.PasteHereContent") %></body>
</html>