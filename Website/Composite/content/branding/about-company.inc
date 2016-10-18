<ui:dialogpage label="${string:Website.Dialogs.About.Title}" height="auto" width="370" resizable="false">
	<div id="about">
		<div id="info">
			<ui:cover id="infocover" busy="false" hidden="true" />
			<div id="prettyversion">
				${pretty}
			</div>
			<div id="version">
				Build no. ${version}
			</div>
			<div id="copyright">
				© ${year} Orckestra Inc
			</div>
			<br />
			<div>
				<input id="id" onclick="this.select()" readonly="readonly" value="${id}" /> Installation ID:
			</div>
		</div>
		<div id="credits">
			<div id="roll">
				<a href="https://cms.orckestra.com/" target="cmsorckestracom">
                    <div class="logo-wrapper">
                        <div id="logo1" class="brand-logo dark"></div>
                    </div>
 </a>
				<h2>Visual Editor</h2>
				<p>
					powered by<br />
					<a href="http://tinymce.moxiecode.com/" target="_blank" title="Visit Moxicode">TinyMCE</a>
				</p>
				<h2>Source Editor</h2>
				<p>
					powered by<br />
					<a href="http://codemirror.net/" target="_blank" title="Visit CodeMirror">CodeMirror</a>
				</p>
				<h2>Function Previews</h2>
				<p>
					powered by<br />
					<a href="http://phantomjs.org/" target="_blank" title="Visit PhantomJS">PhantomJS</a>
				</p>
				<h2>SVG Icons</h2>
				<p>
					designed by<br />
					<a href="http://www.orckestra.com/" target="_blank" title="Visit Orckestra">Orckestra</a><br />
					<a href="http://www.freepik.com/" target="_blank" title="Visit Freepik">Freepik</a>
				</p>
				<div id="names">
                    <div class="logo-wrapper logo2">
					    <div id="logo2" class="brand-logo dark">
					</div>
                    </div>
				</div>
			</div>
			<div id="fade">
			</div>
		</div>
	</div>
	<ui:dialogtoolbar>
		<ui:toolbarbody equalsize="true">
			<ui:toolbargroup>
				<ui:clickbutton id="buttonAccept" label="${string:Website.Dialogs.LabelAccept}" response="accept" focusable="true" default="true" class="pull-right" />
				<ui:clickbutton id="buttonCredits" label="${string:Website.Dialogs.About.LabelCredits}" focusable="true" oncommand="About.credits ()" />
			</ui:toolbargroup>
		</ui:toolbarbody>
	</ui:dialogtoolbar>
	<script type="text/javascript" src="About.js"></script>
</ui:dialogpage>
