using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Web.Hosting;
using System.Web.WebPages;
using Composite.C1Console.Elements;
using Composite.Core;
using Composite.Core.Caching;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Foundation;
using Composite.Core.WebClient;
using Composite.Core.WebClient.Services.WysiwygEditor;
using Composite.Plugins.PageTemplates.Common;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Composite.AspNet.Razor;

namespace Composite.Plugins.PageTemplates.Razor
{
    [ConfigurationElementType(typeof(RazorPageTemplateProviderData))]
    internal class RazorPageTemplateProvider : IPageTemplateProvider, ISharedCodePageTemplateProvider
    {
        private static readonly string LayoutFileMask = "*.cshtml";
        private static readonly string LogTitle = typeof (RazorPageTemplateProvider).Name;
        internal static readonly string TempFilePrefix = "_temp_";

        private static readonly FileRelatedDataCache<CachedTemplateInformation> _templateCache =
            new FileRelatedDataCache<CachedTemplateInformation>("Templates", "razorTemplate",
                                                                CachedTemplateInformation.SerializeToFile,
                                                                CachedTemplateInformation.DeserializeFromFile); 

        private readonly string _providerName;  
        private readonly string _templatesDirectory; 
        private readonly string _templatesDirectoryVirtualPath;
        
        private readonly object _initializationLock = new object();
        private readonly C1FileSystemWatcher _watcher;

        private volatile State _state;

        private class State
        {
            public List<PageTemplateDescriptor> Templates;
            public List<SharedFile> SharedFiles;
            public Hashtable<Guid, TemplateRenderingInfo> RenderingInfo;
            public Hashtable<Guid, Exception> LoadingExceptions;
        }

        public string AddNewTemplateLabel
        {
            get; private set;
        }

        public Type AddNewTemplateWorkflow
        {
            get; private set;
        }

        public RazorPageTemplateProvider(string providerName, string templatesDirectoryVirtualPath, string addNewTemplateLabel, Type addNewTemplateWorkflow)
        {
            _providerName = providerName;
            _templatesDirectoryVirtualPath = templatesDirectoryVirtualPath;
            _templatesDirectory = PathUtil.Resolve(templatesDirectoryVirtualPath);

            AddNewTemplateLabel = addNewTemplateLabel;
            AddNewTemplateWorkflow = addNewTemplateWorkflow;


            string folderToWatch = _templatesDirectory;

            try
            {
                if (ReparsePointUtils.DirectoryIsReparsePoint(folderToWatch))
                {
                    folderToWatch = ReparsePointUtils.GetDirectoryReparsePointTarget(folderToWatch);
                }

                _watcher = new C1FileSystemWatcher(folderToWatch, LayoutFileMask)
                {
                    IncludeSubdirectories = true
                };

                _watcher.Created += Watcher_OnChanged;
                _watcher.Deleted += Watcher_OnChanged;
                _watcher.Changed += Watcher_OnChanged;
                _watcher.Renamed += Watcher_OnChanged;

                _watcher.EnableRaisingEvents = true;
            }
            catch (Exception ex)
            {
                Log.LogWarning(LogTitle, "Failed to create a file system watcher for directory '{0}'. Provider: {1}", folderToWatch, providerName);
                Log.LogWarning(LogTitle, ex);
            }
        }

        public IPageRenderer BuildPageRenderer(Guid templateId)
        {
            var state = GetInitializedState();

            return new RazorPageRenderer(state.RenderingInfo, state.LoadingExceptions);
        }

        public IEnumerable<PageTemplateDescriptor> GetPageTemplates()
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
                           .Where(f => !f.Name.StartsWith(TempFilePrefix, StringComparison.Ordinal));


            var templates = new List<PageTemplateDescriptor>();
            var templateRenderingData = new Hashtable<Guid, TemplateRenderingInfo>();
            var loadingExceptions = new Hashtable<Guid, Exception>();
            var sharedFiles = new List<SharedFile>();

            // Loading and compiling layout controls
            foreach (var fileInfo in files)
            {
                string filePath = fileInfo.FullName;
                string virtualPath = ConvertToVirtualPath(filePath);

                CachedTemplateInformation cachedTemplateInformation;

                if (_templateCache.Get(virtualPath, filePath, out cachedTemplateInformation))
                {
                    if (cachedTemplateInformation == null)
                    {
                        sharedFiles.Add(new SharedRazorFile(virtualPath));
                        continue;
                    }

                    Guid templateId = cachedTemplateInformation.TemplateId;

                    templates.Add(new LazyInitializedRazorPageTemplateDescriptor(
                        virtualPath,
                        templateId,
                        cachedTemplateInformation.Title,
                        this));

                    Verify.That(!templateRenderingData.ContainsKey(templateId), "Multiple master page templates defined with the same ID '{0}'", templateId);

                    templateRenderingData.Add(templateId, new LazyInitializedTemplateRenderingInfo(virtualPath, this));
                    continue;
                }

                WebPageBase webPage;
                PageTemplateDescriptor parsedTemplate;
                IDictionary<string, PropertyInfo> placeholderProperties;
                Exception loadingException;

                if (!LoadRazorTemplate(virtualPath, out webPage, out parsedTemplate, out placeholderProperties, out loadingException))
                {
                    var brokenTemplate = GetIncorrectlyLoadedPageTemplate(virtualPath, loadingException);

                    loadingExceptions.Add(brokenTemplate.Id, brokenTemplate.LoadingException);
                    templates.Add(brokenTemplate);
                    continue;
                }

                if (!(webPage is RazorPageTemplate))
                {
                    sharedFiles.Add(new SharedRazorFile(virtualPath));

                    if (!HostingEnvironment.ApplicationHost.ShutdownInitiated())
                    {
                        _templateCache.Add(virtualPath, filePath, null);
                    }
                    continue;
                }

                templates.Add(parsedTemplate);

                templateRenderingData.Add(parsedTemplate.Id, new TemplateRenderingInfo(virtualPath, placeholderProperties));

                _templateCache.Add(virtualPath, filePath, new CachedTemplateInformation(parsedTemplate));
            }

            return new State
                       {
                           Templates = templates,
                           RenderingInfo = templateRenderingData,
                           SharedFiles = sharedFiles,
                           LoadingExceptions = loadingExceptions
                       };
        }

        internal bool LoadRazorTemplate(
            string virtualPath, 
            out WebPageBase webPage, 
            out PageTemplateDescriptor parsedTemplate,
            out IDictionary<string, PropertyInfo> placeholderProperties,
            out Exception loadingException)
        {
            try
            {
                webPage = WebPageBase.CreateInstanceFromVirtualPath(virtualPath);
            }
            catch(Exception ex)
            {
                Log.LogError(LogTitle, "Failed to compile razor file '{0}'", virtualPath);
                Log.LogError(LogTitle, ex);

                loadingException = ex is TargetInvocationException ? ex.InnerException : ex;
                    
                webPage = null;
                parsedTemplate = null;
                placeholderProperties = null;
                return false;
            }

            if (!(webPage is RazorPageTemplate))
            {
                parsedTemplate = null;
                placeholderProperties = null;
                loadingException = null;
                return true;
            }

            RazorPageTemplate razorPageTemplate = webPage as RazorPageTemplate;
            razorPageTemplate.Configure();
            
            try
            {
                ParseTemplate(virtualPath, razorPageTemplate, out parsedTemplate, out placeholderProperties);
            }
            catch (Exception ex)
            {
                Log.LogError(LogTitle, "Failed to load razor page template '{0}'", virtualPath);
                Log.LogError(LogTitle, ex);

                loadingException = ex;
                parsedTemplate = null;
                placeholderProperties = null;
                return false;
            }
            finally
            {
                razorPageTemplate.Dispose();
            }

            loadingException = null;
            return true;
        }

        private PageTemplateDescriptor GetIncorrectlyLoadedPageTemplate(string virtualPath, Exception loadingException)
        {
            Guid templateId;

            string idTokenBegin = "TemplateId = new Guid(\"";
            string idTokenEnd = "\");";

            if (!TemplateParsingHelper.TryExtractTemplateIdFromCSharpCode(PathUtil.Resolve(virtualPath), out templateId, idTokenBegin, idTokenEnd))
            {
                templateId = GetMD5Hash(virtualPath.ToLowerInvariant());
            }

            return new RazorPageTemplateDescriptor(virtualPath)
            {
                Id = templateId,
                Title = Path.GetFileName(virtualPath),
                LoadingException = loadingException
            };
        }

        private static Guid GetMD5Hash(string text)
        {
            using (MD5 md5 = MD5.Create())
            {
                byte[] hash = md5.ComputeHash(Encoding.Unicode.GetBytes(text));
                return new Guid(hash);
            }
        }

        public string ConvertToVirtualPath(string filePath)
        {
            return UrlUtils.Combine(_templatesDirectoryVirtualPath, filePath.Substring(_templatesDirectory.Length).Replace('\\', '/'));
        }

        private void ParseTemplate(string virtualPath,
                                   AspNet.Razor.RazorPageTemplate webPage, 
                                   out PageTemplateDescriptor templateDescriptor, 
                                   out IDictionary<string, PropertyInfo> placeholderProperties)
        {
            Func<PageTemplateDescriptor> constructor = () => new RazorPageTemplateDescriptor(virtualPath);

            templateDescriptor = TemplateDefinitionHelper.BuildPageTemplateDescriptor(webPage, constructor, out placeholderProperties);
        }


        private void Watcher_OnChanged(object sender, FileSystemEventArgs e)
        {
            // Ignoring system and temporary files
            if (e.Name.StartsWith(TempFilePrefix))
            {
                return;
            }

            PageTemplateProviderRegistry.FlushTemplates();
            PageTemplatePreview.ClearCache();
        }


        public IEnumerable<ElementAction> GetRootActions()
        {
            return new ElementAction[0];
        }

        public IEnumerable<SharedFile> GetSharedFiles()
        {
            var state = GetInitializedState();

            return state.SharedFiles;
        }

        public string TemplateDirectoryPath
        {
            get { return _templatesDirectory; }
        }

        public void FlushTemplates()
        {
            lock(_initializationLock)
            {
                _state = null;
            }
        }
    }
}
