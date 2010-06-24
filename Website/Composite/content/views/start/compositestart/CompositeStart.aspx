<%@Page Language="C#"%>
<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>Composite Start</title>
		<link rel="stylesheet" type="text/css" href="<%= Request.QueryString [ "uri" ] %>CompositeStart.css.aspx"/>
		<script type="text/javascript" src="<%= Request.QueryString [ "uri" ] %>CompositeStart.js"></script>
	</head>
	<body>
		<div id="titlebar">
			<ul>
				<li>
					<a href="http://www.composite.net" target="_blank">www.composite.net</a>
				</li>
			</ul>
		</div>
		<div id="content">
			<div id="main">
				<h1>Congratulations on your <nobr>Composite C1</nobr> solution</h1>
				<p>In 2006 we came up with the idea to create a CMS that would make people work more efficiently. To ensure the best possible platform for you to achieve all your online ambitions, we have drawn on experiences from various expert interviews, focus groups, personas and usability experts. This has allowed us to optimise the final product, providing you with a state-of-the-art Content Management System.</p>
				<h4>Your opinion is valuable to us</h4>
				<p>We have created a CMS that redefines the standards of Content Management, enabling everyone from developers to editors to work more efficiently. Still, we always strive to do even better, so if you have any questions, comments or ideas regarding <nobr>Composite C1</nobr>, please don’t hesitate to <a href="http://pf.composite.net/c1/feedback.aspx" target="_blank">send them to us</a>.</p>
			</div>
			<div id="spots">
				<div class="spot">
					<div id="boost">
						<h4>Performance boost?</h4>
						<p>We constaly work hard on improving <nobr>Composite C1</nobr>. But there are other ways of optimizing the overall experience. And it only takes a minute. <a href="http://boost.composite.net/Home.aspx?host=&port=&protocol=&path=">Find out how!</a></p>
					</div>
				</div>
				<div class="spot">
					<h4>Composite Hotline</h4>
					<p>We are cooperating with a professional service center to provide a hotline for expert advice and know-how. Composite Hotline is available during 8:30 and 20:00 Central European Time. Please contact your Composite C1 provider if you don’t have Composite Hotline.</p>
				</div>
			</div>
		</div>
		
		<button style="position:absolute;bottom:10px;right:20px;z-index:1000;" onclick="document.location.reload()">RELOAD</button>
		
	</body>
</html>