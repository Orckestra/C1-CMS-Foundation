<%@ WebHandler Language="C#" Class="Composite.services.WysiwygEditor.getconfig" %>

using Composite.Core;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace Composite.services.WysiwygEditor
{
    /// <summary>
    /// Summary description for getconfig
    /// </summary>
    public class getconfig : IHttpHandler
    {
        private const string visualEditorConfigFolderVirtualPath = "~/Frontend/Config/VisualEditor";
        
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/xml";

            string configName = context.Request.QueryString["name"];

            if (string.IsNullOrEmpty(configName))
            {
                Log.LogWarning("getconfig.ashx", "getconfig.ashx called without expected parameter 'name'");
                throw new ArgumentException("getconfig.ashx called without expected parameter 'name'");
            }

            string visualEditorConfigFolderPath = context.Server.MapPath(visualEditorConfigFolderVirtualPath);
            string filePath = Path.Combine(visualEditorConfigFolderPath, string.Format("{0}.xml", configName));

            if (!File.Exists(filePath))
            {
                Log.LogWarning("getconfig.ashx", "Configuration name '{0}' maps to unknown file '{1}'", configName, filePath);
                throw new ArgumentException(string.Format("Configuration name '{0}' maps to unknown file '{1}'", configName, filePath));
            }

            XDocument configDoc = XDocument.Load(filePath);

            var styleElements = configDoc.Root.Element("styles").Elements();

            List<DateTime> dates = new List<DateTime>();
            
            string frontEndFolderPath = context.Server.MapPath("~/Frontend");
            DirectoryInfo frontendFolderInfo = new DirectoryInfo(frontEndFolderPath);
            dates.Add(frontendFolderInfo.GetFiles("*", SearchOption.AllDirectories).OrderByDescending(d => d.LastWriteTime).First().LastWriteTime);

            foreach (XElement styleElement in styleElements)
            {
                string cssRelativaPath = (string)styleElement.Attribute("file");
                if (!string.IsNullOrEmpty(cssRelativaPath))
                {
                    string cssFilePath = Path.Combine(visualEditorConfigFolderPath, cssRelativaPath);
                    if (File.Exists(cssFilePath))
                    {
                        FileInfo fi = new FileInfo(cssFilePath);
                        dates.Add(fi.LastWriteTime);
                    }
                    else
                    {
                        Log.LogWarning("maw", "dod not expect this");
                    }
                }
            }

            string stamp = dates.OrderBy(f => f).Last().GetHashCode().ToString();

            foreach (XElement styleElement in styleElements)
            {
                string cssRelativaPath = (string)styleElement.Attribute("file");
                if (!string.IsNullOrEmpty(cssRelativaPath) && cssRelativaPath.IndexOf('?')==-1)
                {
                    styleElement.Attribute("file").Value = string.Format("{0}?stamp={1}", cssRelativaPath, stamp);
                }
            }

            context.Response.Write(configDoc.ToString());
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}
