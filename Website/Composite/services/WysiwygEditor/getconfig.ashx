<%@ WebHandler Language="C#" Class="Composite.services.WysiwygEditor.GetConfig" %>

using Composite.Core;
using Composite.Core.IO;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Xml.Linq;

namespace Composite.services.WysiwygEditor
{
    /// <summary>
    /// Returns config xml to the Visual Editor - will annotate css paths with a time-stamp-hash as to force client to reload css when css'ish changes happen on the website (only)
    /// </summary>
    public class GetConfig : IHttpHandler
    {
        private const string visualEditorConfigFolderVirtualPath = "~/Frontend/Config/VisualEditor";

        private static Dictionary<string, string> _configCache = new Dictionary<string, string>();
        private static C1FileSystemWatcher _cssChangeWatcher;
        private static C1FileSystemWatcher _frontendChangeWatcher;
        private static object _lock = new object();
       
        public void ProcessRequest(HttpContext context)
        {
            string configName = context.Request.QueryString["name"];

            context.Response.ContentType = "text/xml";
            context.Response.Write(GetConfigAsString(context, configName));
        }


        
        private string GetConfigAsString(HttpContext context, string configName)
        {
            EnsureFileWatcher();
            
            string result = null;
            if (_configCache.TryGetValue(configName, out result))
            {
                return result;
            }

            lock (_lock)
            {
                if (_configCache.TryGetValue(configName, out result))
                {
                    return result;
                }

                result = GetStampedConfig(context, configName).ToString();
                _configCache.Add(configName, result);
                return result;
            }
        } 


        
        private void EnsureFileWatcher()
        {
            if (_cssChangeWatcher == null)
            {
                lock (_lock)
                {
                    if (_cssChangeWatcher == null)
                    {
                        _cssChangeWatcher = new C1FileSystemWatcher(PathUtil.Resolve("~"), "*.*ss")
                        {
                            NotifyFilter = NotifyFilters.LastWrite,
                            EnableRaisingEvents = true,
                            IncludeSubdirectories = true
                        };

                        _frontendChangeWatcher = new C1FileSystemWatcher(PathUtil.Resolve("~/Frontend"), "*")
                        {
                            NotifyFilter = NotifyFilters.LastWrite,
                            EnableRaisingEvents = true,
                            IncludeSubdirectories = true
                        };

                        _cssChangeWatcher.Changed += _cssChangeWatcher_Changed;
                        _frontendChangeWatcher.Changed += _cssChangeWatcher_Changed;
                    }
                }
            }
        }

        
        
        void _cssChangeWatcher_Changed(object sender, FileSystemEventArgs e)
        {
            lock (_lock)
            {
                _configCache = new Dictionary<string, string>();
            }
        }

        
        
        private XDocument GetStampedConfig(HttpContext context, string configName)
        {
            
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

            string stamp = GetStamp(context, styleElements, visualEditorConfigFolderPath);

            foreach (XElement styleElement in styleElements)
            {
                string cssRelativaPath = (string)styleElement.Attribute("file");
                if (!string.IsNullOrEmpty(cssRelativaPath) && cssRelativaPath.IndexOf('?') == -1)
                {
                    styleElement.Attribute("file").Value = string.Format("{0}?stamp={1}", cssRelativaPath, stamp);
                }
            }

            return configDoc;
        }

        
        
        private string GetStamp(HttpContext context, IEnumerable<XElement> styleElements, string visualEditorConfigFolderPath) 
        {
            List<DateTime> dates = new List<DateTime>();
            
            string frontEndFolderPath = context.Server.MapPath("~/Frontend");
            DirectoryInfo frontendFolderInfo = new DirectoryInfo(frontEndFolderPath);
            dates.Add(frontendFolderInfo.GetFiles("*", SearchOption.AllDirectories).OrderByDescending(d => d.LastWriteTime).First().LastWriteTime);

            foreach (XElement styleElement in styleElements)
            {
                string cssRelativaPath = (string)styleElement.Attribute("file");
                if (!string.IsNullOrEmpty(cssRelativaPath))
                {
                    try
                    {
                        string cssFilePath = Path.Combine(visualEditorConfigFolderPath, cssRelativaPath);
                        if (File.Exists(cssFilePath))
                        {
                            FileInfo fi = new FileInfo(cssFilePath);
                            dates.Add(fi.LastWriteTime);
                        }
                    }
                    catch (Exception ex)
                    {
                        Log.LogError("getconfig.ashx", ex);                     
                    }
                }
            }

            return dates.OrderBy(f => f).Last().GetHashCode().ToString();
        }


        
        public bool IsReusable
        {
            get
            {
                return true;
            }
        }
        
    }
}
