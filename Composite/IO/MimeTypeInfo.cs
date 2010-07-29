using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.ResourceSystem;
using Composite.ResourceSystem.Icons;


namespace Composite.IO
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public static class MimeTypeInfo
	{
        private static IDictionary<string, string> _toCanonical = new Dictionary<string, string>();
        private static IDictionary<string, string> _extensionToCanonical = new Dictionary<string, string>();
        private static IDictionary<string, string> _mimeTypeToResourceName = new Dictionary<string, string>();

        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
              
        public static string Jpeg
        {
            get { return "image/jpeg";}
        }

        public static string Default
        {
            get { return "application/octet-stream"; }
        }

        public static string Gif
        {
            get { return "image/gif"; }
        }

        public static string Bmp
        {
            get { return "image/bmp"; }
        }

        public static string Png
        {
            get { return "image/png"; }
        }

        public static string Tiff
        {
            get { return "image/tiff"; }
        }

        public static string Css
        {
            get { return "text/css"; }
        }

        public static string Js
        {
            get { return "text/js"; }
        }

        public static string Xml
        {
            get { return "text/xml"; }
        }

        public static string Text
        {
            get { return "text/plain"; }
        }

        public static string Html
        {
            get { return "text/html"; }
        }

        public static string Flash
        {
            get { return "application/x-shockwave-flash"; }
        }

        public static string QuickTime
        {
            get { return "video/quicktime"; }
        }

        public static string Wmv
        {
            get { return "video/x-ms-wmv"; }
        }

        public static string Asf
        {
            get { return "video/x-ms-asf"; }
        }

        public static string Avi
        {
            get { return "video/x-msvideo"; }
        }

        public static string Flv
        {
            get { return "video/x-flv"; }
        }

        public static string Director
        {
            get { return "application/x-director"; }
        }

        public static string CSharp
        {
            get { return "text/x-csharp"; }
        }

        public static string Ascx
        {
            get { return "application/x-ascx"; }
        }

        public static string Aspx
        {
            get { return "application/x-aspx"; }
        }

        public static string Ashx
        {
            get { return "application/x-ashx"; }
        }

        public static string Resx
        {
            get { return "application/x-resx"; }
        }

        public static string MasterPage
        {
            get { return "application/x-master-page"; }
        }

        static MimeTypeInfo()
        {
            // jpeg
            _toCanonical.Add("image/pjpg", Jpeg);
            _toCanonical.Add("image/pjpeg", Jpeg);
            _toCanonical.Add("image/jpg", Jpeg);
            _toCanonical.Add("image/jpeg", Jpeg);
            _extensionToCanonical.Add("jpg", Jpeg);
            _extensionToCanonical.Add("jpe", Jpeg);
            _extensionToCanonical.Add("jpeg", Jpeg);
            _mimeTypeToResourceName.Add(Jpeg, "mimetype-jpeg");

            // gif
            _toCanonical.Add("image/gif", Gif);
            _extensionToCanonical.Add("gif", Gif);
            _mimeTypeToResourceName.Add(Gif, "mimetype-gif");


            // bmp
            _toCanonical.Add("image/bmp", Bmp);
            _extensionToCanonical.Add("bmp", Bmp);
            _mimeTypeToResourceName.Add(Bmp, "mimetype-bmp");

            // png
            _toCanonical.Add("image/png", Png);
            _extensionToCanonical.Add("png", Png);
            _mimeTypeToResourceName.Add(Png, "mimetype-png");

            // tiff
            _toCanonical.Add("image/tif", Tiff);
            _toCanonical.Add("image/tiff", Tiff);
            _extensionToCanonical.Add("tif", Tiff);
            _mimeTypeToResourceName.Add(Tiff, "mimetype-tiff");


            // css
            _toCanonical.Add("text/css", Css);
            _extensionToCanonical.Add("css", Css);
            _mimeTypeToResourceName.Add(Css, "mimetype-css");

            // Resx
            _toCanonical.Add(Resx, Resx);
            _extensionToCanonical.Add("resx", Resx);
            _mimeTypeToResourceName.Add(Resx, "mimetype-resx");

            // js
            _toCanonical.Add("text/js", Js);
            _toCanonical.Add("application/x-javascript", Js);
            _extensionToCanonical.Add("js", Js);
            _mimeTypeToResourceName.Add(Js, "mimetype-js");


            // flv
            _toCanonical.Add("video/x-flv", Flv);
            _extensionToCanonical.Add("flv", Flv);


            _toCanonical.Add("video/x-ms-asf", Asf);
            _extensionToCanonical.Add("asf", Asf);
            _mimeTypeToResourceName.Add(Asf, "mimetype-asf");

            _toCanonical.Add("video/x-msvideo", Avi);
            _extensionToCanonical.Add("avi", Avi);
            _mimeTypeToResourceName.Add(Avi, "mimetype-movie");

            _toCanonical.Add("application/msword", "application/msword");
            _extensionToCanonical.Add("doc", "application/msword");
            _mimeTypeToResourceName.Add("application/msword", "mimetype-doc");

            _toCanonical.Add("application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
            _extensionToCanonical.Add("docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
            _mimeTypeToResourceName.Add("application/vnd.openxmlformats-officedocument.wordprocessingml.document", "mimetype-doc");

            _toCanonical.Add("application/postscript", "application/postscript");
            _extensionToCanonical.Add("eps", "application/postscript");
            _mimeTypeToResourceName.Add("application/postscript", "mimetype-pps");

            _toCanonical.Add("text/html", "text/html");
            _extensionToCanonical.Add("htm", "text/html");
            _extensionToCanonical.Add("html", "text/html");
            _extensionToCanonical.Add("xhtml", "text/html");
            _mimeTypeToResourceName.Add("text/html", "mimetype-html");

            _toCanonical.Add("application/msaccess", "application/msaccess");
            _extensionToCanonical.Add("mdb", "application/msaccess");
            _mimeTypeToResourceName.Add("application/msaccess", "mimetype-mdb");

            _toCanonical.Add("video/quicktime", QuickTime);
            _extensionToCanonical.Add("mov", QuickTime);
            _mimeTypeToResourceName.Add("video/quicktime", "mimetype-mov");

            _toCanonical.Add("audio/mpeg", "audio/mpeg");
            _extensionToCanonical.Add("mp3", "audio/mpeg");
            _mimeTypeToResourceName.Add("audio/mpeg", "mimetype-mp3");
  
            _toCanonical.Add("video/mpeg", "video/mpeg");
            _extensionToCanonical.Add("mpeg", "video/mpeg");
            _extensionToCanonical.Add("mpg", "video/mpeg");
            _mimeTypeToResourceName.Add("video/mpeg", "mimetype-mpeg");

            _toCanonical.Add("application/pdf", "application/pdf");
            _extensionToCanonical.Add("pdf", "application/pdf");
            _mimeTypeToResourceName.Add("application/pdf", "mimetype-pdf");

            _toCanonical.Add("application/vnd.ms-powerpoint", "application/vnd.ms-powerpoint");
            _extensionToCanonical.Add("ppt", "application/vnd.ms-powerpoint");
            _mimeTypeToResourceName.Add("application/vnd.ms-powerpoint", "mimetype-ppt");

            _toCanonical.Add("application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
            _extensionToCanonical.Add("pptx", "application/vnd.openxmlformats-officedocument.presentationml.presentation");
            _mimeTypeToResourceName.Add("application/vnd.openxmlformats-officedocument.presentationml.presentation", "mimetype-ppt");

            _toCanonical.Add("audio/x-pn-realaudio", "audio/x-pn-realaudio");
            _extensionToCanonical.Add("ram", "audio/x-pn-realaudio");
            _extensionToCanonical.Add("rm", "audio/x-pn-realaudio");
            _mimeTypeToResourceName.Add("audio/x-pn-realaudio", "mimetype-ram");

            _toCanonical.Add("application/rtf", "application/rtf");
            _extensionToCanonical.Add("rtf", "application/rtf");
            _mimeTypeToResourceName.Add("application/rtf", "mimetype-rtf");

            _toCanonical.Add("application/x-shockwave-flash", Flash);
            _extensionToCanonical.Add("swf", Flash);
            _mimeTypeToResourceName.Add("application/x-shockwave-flash", "mimetype-swf");

            _toCanonical.Add("application/x-director", Director);
            _extensionToCanonical.Add("dcr", Director);
            _extensionToCanonical.Add("dir", Director);
            _mimeTypeToResourceName.Add("application/x-director", "mimetype-dir");

            _toCanonical.Add("application/vnd.visio", "application/vnd.visio");
            _extensionToCanonical.Add("vsd", "application/vnd.visio");
            _mimeTypeToResourceName.Add("application/vnd.visio", "mimetype-vsd");

            _toCanonical.Add("audio/x-wav", "audio/x-wav");
            _extensionToCanonical.Add("wav", "audio/x-wav");
            _mimeTypeToResourceName.Add("audio/x-wav", "mimetype-vaw");

            _toCanonical.Add("video/x-ms-wmv", Wmv);
            _extensionToCanonical.Add("wmv", Wmv);
            _mimeTypeToResourceName.Add("video/x-ms-wmv", "mimetype-wmv");

            _toCanonical.Add("application/vnd.ms-excel", "application/vnd.ms-excel");
            _extensionToCanonical.Add("xls", "application/vnd.ms-excel");
            _mimeTypeToResourceName.Add("application/vnd.ms-excel", "mimetype-xls");

            _toCanonical.Add("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            _extensionToCanonical.Add("xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            _mimeTypeToResourceName.Add("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "mimetype-xls");

            _toCanonical.Add("text/xml", "text/xml");
            _extensionToCanonical.Add("xml", "text/xml");
            _extensionToCanonical.Add("xsl", "text/xml");
            _extensionToCanonical.Add("xslt", "text/xml");
            _extensionToCanonical.Add("config", "text/xml");
            _mimeTypeToResourceName.Add("text/xml", "mimetype-xml");

            _toCanonical.Add("application/zip", "application/zip");
            _extensionToCanonical.Add("zip", "application/zip");
            _mimeTypeToResourceName.Add("application/zip", "mimetype-zip");

            _toCanonical.Add("text/plain", "text/plain");
            _toCanonical.Add("text/txt", "text/plain");
            _toCanonical.Add("text/text", "text/plain");
            _extensionToCanonical.Add("txt", "text/plain");
            _mimeTypeToResourceName.Add("text/plain", "mimetype-txt");


            // .Cs and asp.net files
            _toCanonical.Add(MimeTypeInfo.CSharp, MimeTypeInfo.CSharp);
            _extensionToCanonical.Add("cs", MimeTypeInfo.CSharp);

            _toCanonical.Add(MimeTypeInfo.Ascx, MimeTypeInfo.Ascx);
            _extensionToCanonical.Add("ascx", MimeTypeInfo.Ascx);
            _mimeTypeToResourceName.Add(MimeTypeInfo.Ascx, "mimetype-ascx");

            _toCanonical.Add(MimeTypeInfo.Aspx, MimeTypeInfo.Aspx);
            _extensionToCanonical.Add("aspx", MimeTypeInfo.Aspx);
            _mimeTypeToResourceName.Add(MimeTypeInfo.Aspx, "mimetype-aspx");

            _toCanonical.Add(MimeTypeInfo.Ashx, MimeTypeInfo.Ashx);
            _extensionToCanonical.Add("ashx", MimeTypeInfo.Ashx);

            _toCanonical.Add(MimeTypeInfo.MasterPage, MimeTypeInfo.MasterPage);
            _extensionToCanonical.Add("master", MimeTypeInfo.MasterPage);
        }



        public static string GetCanonical(string mimeType)
        {
            if (mimeType == null)
            {
                return MimeTypeInfo.Default;
            }

            mimeType = mimeType.ToLower();

            if (_toCanonical.ContainsKey(mimeType))
            {
                return _toCanonical[mimeType];
            }

            return MimeTypeInfo.Default;
        }



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

            return MimeTypeInfo.Default;
        }
	}
}
