using System;
using System.Collections.Generic;
using System.Configuration;
using System.Reflection;
using System.Web.Configuration;
using System.Web.Hosting;
using System.Xml.Linq;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;


namespace Composite.Core.IO
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class MimeTypeInfo
	{
        private static readonly IDictionary<string, string> _toCanonical = new Dictionary<string, string>();
        private static readonly IDictionary<string, string> _extensionToCanonical = new Dictionary<string, string>();
        private static readonly IDictionary<string, string> _mimeTypeToResourceName = new Dictionary<string, string>();

        private static readonly MethodInfo _getMimeMappingMethodInfo = typeof(System.Web.HttpUtility).Assembly
            .GetType("System.Web.MimeMapping").GetMethod("GetMimeMapping", BindingFlags.Static | BindingFlags.NonPublic);

        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }

        /// <exclude />
        public static string Jpeg
        {
            get { return "image/jpeg";}
        }

        /// <exclude />
        public static string Default
        {
            get { return "application/octet-stream"; }
        }

        /// <exclude />
        public static string Gif
        {
            get { return "image/gif"; }
        }

        /// <exclude />
        public static string Bmp
        {
            get { return "image/bmp"; }
        }

        /// <exclude />
        public static string Png
        {
            get { return "image/png"; }
        }

        /// <exclude />
        public static string Tiff
        {
            get { return "image/tiff"; }
        }

        /// <exclude />
        public static string Css
        {
            get { return "text/css"; }
        }

        /// <exclude />
        public static string Js
        {
            get { return "text/js"; }
        }

        /// <exclude />
        public static string Xml
        {
            get { return "text/xml"; }
        }

        /// <exclude />
        public static string Text
        {
            get { return "text/plain"; }
        }

        /// <exclude />
        public static string Html
        {
            get { return "text/html"; }
        }

        /// <exclude />
        public static string Flash
        {
            get { return "application/x-shockwave-flash"; }
        }

        /// <exclude />
        public static string QuickTime
        {
            get { return "video/quicktime"; }
        }

        /// <exclude />
        public static string Wmv
        {
            get { return "video/x-ms-wmv"; }
        }

        /// <exclude />
        public static string Asf
        {
            get { return "video/x-ms-asf"; }
        }

        /// <exclude />
        public static string Avi
        {
            get { return "video/x-msvideo"; }
        }

        /// <exclude />
        public static string Flv
        {
            get { return "video/x-flv"; }
        }

        /// <exclude />
        public static string Director
        {
            get { return "application/x-director"; }
        }

        /// <exclude />
        public static string CSharp
        {
            get { return "text/x-csharp"; }
        }

        /// <exclude />
        public static string CsHtml
        {
            get { return "application/x-cshtml"; }
        }

        /// <exclude />
        public static string Ascx
        {
            get { return "application/x-ascx"; }
        }

        /// <exclude />
        public static string Aspx
        {
            get { return "application/x-aspx"; }
        }

        /// <exclude />
        public static string Ashx
        {
            get { return "application/x-ashx"; }
        }

        /// <exclude />
        public static string Resx
        {
            get { return "application/x-resx"; }
        }

        /// <exclude />
        public static string MasterPage
        {
            get { return "application/x-master-page"; }
        }


        /// <exclude />
        static MimeTypeInfo()
        {
            LoadExtensionMappingsFromWebConfig();

            // jpeg
            _toCanonical.Add("image/pjpg", Jpeg);
            _toCanonical.Add("image/pjpeg", Jpeg);
            _toCanonical.Add("image/jpg", Jpeg);
            _toCanonical.Add("image/jpeg", Jpeg);
            AddExtensionMapping("jpg", Jpeg);
            AddExtensionMapping("jpe", Jpeg);
            AddExtensionMapping("jpeg", Jpeg);
            _mimeTypeToResourceName.Add(Jpeg, "mimetype-jpeg");

            // gif
            _toCanonical.Add("image/gif", Gif);
            AddExtensionMapping("gif", Gif);
            _mimeTypeToResourceName.Add(Gif, "mimetype-gif");


            // bmp
            _toCanonical.Add("image/bmp", Bmp);
            AddExtensionMapping("bmp", Bmp);
            _mimeTypeToResourceName.Add(Bmp, "mimetype-bmp");

            // png
            _toCanonical.Add("image/png", Png);
            _toCanonical.Add("image/x-png", Png);
            AddExtensionMapping("png", Png);
            _mimeTypeToResourceName.Add(Png, "mimetype-png");

            // tiff
            _toCanonical.Add("image/tif", Tiff);
            _toCanonical.Add("image/tiff", Tiff);
            AddExtensionMapping("tif", Tiff);
            _mimeTypeToResourceName.Add(Tiff, "mimetype-tiff");


            // css
            _toCanonical.Add("text/css", Css);
            AddExtensionMapping("css", Css);
            AddExtensionMapping("less", Css);
            _mimeTypeToResourceName.Add(Css, "mimetype-css");

            // Resx
            _toCanonical.Add(Resx, Resx);
            AddExtensionMapping("resx", Resx);
            _mimeTypeToResourceName.Add(Resx, "mimetype-resx");

            // js
            _toCanonical.Add("text/js", Js);
            _toCanonical.Add("application/x-javascript", Js);
            AddExtensionMapping("js", Js);
            _mimeTypeToResourceName.Add(Js, "mimetype-js");


            // flv
            _toCanonical.Add("video/x-flv", Flv);
            AddExtensionMapping("flv", Flv);


            _toCanonical.Add("video/x-ms-asf", Asf);
            AddExtensionMapping("asf", Asf);
            _mimeTypeToResourceName.Add(Asf, "mimetype-asf");

            _toCanonical.Add("video/x-msvideo", Avi);
            AddExtensionMapping("avi", Avi);
            _mimeTypeToResourceName.Add(Avi, "mimetype-movie");

            _toCanonical.Add("application/msword", "application/msword");
            AddExtensionMapping("doc", "application/msword");
            _mimeTypeToResourceName.Add("application/msword", "mimetype-doc");

            _toCanonical.Add("application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
            AddExtensionMapping("docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
            _mimeTypeToResourceName.Add("application/vnd.openxmlformats-officedocument.wordprocessingml.document", "mimetype-doc");

            _toCanonical.Add("application/postscript", "application/postscript");
            AddExtensionMapping("eps", "application/postscript");
            _mimeTypeToResourceName.Add("application/postscript", "mimetype-pps");

            _toCanonical.Add("text/html", "text/html");
            AddExtensionMapping("htm", "text/html");
            AddExtensionMapping("html", "text/html");
            AddExtensionMapping("xhtml", "text/html");
            _mimeTypeToResourceName.Add("text/html", "mimetype-html");

            _toCanonical.Add("application/msaccess", "application/msaccess");
            AddExtensionMapping("mdb", "application/msaccess");
            _mimeTypeToResourceName.Add("application/msaccess", "mimetype-mdb");

            _toCanonical.Add("video/quicktime", QuickTime);
            AddExtensionMapping("mov", QuickTime);
            _mimeTypeToResourceName.Add("video/quicktime", "mimetype-mov");

            _toCanonical.Add("audio/mpeg", "audio/mpeg");
            AddExtensionMapping("mp3", "audio/mpeg");
            _mimeTypeToResourceName.Add("audio/mpeg", "mimetype-mp3");
  
            _toCanonical.Add("video/mpeg", "video/mpeg");
            AddExtensionMapping("mpeg", "video/mpeg");
            AddExtensionMapping("mpg", "video/mpeg");
            _mimeTypeToResourceName.Add("video/mpeg", "mimetype-mpeg");

            _toCanonical.Add("application/pdf", "application/pdf");
            AddExtensionMapping("pdf", "application/pdf");
            _mimeTypeToResourceName.Add("application/pdf", "mimetype-pdf");

            _toCanonical.Add("application/vnd.ms-powerpoint", "application/vnd.ms-powerpoint");
            AddExtensionMapping("ppt", "application/vnd.ms-powerpoint");
            _mimeTypeToResourceName.Add("application/vnd.ms-powerpoint", "mimetype-ppt");

            _toCanonical.Add("application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
            AddExtensionMapping("pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
            _mimeTypeToResourceName.Add("application/vnd.openxmlformats-officedocument.presentationml.presentation", "mimetype-ppt");

            _toCanonical.Add("audio/x-pn-realaudio", "audio/x-pn-realaudio");
            AddExtensionMapping("ram", "audio/x-pn-realaudio");
            AddExtensionMapping("rm", "audio/x-pn-realaudio");
            _mimeTypeToResourceName.Add("audio/x-pn-realaudio", "mimetype-ram");

            _toCanonical.Add("application/rtf", "application/rtf");
            AddExtensionMapping("rtf", "application/rtf");
            _mimeTypeToResourceName.Add("application/rtf", "mimetype-rtf");

            _toCanonical.Add("application/x-shockwave-flash", Flash);
            AddExtensionMapping("swf", Flash);
            _mimeTypeToResourceName.Add("application/x-shockwave-flash", "mimetype-swf");

            _toCanonical.Add("application/x-director", Director);
            AddExtensionMapping("dcr", Director);
            AddExtensionMapping("dir", Director);
            _mimeTypeToResourceName.Add("application/x-director", "mimetype-dir");

            _toCanonical.Add("application/vnd.visio", "application/vnd.visio");
            AddExtensionMapping("vsd", "application/vnd.visio");
            _mimeTypeToResourceName.Add("application/vnd.visio", "mimetype-vsd");

            _toCanonical.Add("audio/x-wav", "audio/x-wav");
            AddExtensionMapping("wav", "audio/x-wav");
            _mimeTypeToResourceName.Add("audio/x-wav", "mimetype-vaw");

            _toCanonical.Add("video/x-ms-wmv", Wmv);
            AddExtensionMapping("wmv", Wmv);
            _mimeTypeToResourceName.Add("video/x-ms-wmv", "mimetype-wmv");

            _toCanonical.Add("application/vnd.ms-excel", "application/vnd.ms-excel");
            AddExtensionMapping("xls", "application/vnd.ms-excel");
            _mimeTypeToResourceName.Add("application/vnd.ms-excel", "mimetype-xls");

            _toCanonical.Add("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            AddExtensionMapping("xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            _mimeTypeToResourceName.Add("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "mimetype-xls");

            _toCanonical.Add("text/xml", "text/xml");
            AddExtensionMapping("xml", "text/xml");
            AddExtensionMapping("xsl", "text/xml");
            AddExtensionMapping("xslt", "text/xml");
            AddExtensionMapping("config", "text/xml");
            _mimeTypeToResourceName.Add("text/xml", "mimetype-xml");

            string mimeTypeZip = "application/zip";
            _toCanonical.Add(mimeTypeZip, mimeTypeZip);
            _toCanonical.Add("application/x-zip-compressed", mimeTypeZip);
            AddExtensionMapping("zip", mimeTypeZip);
            _mimeTypeToResourceName.Add(mimeTypeZip, "mimetype-zip");

            _toCanonical.Add("text/plain", "text/plain");
            _toCanonical.Add("text/txt", "text/plain");
            _toCanonical.Add("text/text", "text/plain");
            AddExtensionMapping("txt", "text/plain");
            _mimeTypeToResourceName.Add("text/plain", "mimetype-txt");


            // .Cs and asp.net files
            _toCanonical.Add(MimeTypeInfo.CSharp, MimeTypeInfo.CSharp);
            AddExtensionMapping("cs", MimeTypeInfo.CSharp);

            _toCanonical.Add(MimeTypeInfo.Ascx, MimeTypeInfo.Ascx);
            AddExtensionMapping("ascx", MimeTypeInfo.Ascx);
            _mimeTypeToResourceName.Add(MimeTypeInfo.Ascx, "mimetype-ascx");

            _toCanonical.Add(MimeTypeInfo.CsHtml, MimeTypeInfo.CsHtml);
            AddExtensionMapping("cshtml", MimeTypeInfo.CsHtml);
            _mimeTypeToResourceName.Add(MimeTypeInfo.CsHtml, "mimetype-cshtml");

            _toCanonical.Add(MimeTypeInfo.Aspx, MimeTypeInfo.Aspx);
            AddExtensionMapping("aspx", MimeTypeInfo.Aspx);
            _mimeTypeToResourceName.Add(MimeTypeInfo.Aspx, "mimetype-aspx");

            _toCanonical.Add(MimeTypeInfo.Ashx, MimeTypeInfo.Ashx);
            AddExtensionMapping("ashx", MimeTypeInfo.Ashx);

            _toCanonical.Add(MimeTypeInfo.MasterPage, MimeTypeInfo.MasterPage);
            AddExtensionMapping("master", MimeTypeInfo.MasterPage);

            AddExtensionMapping("mp4", "video/mp4");
            AddExtensionMapping("ogg", "audio/ogg");
            AddExtensionMapping("ogv", "video/ogg");
            AddExtensionMapping("webm", "video/webm");
            AddExtensionMapping("svg", "image/svg+xml");
            AddExtensionMapping("svgz", "mage/svg+xml");
            AddExtensionMapping("flv4", "video/mp4");
            AddExtensionMapping("eot", "application/vnd.ms-fontobject");
        }

        private static bool AddExtensionMapping(string extension, string mimeType)
        {
            if(!_extensionToCanonical.ContainsKey(extension))
            {
                _extensionToCanonical.Add(extension, mimeType);
                return true;
            }

            return false;
        }

        private static void LoadExtensionMappingsFromWebConfig()
	    {
            ConfigurationSection config;
            try
            {
                config = WebConfigurationManager.OpenWebConfiguration(HostingEnvironment.ApplicationVirtualPath).GetSection("system.webServer");
            }
            catch
	        {
                // Silent
                return;
	        }

            if(config == null)
            {
                return;
            }

            XElement webServerConfig = XElement.Parse(config.SectionInformation.GetRawXml());
            XElement staticContentConfig = webServerConfig.Element("staticContent");
            if(staticContentConfig == null)
            {
                return;
            }

            foreach(XElement mimeMapping in staticContentConfig.Elements("mimeMap"))
            {
                string extension = mimeMapping.Attribute("fileExtension").Value.ToLower();
                string mimeType = mimeMapping.Attribute("mimeType").Value;

                if(extension.StartsWith("."))
                {
                    extension = extension.Substring(1);
                }

                if (!AddExtensionMapping(extension, mimeType))
                {
                    Log.LogWarning(typeof(MimeTypeInfo).Name, "MimeType for extension '{0}' has already been defined", extension);
                }
            }
	    }

        /// <exclude />
        public static string GetCanonical(string mimeType)
        {
            if (string.IsNullOrEmpty(mimeType))
            {
                return MimeTypeInfo.Default;
            }

            mimeType = mimeType.ToLower();

            if (_toCanonical.ContainsKey(mimeType))
            {
                return _toCanonical[mimeType];
            }

            return mimeType;
        }



        /// <exclude />
        public static ResourceHandle GetResourceHandleFromMimeType(string mimeType)
        {
            if (mimeType == null)
            {
                return GetIconHandle("mimetype-unknown");
            }

            if (_mimeTypeToResourceName.ContainsKey(mimeType))
            {
                return GetIconHandle(_mimeTypeToResourceName[mimeType]);
            }
            return GetIconHandle("mimetype-unknown");
        }



        /// <exclude />
        public static string GetCanonicalFromExtension(string extension)
        {
            if (extension == null)
            {
                return MimeTypeInfo.Default;
            }

            extension = extension.ToLower();

            if (extension.StartsWith("."))
            {
                extension = extension.Substring(1);
            }

            if (_extensionToCanonical.ContainsKey(extension.ToLower()))
            {
                return _extensionToCanonical[extension];
            }

            string fileName = "filename." + extension;
            return _getMimeMappingMethodInfo.Invoke(null, new object[] { fileName }) as string;
        }
	}
}
