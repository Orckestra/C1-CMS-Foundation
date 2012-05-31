using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;
using System.Web.Compilation;
using System.Web.UI;
using System.Web.Util;
using Composite.C1Console.Elements;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Foundation;
using Composite.Core.PageTemplates.Plugins;
using Composite.Core.Threading;
using Composite.Core.WebClient;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.PageTemplates.MasterPages
{
    [ConfigurationElementType(typeof(NonConfigurablePageTemplateProvider))]
    internal class MasterPagesPageTemplateProvider: IPageTemplateProvider
    {
        private static readonly string LogTitle = typeof (MasterPagesPageTemplateProvider).FullName;

        private static readonly string MasterPageFileMask = "*.master";
        private static readonly string FileWatcherMask = "*.";
        private static readonly string FileWatcher_Regex = @"\.cs|\.master\.common";
        private const string _templatesDirectoryVirtualPath = "~/App_Data/PageTemplates";
        private readonly string _templatesDirectory = PathUtil.Resolve(_templatesDirectoryVirtualPath);

        private List<PageTemplate> _templates = null;
        private Hashtable<Guid, MasterPageRenderingInfo> _renderingInfo = null;

        private readonly object _initializationLock = new object();
        private readonly C1FileSystemWatcher _watcher;
        private DateTime _lastUpdateTime;

        public MasterPagesPageTemplateProvider()
        {
            _watcher = new C1FileSystemWatcher(_templatesDirectory, FileWatcherMask)
            {
                IncludeSubdirectories = true
            };

            _watcher.Created += Watcher_OnChanged;
            _watcher.Deleted += Watcher_OnChanged;
            _watcher.Changed += Watcher_OnChanged;
            _watcher.Renamed += Watcher_OnChanged;

            _watcher.EnableRaisingEvents = true;
        }

        public IEnumerable<PageTemplate> GetPageTemplates()
        {
            EnsureInitialization();

            return _templates;
        }

        public IPageRenderer BuildPageRenderer()
        {
            EnsureInitialization();

            return new MasterPagesPageRenderer(_renderingInfo);
        }

        public IEnumerable<ElementAction> GetRootActions()
        {
            return new ElementAction[0];
        }

        private void EnsureInitialization()
        {
            if (_templates == null)
            lock (_initializationLock)
            if (_templates == null)
            {
                Initialize();

                Verify.IsNotNull(_templates, "Templates weren't initialized");
            }
        }

        private void Initialize()
        {
            var files = new DirectoryInfo(_templatesDirectory)
                           .EnumerateFiles(MasterPageFileMask, SearchOption.AllDirectories)
                           .Where(f => !f.Name.StartsWith("_", StringComparison.Ordinal));


            var templates = new List<PageTemplate>();
            var templateRenderingData = new Hashtable<Guid, MasterPageRenderingInfo>();

            // Loading and compiling layout controls
            foreach (var fileInfo in files)
            {
                MasterPage masterPage;

                string virtualPath = ConvertToVirtualPath(fileInfo.FullName);
                try
                {
                    masterPage = CompileMasterPage(virtualPath);
                }
                catch (Exception ex)
                {
                    Log.LogError(LogTitle, "Failed to compile master page file '{0}'", virtualPath);
                    Log.LogError(LogTitle, ex);
                    continue;
                }

                if (masterPage == null || !(masterPage is C1MasterPage)) continue;

                PageTemplate parsedTemplate;
                MasterPageRenderingInfo renderingInfo;

                ParseTemplate(virtualPath, fileInfo.FullName, masterPage as C1MasterPage, out parsedTemplate, out renderingInfo);
                if(parsedTemplate == null)
                {
                    return;
                }

                templates.Add(parsedTemplate);

                if (templateRenderingData.ContainsKey(parsedTemplate.Id))
                {
                    throw new InvalidOperationException("Multiple master page templates defined with the same ID '{0}'".FormatWith(parsedTemplate.Id));
                }
                templateRenderingData.Add(parsedTemplate.Id, renderingInfo);
            }

            _templates = templates;
            _renderingInfo = templateRenderingData;
        }

        private void ParseTemplate(string virtualPath, 
                                           string fileName, 
                                           C1MasterPage masterPage, 
                                           out PageTemplate pageTemplate,
                                           out MasterPageRenderingInfo renderingInfo)
        {
            string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(fileName);

            pageTemplate = new PageTemplate();
            IDictionary<string, PropertyInfo> placeholderProperties;

            TemplateDefinitionHelper.ExtractPageTemplateInfo(masterPage, pageTemplate, out placeholderProperties);

            if(pageTemplate.Title == null)
            {
                pageTemplate.Title = fileNameWithoutExtension;
            }

            renderingInfo = new MasterPageRenderingInfo(virtualPath, placeholderProperties);
        }

        private MasterPage CompileMasterPage(string virtualPath)
        {
            // Calling: object virtualPathObj = new System.Web.VirtualPath(virtualPath);
            Assembly asmSystemWeb = typeof (HttpContext).Assembly;
            Type tVirtualType = asmSystemWeb.GetType("System.Web.VirtualPath");
            var virtualTypeConstructor = tVirtualType.GetConstructor(BindingFlags.NonPublic | BindingFlags.Instance, null,
                                                                     new[] {typeof (string)}, null);
            object virtualPathObj = virtualTypeConstructor.Invoke(new object[] {virtualPath});

            // Calling: return System.Web.Compilation.BuildManager.GetVPathBuildResultWithNoAssert(null, virtualPathObj, false, false, false)

            IWebObjectFactory factory = typeof(BuildManager)
                   .GetMethod("GetVPathBuildResultWithNoAssert",
                              BindingFlags.NonPublic | BindingFlags.Static,
                              null,
                              CallingConventions.Any,
                              new Type[] { typeof(HttpContext), tVirtualType, typeof(bool), typeof(bool), typeof(bool) },
                              null)
                    .Invoke(null, new object[] { null, virtualPathObj, false, false, false }) as IWebObjectFactory;

            Verify.IsNotNull(factory, "Failed to compile master page file");

            return factory.CreateInstance() as MasterPage;
        }

        public string ConvertToVirtualPath(string filePath)
        {
            return UrlUtils.Combine(_templatesDirectoryVirtualPath, filePath.Substring(_templatesDirectory.Length).Replace('\\', '/'));
        }

        private void Watcher_OnChanged(object sender, FileSystemEventArgs e)
        {
            // Ignoring changes to files, not related to master pages
            if (!Regex.IsMatch(e.Name, FileWatcher_Regex, RegexOptions.IgnoreCase))
            {
                return;
            }

            Reinitialize();
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
                    // No logging, exception will propagate
                }
                catch (Exception ex)
                {
                    Log.LogError(LogTitle, ex);
                }

                _lastUpdateTime = DateTime.Now;
            }
        }
    }
}
