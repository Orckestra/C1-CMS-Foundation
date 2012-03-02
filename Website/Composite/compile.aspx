<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml">
    
<%@ Page Language="C#" %>

	<head>
		<title>Script Compilation</title>
		<style type="text/css">
			html {
				background-color: ThreeDFace;
				color: black;
			}
			body {
				font-family: Verdana, sans-serif;
				font-size: 70%;
				margin: 20px;
			}
			code, textarea {
				font-family: "Courier New", monospace;
			}
			textarea {
				font-size: 100%;
				width: 80%;
				height: 60px;
			}
			p {
				white-space: nowrap;
			}
		</style>
	</head>
	<body>
		<p>
			<control:scriptloader type="top" directive="compile" runat="server"/>
			<control:scriptloader type="sub" directive="compile" runat="server"/>
            <control:styleloader directive="compile" runat="server" />
		</p>
		<p>Success! Now compress files manually by adapting these commands to your file structure:</p>
		<textarea wrap="off">java -jar &quot;<%= Request.MapPath( "~/Composite") %>\applets\custom_rhino.jar&quot; -opt -1 -c &quot;<%= Request.MapPath( "~/Composite") %>\scripts\compressed\top-uncompressed.js&quot; > &quot;<%= Request.MapPath( "~/Composite") %>\scripts\compressed\top.js&quot; 2>&amp;1
java -jar &quot;<%= Request.MapPath( "~/Composite") %>\applets\custom_rhino.jar&quot; -opt -1 -c &quot;<%= Request.MapPath( "~/Composite") %>\scripts\compressed\sub-uncompressed.js&quot; > &quot;<%= Request.MapPath( "~/Composite") %>\scripts\compressed\sub.js&quot; 2>&amp;1</textarea>
		<p><small>About the "-opt -1" flag, please consult <a href="http://dojotoolkit.org/node/188">this note</a>. Should be fixed on trunk in newer builds.</small></p>
	</body>
</html>