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
using Composite.Core.Threading;
using Composite.Core.WebClient;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.PageTemplates.MasterPages
{
    [ConfigurationElementType(typeof(MasterPagePageTemplateProviderData))]
    internal class MasterPagePageTemplateProvider: IPageTemplateProvider
    {
        private static readonly string LogTitle = typeof (MasterPagePageTemplateProvider).FullName;

        private static readonly string MasterPageFileMask = "*.master";
        private static readonly string FileWatcherMask = "*.";
        private static readonly string FileWatcher_Regex = @"\.cs|\.master\.common";

        private readonly string _templatesDirectoryVirtualPath;
        private readonly string _templatesDirectory;

        private List<PageTemplate> _templates;
        private Hashtable<Guid, MasterPageRenderingInfo> _renderingInfo;
        private List<string> _sharedSourceFiles;

        private readonly object _initializationLock = new object();
        private readonly C1FileSystemWatcher _watcher;
        private DateTime _lastUpdateTime;

        public MasterPagePageTemplateProvider(string name, string templatesDirectoryVirtualPath)
        {
            _templatesDirectoryVirtualPath = templatesDirectoryVirtualPath;
            _templatesDirectory = PathUtil.Resolve(_templatesDirectoryVirtualPath);

            Verify.That(C1Directory.Exists(_templatesDirectory), "Folder '{0}' does not exist", _templatesDirectory);

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

            return new MasterPagePageRenderer(_renderingInfo);
        }

        public IEnumerable<ElementAction> GetRootActions()
        {
            return new ElementAction[0];
        }


        public IEnumerable<string> GetSharedFiles()
        {
            EnsureInitialization();

            return _sharedSourceFiles;
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
            var files = new C1DirectoryInfo(_templatesDirectory)
                           .GetFiles(MasterPageFileMask, SearchOption.AllDirectories)
                           .Where(f => !f.Name.StartsWith("_", StringComparison.Ordinal));


            var templates = new List<PageTemplate>();
            var templateRenderingData = new Hashtable<Guid, MasterPageRenderingInfo>();
            var sharedSourceFiles = new List<string>();

            // Loading and compiling layout controls
            foreach (var fileInfo in files)
            {
                MasterPage masterPage;

                string virtualPath = ConvertToVirtualPath(fileInfo.FullName);
                try
                {
                    masterPage = CompilationHelper.CompileMasterPage(virtualPath);
                }
                catch (Exception ex)
                {
                    Log.LogError(LogTitle, "Failed to compile master page file '{0}'", virtualPath);
                    Log.LogError(LogTitle, ex);
                    continue;
                }

                if (masterPage == null)
                {
                    continue;
                } 
                if (!(masterPage is MasterPagePageTemplate))
                {
                    sharedSourceFiles.Add(ConvertToVirtualPath(fileInfo.FullName));

                    string csFile = fileInfo.FullName + ".cs";
                    if (File.Exists(csFile))
                    {
                        sharedSourceFiles.Add(ConvertToVirtualPath(csFile));
                    }

                    continue;
                }

                MasterPageTemplate parsedTemplate;
                MasterPageRenderingInfo renderingInfo;

                ParseTemplate(virtualPath, fileInfo.FullName, masterPage as MasterPagePageTemplate, out parsedTemplate, out renderingInfo);
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
            _sharedSourceFiles = sharedSourceFiles;
        }

        private void ParseTemplate(string virtualPath, 
                                           string filePath, 
                                           MasterPagePageTemplate masterPage,
                                           out MasterPageTemplate pageTemplate,
                                           out MasterPageRenderingInfo renderingInfo)
        {
            string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(filePath);

            string csFile = filePath + ".cs";
            if (!C1File.Exists(csFile)) csFile = null;

            pageTemplate = new MasterPageTemplate(filePath, csFile);
            IDictionary<string, PropertyInfo> placeholderProperties;

            TemplateDefinitionHelper.ExtractPageTemplateInfo(masterPage, pageTemplate, out placeholderProperties);

            if(pageTemplate.Title == null)
            {
                pageTemplate.Title = fileNameWithoutExtension;
            }

            renderingInfo = new MasterPageRenderingInfo(virtualPath, placeholderProperties);
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
