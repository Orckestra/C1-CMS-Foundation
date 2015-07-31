<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:ui="http://www.w3.org/1999/xhtml" xmlns:control="http://www.composite.net/ns/uicontrol">
    
<%@ Page Language="C#" %>    

	<control:httpheaders runat="server" />
	<head>
		<title>Composite.Management.Dialog.WysiwygEditor.Charmap</title>
		<control:styleloader runat="server" />
		<control:scriptloader type="sub" runat="server" />
		<script type="text/javascript" src="CharMapDialogPageBinding.js"></script>
		<link rel="stylesheet" type="text/css" href="charmap.css"/>
	</head>
	<body>
		<ui:dialogpage 
			class="tabboxed" 
			binding="CharMapDialogPageBinding" 
			label="${string:Composite.Web.VisualEditor:CharMap.LabelSelectSpecialChar}" 
			image="${icon:specialchar}"
			resizable="false">
			<ui:pagebody>
				<ui:tabbox type="boxed" equalsize="true">
					<ui:tabs>
						<ui:tab label="${string:Composite.Web.VisualEditor:CharMap.LabelGeneral}"/>
						<ui:tab label="${string:Composite.Web.VisualEditor:CharMap.LabelAlphabetical}"/>
						<ui:tab label="${string:Composite.Web.VisualEditor:CharMap.LabelMathSymbols}"/>
					</ui:tabs>
					<ui:tabpanels>
						<ui:tabpanel>
							<ui:fields>
								<ui:fieldgroup label="${string:Composite.Web.VisualEditor:CharMap.LabelCommon}" class="boxed">
									<ui:field>
										<a code="160" entity="nbsp" text="no-break space" href="javascript:void(false);" />
										<a code="38" entity="amp" text="ampersand" href="javascript:void(false);">&amp;</a>
										<a code="34" entity="quot" text="quotation mark" href="javascript:void(false);">"</a>
									</ui:field>
								</ui:fieldgroup>
								<ui:fieldgroup label="${string:Composite.Web.VisualEditor:CharMap.LabelQuotation}" class="boxed">
									<ui:field>
										<a code="8249" entity="lsaquo" text="Single left-pointing angle quotation" href="javascript:void(false);">‹</a>
										<a code="8250" entity="rsaquo" text="Single right-pointing angle quotation" href="javascript:void(false);">›</a>
										<a code="171" entity="laquo" text="Left pointing guillemet" href="javascript:void(false);">«</a>
										<a code="187" entity="raquo" text="Right pointing guillemet" href="javascript:void(false);">»</a>
										<a code="8216" entity="lsquo" text="Left single quotation" href="javascript:void(false);">‘</a>
										<a code="8217" entity="rsquo" text="Right single quotation" href="javascript:void(false);">’</a>
										<a code="8220" entity="ldquo" text="Left double quotation" href="javascript:void(false);">“</a>
										<a code="8221" entity="rdquo" text="Right double quotation" href="javascript:void(false);">”</a>
										<a code="8218" entity="sbquo" text="single low-9 quotation" href="javascript:void(false);">‚</a>
										<a code="8222" entity="bdquo" text="double low-9 quotation" href="javascript:void(false);">„</a>
										<a code="60" entity="lt" text="Less-than" href="javascript:void(false);">&lt;</a>
										<a code="62" entity="gt" text="Greater-than" href="javascript:void(false);">&gt;</a>
										<a code="8805" entity="ge" text="Greater-than or equal to" href="javascript:void(false);">≥</a>
										<a code="8211" entity="ndash" text="En dash" href="javascript:void(false);">—</a>
										<a code="8212" entity="mdash" text="Em dash" href="javascript:void(false);">¯</a>
										<a code="175" entity="macr" text="Macron" href="javascript:void(false);">¯</a>
										<a code="8254" entity="oline" text="Overline" href="javascript:void(false);">‾</a>
										<a code="166" entity="brvbar" text="Broken bar" href="javascript:void(false);">¦</a>
										<a code="168" entity="uml" text="Diaeresis" href="javascript:void(false);">¨</a>
										<a code="161" entity="iexcl" text="Inverted exclamation mark" href="javascript:void(false);">¡</a>
										<a code="191" entity="lquest" text="Turned question mark" href="javascript:void(false);">¿</a>
										<a code="710" entity="circ" text="Circumflex accent" href="javascript:void(false);">ˆ</a>
										<a code="732" entity="tilde" text="Small tilde" href="javascript:void(false);">˜</a>
										<a code="176" entity="deg" text="Degree sign" href="javascript:void(false);">°</a>
									</ui:field>
								</ui:fieldgroup>
								<ui:fieldgroup label="${string:Composite.Web.VisualEditor:CharMap.LabelCurrency}" class="boxed">
									<ui:field>
										<a code="164" entity="curren" text="Currency sign" href="javascript:void(false);">¤</a>
										<a code="8364" entity="euro" text="Euro" href="javascript:void(false);">€</a>
										<a code="036" entity="dollar" text="Dollar" href="javascript:void(false);">$</a>
										<a code="162" entity="cent" text="Cent" href="javascript:void(false);">¢</a>
										<a code="163" entity="pound" text="Pound" href="javascript:void(false);">£</a>
										<a code="165" entity="yen" text="Yen" href="javascript:void(false);">¥</a>
									</ui:field>
								</ui:fieldgroup>
							</ui:fields>
						</ui:tabpanel>
						<ui:tabpanel>
							<ui:fields>
								<ui:fieldgroup label="${string:Composite.Web.VisualEditor:CharMap.LabelLatin}" class="boxed">
									<ui:field>
										<a code="192" entity="Agrave" text="A - grave" href="javascript:void(false);">À</a>
										<a code="193" entity="Aacute" text="A - acute" href="javascript:void(false);">Á</a>
										<a code="194" entity="Acirc" text="A - circumflex" href="javascript:void(false);">Â</a>
										<a code="195" entity="Atilde" text="A - tilde" href="javascript:void(false);">Ã</a>
										<a code="196" entity="Auml" text="A - diaeresis" href="javascript:void(false);">Ä</a>
										<a code="197" entity="Aring" text="A - ring above" href="javascript:void(false);">Å</a>
										<a code="198" entity="AElig" text="ligature AE" href="javascript:void(false);">Æ</a>
										<a code="199" entity="Ccedil" text="C - cedilla" href="javascript:void(false);">Ç</a>
										<a code="200" entity="Egrave" text="E - grave" href="javascript:void(false);">È</a>
										<a code="201" entity="Eacute" text="E - acute" href="javascript:void(false);">É</a>
										<a code="202" entity="Ecirc" text="E - circumflex" href="javascript:void(false);">Ê</a>
										<a code="203" entity="Euml" text="E - diaeresis" href="javascript:void(false);">Ë</a>
										<a code="204" entity="Igrave" text="I - grave" href="javascript:void(false);">Ì</a>
										<a code="205" entity="Iacute" text="I - acute" href="javascript:void(false);">Í</a>
										<a code="206" entity="Icirc" text="I - circumflex" href="javascript:void(false);">Î</a>
										<a code="207" entity="Iuml" text="I - diaeresis" href="javascript:void(false);">Ï</a>
										<a code="208" entity="ETH" text="ETH" href="javascript:void(false);">Ð</a>
										<a code="209" entity="Ntilde" text="N - tilde" href="javascript:void(false);">Ñ</a>
										<a code="210" entity="Ograve" text="O - grave" href="javascript:void(false);">Ò</a>
										<a code="211" entity="Oacute" text="O - acute" href="javascript:void(false);">Ó</a>
										<a code="212" entity="Ocirc" text="O - circumflex" href="javascript:void(false);">Ô</a>
										<a code="213" entity="Otilde" text="O - tilde" href="javascript:void(false);">Õ</a>
										<a code="214" entity="Ouml" text="O - diaeresis" href="javascript:void(false);">Ö</a>
										<a code="216" entity="Oslash" text="O - slash" href="javascript:void(false);">Ø</a>
										<a code="338" entity="OElig" text="ligature OE" href="javascript:void(false);">Œ</a>
										<a code="352" entity="Scaron" text="S - caron" href="javascript:void(false);">Š</a>
										<a code="217" entity="Ugrave" text="U - grave" href="javascript:void(false);">Ù</a>
										<a code="218" entity="Uacute" text="U - acute" href="javascript:void(false);">Ú</a>
										<a code="219" entity="Ucirc" text="U - circumflex" href="javascript:void(false);">Û</a>
										<a code="220" entity="Uuml" text="U - diaeresis" href="javascript:void(false);">Ü</a>
										<a code="221" entity="Yacute" text="Y - acute" href="javascript:void(false);">Ý</a>
										<a code="376" entity="Yuml" text="Y - diaeresis" href="javascript:void(false);">Ÿ</a>
										<a code="222" entity="THORN" text="THORN" href="javascript:void(false);">Þ</a>
										<a code="224" entity="agrave" text="a - grave" href="javascript:void(false);">à</a>
										<a code="225" entity="aacute" text="a - acute" href="javascript:void(false);">á</a>
										<a code="226" entity="acirc" text="a - circumflex" href="javascript:void(false);">â</a>
										<a code="227" entity="atilde" text="a - tilde" href="javascript:void(false);">ã</a>
										<a code="228" entity="auml" text="a - diaeresis" href="javascript:void(false);">ä</a>
										<a code="229" entity="aring" text="a - ring above" href="javascript:void(false);">å</a>
										<a code="230" entity="aelig" text="ligature ae" href="javascript:void(false);">æ</a>
										<a code="231" entity="ccedil" text="c - cedilla" href="javascript:void(false);">ç</a>
										<a code="232" entity="egrave" text="e - grave" href="javascript:void(false);">è</a>
										<a code="233" entity="eacute" text="e - acute" href="javascript:void(false);">é</a>
										<a code="234" entity="ecirc" text="e - circumflex" href="javascript:void(false);">ê</a>
										<a code="235" entity="euml" text="e - diaeresis" href="javascript:void(false);">ë</a>
										<a code="236" entity="igrave" text="i - grave" href="javascript:void(false);">ì</a>
										<a code="237" entity="iacute" text="i - acute" href="javascript:void(false);">í</a>
										<a code="238" entity="icirc" text="i - circumflex" href="javascript:void(false);">î</a>
										<a code="239" entity="iuml" text="i - diaeresis" href="javascript:void(false);">ï</a>
										<a code="240" entity="eth" text="eth" href="javascript:void(false);">ð</a>
										<a code="241" entity="ntilde" text="n - tilde" href="javascript:void(false);">ñ</a>
										<a code="242" entity="ograve" text="o - grave" href="javascript:void(false);">ò</a>
										<a code="243" entity="oacute" text="o - acute" href="javascript:void(false);">ó</a>
										<a code="244" entity="ocirc" text="o - circumflex" href="javascript:void(false);">ô</a>
										<a code="245" entity="otilde" text="o - tilde" href="javascript:void(false);">õ</a>
										<a code="246" entity="ouml" text="o - diaeresis" href="javascript:void(false);">ö</a>
										<a code="248" entity="oslash" text="o slash" href="javascript:void(false);">ø</a>
										<a code="339" entity="oelig" text="ligature oe" href="javascript:void(false);">œ</a>
										<a code="353" entity="scaron" text="s - caron" href="javascript:void(false);">š</a>
										<a code="249" entity="ugrave" text="u - grave" href="javascript:void(false);">ù</a>
										<a code="250" entity="uacute" text="u - acute" href="javascript:void(false);">ú</a>
										<a code="251" entity="ucirc" text="u - circumflex" href="javascript:void(false);">û</a>
										<a code="252" entity="uuml" text="u - diaeresis" href="javascript:void(false);">ü</a>
										<a code="253" entity="yacute" text="y - acute" href="javascript:void(false);">ý</a>
										<a code="254" entity="thorn" text="thorn" href="javascript:void(false);">þ</a>
										<a code="255" entity="yuml" text="y - diaeresis" href="javascript:void(false);">ÿ</a>
									</ui:field>
								</ui:fieldgroup>
								<ui:fieldgroup label="${string:Composite.Web.VisualEditor:CharMap.LabelGreek}" class="boxed">
									<ui:field>
										<a code="913" entity="Alpha" text="Alpha" href="javascript:void(false);">Α</a>
										<a code="914" entity="Beta" text="Beta" href="javascript:void(false);">Β</a>
										<a code="915" entity="Gamma" text="Gamma" href="javascript:void(false);">Γ</a>
										<a code="916" entity="Delta" text="Delta" href="javascript:void(false);">Δ</a>
										<a code="917" entity="Epsilon" text="Epsilon" href="javascript:void(false);">Ε</a>
										<a code="918" entity="Zeta" text="Zeta" href="javascript:void(false);">Ζ</a>
										<a code="919" entity="Eta" text="Eta" href="javascript:void(false);">Η</a>
										<a code="920" entity="Theta" text="Theta" href="javascript:void(false);">Θ</a>
										<a code="921" entity="Iota" text="Iota" href="javascript:void(false);">Ι</a>
										<a code="922" entity="Kappa" text="Kappa" href="javascript:void(false);">Κ</a>
										<a code="923" entity="Lambda" text="Lambda" href="javascript:void(false);">Λ</a>
										<a code="924" entity="Mu" text="Mu" href="javascript:void(false);">Μ</a>
										<a code="925" entity="Nu" text="Nu" href="javascript:void(false);">Ν</a>
										<a code="926" entity="Xi" text="Xi" href="javascript:void(false);">Ξ</a>
										<a code="927" entity="Omicron" text="Omicron" href="javascript:void(false);">Ο</a>
										<a code="928" entity="Pi" text="Pi" href="javascript:void(false);">Π</a>
										<a code="929" entity="Rho" text="Rho" href="javascript:void(false);">Ρ</a>
										<a code="931" entity="Sigma" text="Sigma" href="javascript:void(false);">Σ</a>
										<a code="932" entity="Tau" text="Tau" href="javascript:void(false);">Τ</a>
										<a code="933" entity="Upsilon" text="Upsilon" href="javascript:void(false);">Υ</a>
										<a code="934" entity="Phi" text="Phi" href="javascript:void(false);">Φ</a>
										<a code="935" entity="Chi" text="Chi" href="javascript:void(false);">Χ</a>
										<a code="936" entity="Psi" text="Psi" href="javascript:void(false);">Ψ</a>
										<a code="937" entity="Omega" text="Omega" href="javascript:void(false);">Ω</a>
										<a code="945" entity="alpha" text="alpha" href="javascript:void(false);">α</a>
										<a code="946" entity="beta" text="beta" href="javascript:void(false);">β</a>
										<a code="947" entity="gamma" text="gamma" href="javascript:void(false);">γ</a>
										<a code="948" entity="delta" text="delta" href="javascript:void(false);">δ</a>
										<a code="949" entity="epsilon" text="epsilon" href="javascript:void(false);">ε</a>
										<a code="950" entity="zeta" text="zeta" href="javascript:void(false);">ζ</a>
										<a code="951" entity="eta" text="eta" href="javascript:void(false);">η</a>
										<a code="952" entity="theta" text="theta" href="javascript:void(false);">θ</a>
										<a code="953" entity="iota" text="iota" href="javascript:void(false);">ι</a>
										<a code="954" entity="kappa" text="kappa" href="javascript:void(false);">κ</a>
										<a code="955" entity="lambda" text="lambda" href="javascript:void(false);">λ</a>
										<a code="956" entity="mu" text="mu" href="javascript:void(false);">μ</a>
										<a code="957" entity="nu" text="nu" href="javascript:void(false);">ν</a>
										<a code="958" entity="xi" text="xi" href="javascript:void(false);">ξ</a>
										<a code="959" entity="omicron" text="omicron" href="javascript:void(false);">ο</a>
										<a code="960" entity="pi" text="pi" href="javascript:void(false);">π</a>
										<a code="961" entity="rho" text="rho" href="javascript:void(false);">ρ</a>
										<a code="962" entity="sigmaf" text="final sigma" href="javascript:void(false);">ς</a>
										<a code="963" entity="sigma" text="sigma" href="javascript:void(false);">σ</a>
										<a code="964" entity="tau" text="tau" href="javascript:void(false);">τ</a>
										<a code="965" entity="upsilon" text="upsilon" href="javascript:void(false);">υ</a>
										<a code="966" entity="phi" text="phi" href="javascript:void(false);">φ</a>
										<a code="967" entity="chi" text="chi" href="javascript:void(false);">χ</a>
										<a code="968" entity="psi" text="psi" href="javascript:void(false);">ψ</a>
										<a code="969" entity="omega" text="omega" href="javascript:void(false);">ω</a>
									</ui:field>
								</ui:fieldgroup>
							</ui:fields>
						</ui:tabpanel>
						<ui:tabpanel>
							<ui:fields>
								<ui:fieldgroup label="${string:Composite.Web.VisualEditor:CharMap.LabelMathAndLogic}" class="boxed">
									<ui:field>
										<a code="8722" entity="minus" text="Minus sign" href="javascript:void(false);">−</a>
										<a code="177" entity="plusmn" text="Plus-minus sign" href="javascript:void(false);">±</a>
										<a code="247" entity="divide" text="Division sign" href="javascript:void(false);">÷</a>
										<a code="8260" entity="frasl" text="Fraction slash" href="javascript:void(false);">⁄</a>
										<a code="215" entity="times" text="Multiplication sign" href="javascript:void(false);">×</a>
										<a code="185" entity="sup1" text="Superscript one" href="javascript:void(false);">¹</a>
										<a code="178" entity="sup2" text="Superscript two" href="javascript:void(false);">²</a>
										<a code="179" entity="sup3" text="Superscript three" href="javascript:void(false);">³</a>
										<a code="188" entity="frac14" text="Fraction one quarter" href="javascript:void(false);">¼</a>
										<a code="189" entity="frac12" text="Fraction one half" href="javascript:void(false);">½</a>
										<a code="190" entity="frac34" text="Fraction three quarters" href="javascript:void(false);">¾</a>
										<a code="402" entity="fnof" text="Function / florin" href="javascript:void(false);">ƒ</a>
										<a code="8747" entity="int" text="Integral" href="javascript:void(false);">∫</a>
										<a code="8721" entity="sum" text="N-ary sumation" href="javascript:void(false);">∑</a>
										<a code="8734" entity="infin" text="Infinity" href="javascript:void(false);">∞</a>
										<a code="8730" entity="radic" text="Square root" href="javascript:void(false);">√</a>
										<a code="8764" entity="sim" text="Similar to" href="javascript:void(false);">∼</a>
										<a code="8773" entity="cong" text="Approximately equal to" href="javascript:void(false);">≅</a>
										<a code="8776" entity="asymp" text="Almost equal to" href="javascript:void(false);">≈</a>
										<a code="8800" entity="ne" text="Not equal to" href="javascript:void(false);">≠</a>
										<a code="8801" entity="equiv" text="Identical to" href="javascript:void(false);">≡</a>
										<a code="8712" entity="isin" text="Element of" href="javascript:void(false);">∈</a>
										<a code="8713" entity="notin" text="Not an element of" href="javascript:void(false);">∉</a>
										<a code="8715" entity="ni" text="Contains as member" href="javascript:void(false);">∋</a>
										<a code="8719" entity="prod" text="N-ary product" href="javascript:void(false);">∏</a>
										<a code="8743" entity="and" text="Logical and" href="javascript:void(false);">∧</a>
										<a code="8744" entity="or" text="Logical or" href="javascript:void(false);">∨</a>
										<a code="172" entity="not" text="Not sign" href="javascript:void(false);">¬</a>
										<a code="8745" entity="cap" text="Intersection" href="javascript:void(false);">∩</a>
										<a code="8746" entity="cup" text="Union" href="javascript:void(false);">∪</a>
										<a code="8706" entity="part" text="Partial differential" href="javascript:void(false);">∂</a>
										<a code="8704" entity="forall" text="For all" href="javascript:void(false);">∀</a>
										<a code="8707" entity="exist" text="There exists" href="javascript:void(false);">∃</a>
										<a code="8709" entity="empty" text="Diameter" href="javascript:void(false);">∅</a>
										<a code="8711" entity="nabla" text="Backward difference" href="javascript:void(false);">∇</a>
										<a code="8727" entity="lowast" text="Asterisk operator" href="javascript:void(false);">∗</a>
										<a code="8733" entity="prop" text="Proportional to" href="javascript:void(false);">∝</a>
										<a code="8736" entity="ang" text="Angle" href="javascript:void(false);">∠</a>
									</ui:field>
								</ui:fieldgroup>
								<ui:fieldgroup label="${string:Composite.Web.VisualEditor:CharMap.LabelSymbols}" class="boxed">
									<ui:field>
										<a code="169" entity="copy" text="Copyright" href="javascript:void(false);">©</a>
										<a code="174" entity="reg" text="Registered" href="javascript:void(false);">®</a>
										<a code="8482" entity="trade" text="Trademark" href="javascript:void(false);">™</a>
										<a code="8240" entity="permil" text="Per Mille" href="javascript:void(false);">‰</a>
										<a code="181" entity="micro" text="Micro" href="javascript:void(false);">µ</a>
										<a code="183" entity="middot" text="Middle Dot" href="javascript:void(false);">·</a>
										<a code="8226" entity="bull" text="Bullet" href="javascript:void(false);">•</a>
										<a code="8230" entity="hellip" text="Three Dots" href="javascript:void(false);">…</a>
										<a code="8242" entity="prime" text="Minutes / Feet" href="javascript:void(false);">′</a>
										<a code="8243" entity="Prime" text="Seconds / Inches" href="javascript:void(false);">″</a>
										<a code="167" entity="sect" text="Section" href="javascript:void(false);">§</a>
										<a code="182" entity="para" text="Paragraph" href="javascript:void(false);">¶</a>
										<a code="223" entity="szlig" text="Sharp S / Ess-Zed" href="javascript:void(false);">ß</a>
									</ui:field>
								</ui:fieldgroup>
								<ui:fieldgroup label="${string:Composite.Web.VisualEditor:CharMap.LabelArrows}" class="boxed">
									<ui:field>
										<a code="8592" entity="larr" text="leftwards arrow" href="javascript:void(false);">←</a>
										<a code="8593" entity="uarr" text="upwards arrow" href="javascript:void(false);">↑</a>
										<a code="8594" entity="rarr" text="rightwards arrow" href="javascript:void(false);">→</a>
										<a code="8595" entity="darr" text="downwards arrow" href="javascript:void(false);">↓</a>
										<a code="8596" entity="harr" text="left right arrow" href="javascript:void(false);">↔</a>
										<a code="8629" entity="crarr" text="carriage return" href="javascript:void(false);">↵</a>
										<a code="8656" entity="lArr" text="leftwards double arrow" href="javascript:void(false);">⇐</a>
										<a code="8657" entity="uArr" text="upwards double arrow" href="javascript:void(false);">⇑</a>
										<a code="8658" entity="rArr" text="rightwards double arrow" href="javascript:void(false);">⇒</a>
										<a code="8659" entity="dArr" text="downwards double arrow" href="javascript:void(false);">⇓</a>
										<a code="8660" entity="hArr" text="left right double arrow" href="javascript:void(false);">⇔</a>
									</ui:field>
								</ui:fieldgroup>
							</ui:fields>
						</ui:tabpanel>
					</ui:tabpanels>
				</ui:tabbox>
				<div id="selection">&#160;</div>
			</ui:pagebody>
		</ui:dialogpage>
	</body>
</html>