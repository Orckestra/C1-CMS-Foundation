using System.IO;
using System.Text.RegularExpressions;
using System.Web.UI;


namespace Composite.Core.WebClient
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public abstract class XhtmlPage : Page
	{
        protected override void Render(HtmlTextWriter writer)
        {
            Regex xmlScriptRegex = new Regex(@"(<script\stype=""text/javascript"">)(\s*<!--)((?:.|\n)*?)(\s*-->\s*)(</script>)");
            string xmlScriptCDATAWrapper = "$1\n// <![CDATA[$3 // ]]>\n$5";

            StringWriter sw = new StringWriter();
            base.Render(new HtmlTextWriter(sw));
            string html = sw.ToString();

            html = xmlScriptRegex.Replace(html, xmlScriptCDATAWrapper);

            writer.Write(html);
        }
	}
}
