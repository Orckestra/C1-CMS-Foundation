<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<%@ Page Language="C#" %>
<%
    if (Composite.RuntimeInformation.IsDebugBuild == true && (Request.UrlReferrer == null || Request.UrlReferrer.AbsolutePath == "/"))
    {
        Response.Redirect("develop.aspx");
    }
%>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Start Composite</title>
		<meta name="robots" content="noindex, nofollow" />
		<link rel="stylesheet" type="text/css" href="default.css.aspx" />
		<link rel="shortcut icon" type="image/x-icon" href="images/icons/branding/favicon16.ico" />
		<script type="text/javascript" src="default.js"></script>
	</head>
	<body>
		<div id="composite">
			<div id="backdrop"></div>
			<div id="buzzwords">
				<a href="javascript:Composite.start();"><span><img alt="" src="images/blank.png" />Start Composite</span></a>
			</div>
		</div>
	</body>
</html>