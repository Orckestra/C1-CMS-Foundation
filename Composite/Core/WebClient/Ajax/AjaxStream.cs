using System;
using System.IO;
using System.Web;
using Composite.Core.WebClient.HttpModules;


namespace Composite.Core.WebClient.Ajax
{
    internal class AjaxStream : Utf8StringTransformationStream
    {
        private static readonly string ScriptManagerJS = "UpdateManager.xhtml = null;";

        public AjaxStream(Stream innerOuputStream): base(innerOuputStream) { }

        public override string Process(string str)
        {
            int jsCodePosition = str.IndexOf(ScriptManagerJS, StringComparison.Ordinal);
            if (jsCodePosition == -1)
            {
                return str;
            }

            // Removing encoding symbol
            if (str[0] != '<') // Method StartsWith(...) doesn't work correctly here
            {
                str = str.Substring(1);
                jsCodePosition--;
            }

            string encodedText = HttpContext.Current.Server.UrlEncode(str).Replace("+", "%20"); //EncodeJsString(str);

            return string.Format("{0}UpdateManager.xhtml = \"{1}\";{2}",
                                 str.Substring(0, jsCodePosition),
                                 encodedText,
                                 str.Substring(jsCodePosition + ScriptManagerJS.Length));
        }
    }
}
