using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading;
using System.Web.WebPages;
using Composite.AspNet.Razor;
using Composite.C1Console.Elements;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Foundation;
using Composite.Core.Threading;
using Composite.Core.WebClient;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.PageTemplates.Razor
{
    [ConfigurationElementType(typeof(RazorPageTemplateProviderData))]
    internal class RazorPageTemplateProvider : IPageTemplateProvider
    {
        private static readonly string LayoutFileMask = "*.cshtml";
        private static readonly string LogTitle = typeof (RazorPageTemplateProvider).Name;

        private readonly string _providerName;
        private readonly string _templatesDirectory;
        private readonly string _templatesDirectoryVirtualPath;
        
        private readonly object _initializationLock = new object();
        private readonly C1FileSystemWatcher _watcher;
        private DateTime _lastUpdateTime;

        private volatile State _state;

        private class State
        {
            public List<PageTemplate> Templates;
            public Hashtable<Guid, TemplateRenderingInfo> RenderingInfo;
        }


        public RazorPageTemplateProvider(string providerName, string templatesDirectoryVirtualPath)
        {
            _providerName = providerName;
            _templatesDirectoryVirtualPath = templatesDirectoryVirtualPath;
            _templatesDirectory = PathUtil.Resolve(templatesDirectoryVirtualPath);

            _watcher = new C1FileSystemWatcher(_templatesDirectory, LayoutFileMask)
            {
                IncludeSubdirectories = true
            };

            _watcher.Created += Watcher_OnChanged;
            _watcher.Deleted += Watcher_OnChanged;
            _watcher.Changed += Watcher_OnChanged;
            _watcher.Renamed += Watcher_OnChanged;

            _watcher.EnableRaisingEvents = true;
        }

        public IPageRenderer BuildPageRenderer()
        {
            var state = GetInitializedState();

            return new RazorPageRenderer(state.RenderingInfo);
        }

        public IEnumerable<PageTemplate> GetPageTemplates()
        {
            return GetInitializedState().Templates;
        }

        private State GetInitializedState()
        {
            var state = _state;

            if (state != null) return state;
            
            lock (_initializationLock)
            {
                state = _state;

                if (state == null)
                {
                    _state = state = Initialize();
                }
            }
            

            return state;
        }


        private State Initialize()
        {
            var files = new C1DirectoryInfo(_templatesDirectory)
                           .GetFiles(LayoutFileMask, SearchOption.AllDirectories)
                           .Where(f => !f.Name.StartsWith("_", StringComparison.Ordinal));


            var templates = new List<PageTemplate>();
            var templateRenderingData = new Hashtable<Guid, TemplateRenderingInfo>();

            // Loading and compiling layout controls
            foreach (var fileInfo in files)
            {
                WebPageBase webPage;

                string virtualPath = ConvertToVirtualPath(fileInfo.FullName);

                try
                {
                    webPage = WebPage.CreateInstanceFromVirtualPath(virtualPath);
                }
                catch(Exception ex)
                {
                    Log.LogError(LogTitle, "Failed to parse file '{0}'", virtualPath);
                    Log.LogError(LogTitle, ex);
                    continue;
                }

                if(webPage == null || !(webPage is CompositeC1PageTemplate)) continue;
                
                PageTemplate parsedTemplate;
                IDictionary<string, PropertyInfo> placeholderProperties;

                ParseTemplate(fileInfo.FullName, webPage as CompositeC1PageTemplate, out parsedTemplate, out placeholderProperties);

                templates.Add(parsedTemplate);

                templateRenderingData.Add(parsedTemplate.Id, new TemplateRenderingInfo(virtualPath, placeholderProperties));
            }

            return new State
                       {
                           Templates = templates,
                           RenderingInfo = templateRenderingData
                       };
        }

        public string ConvertToVirtualPath(string filePath)
        {
            return UrlUtils.Combine(_templatesDirectoryVirtualPath, filePath.Substring(_templatesDirectory.Length).Replace('\\', '/'));
        }

        private void ParseTemplate(string filePath,
                                   CompositeC1PageTemplate webPage, 
                                   out PageTemplate templateDescriptor, 
                                   out IDictionary<string, PropertyInfo> placeholderProperties)
        {
            templateDescriptor = new RazorPageTemplate(filePath);

            TemplateDefinitionHelper.ExtractPageTemplateInfo(webPage, templateDescriptor, out placeholderProperties);
        }

        public void Reinitialize()
        {
            lock (_initializationLock)
            {
                var timeSpan = DateTime.Now - _lastUpdateTime;
                if (timeSpan.TotalMilliseconds <= 100)
                {
                    return;
                }

                try
                {
                    using (ThreadDataManager.EnsureInitialize())
                    {
                        Initialize();
                    }

                    PageTemplateProviderRegistry.Flush();
                }
                catch (ThreadAbortException)
                {
                    // Exception will propagate
                }
                catch (Exception ex)
                {
                    Log.LogError(LogTitle, ex);
                }

                _lastUpdateTime = DateTime.Now;
            }
        }

        private void Watcher_OnChanged(object sender, FileSystemEventArgs e)
        {
            // Ignoring system and temporary files
            if(e.Name.StartsWith("_"))
            {
                return;
            }

            Reinitialize();
        }


        public IEnumerable<ElementAction> GetRootActions()
        {
            return new ElementAction[0];
        }

        public IEnumerable<string> GetSharedFiles()
        {
            return new string[0];
        }

        public void Flush()
        {
            lock(_initializationLock)
            {
                _state = null;
            }
        }
    }
}
