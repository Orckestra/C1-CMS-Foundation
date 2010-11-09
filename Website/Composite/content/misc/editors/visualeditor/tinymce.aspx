<html>
	<head>
		<title>TinyMCE</title>
		<script type="text/javascript">
			top.Application.declareTopLocal ( window );
		</script>
		<script type="text/javascript" src="tiny_mce/tiny_mce.js"></script>
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
		<script type="text/javascript">
			/*
			 * The trick here is to summon textarea content as fast 
			 * as possible (without waiting for the onload event).
			 */
			EventBroadcaster.broadcast ( 
				BroadcastMessages.VISUALEDITOR_HACKED, 
				{
					textareaElement : document.getElementById ( "editor" ),
					broadcastWindow : window
				}
			);
		</script>
	</body>
</html>