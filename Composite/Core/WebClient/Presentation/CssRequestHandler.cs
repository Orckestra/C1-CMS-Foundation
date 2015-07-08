using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Web;
using Composite.Core.IO;

/*
 * Important notice: This setup has been hardwired to handle MY personal 
 * CSS authoring preferences (formatting and indentation etc). Also notice 
 * that the excecptionhanding is currently miserable, CSS author can easily 
 * fire an indexOutOfBounds and stuff. For now, please use my precise syntax.
 */


namespace Composite.Core.WebClient.Presentation
{
    class CssRequestHandler : IHttpHandler
    {
    
    	// carries browser and platform info
		private class User
		{
            public bool
                isMozilla = false,
                isWebKit = false,
                isOpera = false,
                isIE = false,
                isIE6 = false,
                isIE7 = false,
                isIE8 = false,
                isIE9 = false,
                isVista = false,
                isOSX = false,
                isDefault = false;
				
			public User(HttpContext context)
			{
                string agent = context.Request.UserAgent ?? string.Empty;

				this.isIE = agent.Contains("MSIE")/* || agent.Contains("Trident")*/;
                this.isIE6 = agent.Contains("MSIE 6");
                this.isIE7 = agent.Contains("MSIE 7");
                this.isIE8 = agent.Contains("MSIE 8");
                this.isIE9 = agent.Contains("MSIE 9");
                
                this.isWebKit = agent.Contains ( "WebKit" );
                this.isOpera = agent.Contains ( "Opera" );
                
                // NOTE: WEBKIT AND OPERA IS MOZILLA FOR NOW!!!
                this.isMozilla = !this.isIE; // && !this.isWebKit && !this.isOpera;
				
				// analyze os
                this.isVista = agent.Contains("NT 6"); // Windows7 now counts as Vista!
                this.isOSX = agent.Contains("OS X");
				this.isDefault = !this.isVista && !this.isOSX;
				
				/*
                // analyze browser
				this.isMozilla = agent.Contains("Gecko");
                this.isIE = !this.isMozilla;
                this.isIE6 = this.isIE && agent.Contains("MSIE 6");
                this.isIE7 = this.isIE && agent.Contains("MSIE 7");
                this.isIE8 = this.isIE && agent.Contains("MSIE 8");
                this.isIE9 = this.isIE && agent.Contains("MSIE 9");
				*/
			}
		}
		
		// stores various variables while iterating lines
        private class State
        {
            public string rootPath { get; private set; }
            public string skinPath { get; private set; }
            public string folderPath { get; private set; }
			public bool isValid = true;
			
            public State(HttpContext context)
            {
                // the root of the administratin console
                this.rootPath = UrlUtils.AdminRootPath;

                // the root of the skin folder - hardcoded for now
                this.skinPath = UrlUtils.AdminRootPath + "/skins/system";

                // the folder of the currently parsed CSS file
                this.folderPath = Path.GetDirectoryName(context.Request.Path).Replace('\\', '/');
            }
        }

        private class Colors
        {
            private Dictionary<string,string> scheme = new Dictionary<string,string>();

            public Colors ( User user )
            {
                scheme.Add("threedface", "#FFFFFF");
				scheme.Add("threedshadow", "#DDDDDD");
                scheme.Add("threedlightshadow", "rgb(227,227,227)");
                scheme.Add("threedhighlight", "rgb(255,255,255)");
                scheme.Add("threeddarkshadow", "rgb(105,105,105)");
                scheme.Add("highlighttext", "rgb(255,255,255)");
                scheme.Add("highlight", "rgb(51,153,255)");
                scheme.Add("appworkspace", "rgb(171,171,171)");
                scheme.Add("graytext", "rgb(109,109,109)");
                scheme.Add("infobackground", "rgb(255,255,225)");
                scheme.Add("infotext", "rgb(0,0,0)");
                scheme.Add("menutext", "rgb(0,0,0)");
                scheme.Add("menu", "rgb(240,240,240)");
                scheme.Add("windowtext", "rgb(0,0,0)");
                scheme.Add("window", "rgb(250,250,250)");
                scheme.Add("toolbar", "#D3DAED"); // c1 special!
                /*
                scheme.Add ( "buttonface", "pink" );
                scheme.Add ( "buttonhighlight", "pink");
                scheme.Add ( "buttonshadow", "pink" );
                scheme.Add("buttontext", "pink");
                */
            }

            public string get (string key)
            {
                key = key.ToLowerInvariant();
                string result = key;
                if ( scheme.ContainsKey ( key ))
                {
                    result = scheme[key];
                }
                return result;
            }
        }

        public bool IsReusable
        {
            get { return false; }
        }
		
		/**
		 * Process request.
		 */
        public void ProcessRequest(HttpContext context)
        {
            if (CookieHandler.Get("mode") == "develop")
            {
                context.Response.Cache.SetExpires(DateTime.Now.AddMonths(-1));
                context.Response.Cache.SetCacheability(HttpCacheability.NoCache);
            }
            else
            {
                context.Response.Cache.SetExpires(DateTime.Now.AddMonths(1));
                context.Response.Cache.SetCacheability(HttpCacheability.Private);
            }

            string webPath  = context.Request.Path;
            string cssPath  = webPath.Substring(0, webPath.LastIndexOf(".aspx"));
            string filePath = context.Server.MapPath(cssPath);

            context.Response.ContentType = "text/css";

            State state = new State( context );
            User user = new User ( context );
            Colors colors = new Colors (user);

            if (C1File.Exists(filePath))
            {
                var sb = new StringBuilder();

                string[] lines = C1File.ReadAllLines(filePath);
                foreach (string line in lines)
                {
                	// context.Response.Write ( "/*" + line.ToString() + "*/" + "\n" );
                    string result = Parse(line, user, state, colors);
                    if (result != null)
                    {
                        sb.Append(result).Append("\n");
                    }
                }

                context.Response.Write ( sb.ToString() );
            }
            else
            {
                // Make it obvious that there is some kind of css fåk up.
                context.Response.Write("body { border: 1px solid red ! important; }");
                context.Response.StatusCode = 404;
            }
        }
		
		/**
		 * Parse a sigle line
		 */
        private string Parse(string line, User user, State state, Colors colors)
        {
            string trim = line.Trim();

            if (trim.Length == 0) return null;

            char firstChar = trim[0];


            if (firstChar == '#' && trim.StartsWith("#endregion", StringComparison.Ordinal))
            {
                state.isValid = true;
                return null;
            }

			if (!state.isValid) 
			{
			    return null;
			}

            if (firstChar == '-' && trim.StartsWith("-vendor-", StringComparison.Ordinal))
            {
                String was = line;
                if (user.isWebKit)
                {
                    line = line.Replace("-vendor-", "-webkit-");
                }
                else if (user.isMozilla)
                {
                	line = line.Replace("-vendor-", "-moz-");
                }
                else if (user.isOpera)
                {
                    line = line.Replace("-vendor-", "-o-");
                }
                else
                {
                    line = line.Replace("-vendor-", "-ms-");
                }
                line += "\n" + was.Replace("-vendor-", "");
            }


            if (firstChar == '#' && trim.StartsWith("#region", StringComparison.Ordinal))
            {
            	if ( trim.IndexOf ( " " ) >-1 ) {
					string statement = trim.Split(' ')[ 1 ];
					switch (statement) {
						case "vista" :
							state.isValid = user.isVista;
							break;
						case "osx" :
							state.isValid = user.isOSX;
							break;
						case "default" :
							state.isValid = user.isDefault;
							break;
						case "moz" :
							state.isValid = user.isMozilla;
							break;
						case "ie" :
							state.isValid = !user.isMozilla;
							break;
                        case "ie6" :
                            state.isValid = user.isIE6;
                            break;
					}
				}

                return null;
            }

            if (firstChar == '@')
            {
                string statement = line.Substring(0, line.IndexOf(" "));
                switch (statement)
                {
                    case "@import":
                        string url = getURLPart ( line );
                        line = line.Replace(url, url + ".aspx");
                        break;
                    case "@namespace" :
                        line = user.isMozilla ? line : null;
                        break;
                }
            }
            else if (firstChar == '#')
            {
                string originalLine = line;

                string statement = line.Substring(0, line.IndexOf(" "));
                line = line.Substring(statement.Length + 1); // cutting statement and the following space
                switch (statement.Trim())
                {
                    case "#ie":
                        line = user.isIE ? line : null;
                        break;
                    case "#ie6":
                        line = user.isIE6 ? line : null;
                        break;
                    case "#ie7":
                        line = user.isIE7 ? line : null;
                        break;
                    case "#ie8":
                        line = user.isIE8 ? line : null;
                        break;
                    case "#moz":
                        line = user.isMozilla ? line : null;
                        break;
                    case "#opacity:":
                        string value = getValuePart(line);
                        line = "opacity: " + value + ";";
                        break;
                    case "#alphabackdrop:":
                        string url = getURLPart(line);
                        line = "background-image: url(\"" + url + "\");";
                        break;
                    case "#alphaimage:":
                        string url2 = getURLPart(line);
                        line = "background-image: url(\"" + url2 + "\"); background-repeat: no-repeat;";
                        break;

                    default:
                        // Line may contain an identifier
                        line = originalLine; 
                        break;
                }
            }


            if (line != null)
            {
                if (!user.isMozilla)
                {
                    line = line.Replace("ui|", string.Empty);
                }

                if(line.Contains("$"))
                {
                    line = line.Replace("${root}", state.rootPath)
                               .Replace("${folder}", state.folderPath)
                               .Replace("${skin}", state.skinPath);

                    while (line.Contains("$(color:"))
                    {
                        line = colorize(line, colors);
                    }
                }
            }

            return line;
        }

        private string colorize (string line, Colors colors )
        {

            string START = "$(color:";
            string STOP = ")";

            int index1 = line.IndexOf(START);
            string before = line.Substring(0,index1);
            string after = line.Substring(index1 , line.Length - index1);

            int index2 = after.IndexOf(STOP);
            string final = after.Substring(index2 + 1, after.Length - (index2 + 1));

            string key = after.Substring( START.Length, after.Length - START.Length - ( after.Length - index2 ));
            
            line = before + colors.get ( key ) + final;
            return line;
        }

		
		/**
		 * Isolate URL part of a line
		 */
        private string getURLPart(string line)
        {
            return line.Split('\"')[1];
        }

        /**
		 * Isolate value part of a line
		 */
        private string getValuePart(string line)
        {
            string two = line.Split(';')[0];
            return two.Trim();
        }
		
        // *
        // * Isolate $ notation part of a line
        // */
        //private string getVarPart (string line)
        //{
        //    string result = line;
        //    if ( line.Contains ( "${" ) && line.Contains ( "}" )) {
        //        int start = line.LastIndexOf("${");
        //        int stop = line.LastIndexOf("}");
        //        result = line.Substring(start, stop - start + 1);
        //    }
        //    return result;
        //}
    }
}