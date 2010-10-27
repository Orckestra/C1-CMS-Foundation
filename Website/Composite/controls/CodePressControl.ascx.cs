using System;
using System.Data;
using System.Configuration;
using System.Collections;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Web.UI.HtmlControls;
using System.ComponentModel; 
using System.Text;
using Composite.Core.NewIO;
using System.Diagnostics;

public partial class CodePressControl : System.Web.UI.UserControl
{
    protected override void Render(HtmlTextWriter writer)
    {
		
		Response.ContentType = "text/html";
		String _lang = HttpContext.Current.Request.QueryString [ "lang" ];
		bool _isMozilla = HttpContext.Current.Request.UserAgent.IndexOf ( "Gecko" ) > -1;
		StringBuilder _builder = new StringBuilder ();
		
		if ( null == _lang ) 
		{
			_lang = "text";
		}
		_builder.AppendLine ( @"<link type=""text/css"" href=""languages/codepress-" + _lang + @".css"" rel=""stylesheet"" id=""cp-lang-style"" />" );
		_builder.AppendLine ( @"<script type=""text/javascript"" src=""languages/codepress-" + _lang + @".js""></script>" );
		_builder.AppendLine ( @"<script type=""text/javascript"">CodePress.language=""" + _lang + @""";</script>" );
		_builder.AppendLine ( @"<script type=""text/javascript"" src=""extensions/" + ( _isMozilla ? "mozilla" : "explorer" ) + @".js""></script>" );
		
		writer.Write ( _builder.ToString ());
    }
}