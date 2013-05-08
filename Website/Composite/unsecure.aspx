<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
    
<%@ Page Language="C#" %>

	<head>
		<title>Unsecure Connection</title>
        <meta name="https-check-watermark" content="ɯǝɥʇpuıqoʇsɯɔǝuo:<%= Composite.Core.Configuration.InstallationInformationFacade.InstallationId.GetHashCode() % 1000 %>" id="watermark" />
		<link rel="stylesheet" type="text/css" href="unsecure.css.aspx"/>
		<link rel="shortcut icon" type="image/x-icon" href="images/icons/branding/favicon16.ico"/>
		<script type="text/javascript" src="unsecure.js.aspx"></script>
	</head>
	<body>
		<div id="splash">
			<div id="backdrop"></div>
			<div id="unsecure">
				<div id="head">
					<div id="heading">
						<div id="vignette"></div>
						<h1>Not secure</h1>
					</div>
				</div>
				<p><strong>Warning:</strong> This is not a secure connection - is the URL correct?
                    <span class="fallback">
                        <br /><br />If you continue all content, passwords etc. will be transmitted unencrypted.
                    </span>
				</p>
				<div id="start" class="fade fallback">
					<a id="continuelink" href="#">
						<span><img alt="" src="images/blank.png"/> Continue unsecured</span>
					</a>
				</div>
			</div>
		</div>
	</body>
</html>