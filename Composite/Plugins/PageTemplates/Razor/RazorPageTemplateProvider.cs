using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Web.WebPages;
using Composite.C1Console.Elements;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Foundation;
using Composite.Core.WebClient;
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

        private readonly string _providerName;
        private readonly string _templateDirectory;
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


        public RazorPageTemplateProvider(string providerName, string templatesDirectoryVirtualPath)
        {
            _providerName = providerName;
            _templatesDirectoryVirtualPath = templatesDirectoryVirtualPath;
            _templateDirectory = PathUtil.Resolve(templatesDirectoryVirtualPath);

            _watcher = new C1FileSystemWatcher(_templateDirectory, LayoutFileMask)
            {
                IncludeSubdirectories = true
            };

            _watcher.Created += Watcher_OnChanged;
            _watcher.Deleted += Watcher_OnChanged;
            _watcher.Changed += Watcher_OnChanged;
            _watcher.Renamed += Watcher_OnChanged;

            _watcher.EnableRaisingEvents = true;
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
            var files = new C1DirectoryInfo(_templateDirectory)
                           .GetFiles(LayoutFileMask, SearchOption.AllDirectories)
                           .Where(f => !f.Name.StartsWith("_", StringComparison.Ordinal));


            var templates = new List<PageTemplateDescriptor>();
            var templateRenderingData = new Hashtable<Guid, TemplateRenderingInfo>();
            var loadingExceptions = new Hashtable<Guid, Exception>();
            var sharedFiles = new List<SharedFile>();

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
                    Log.LogError(LogTitle, "Failed to compile razor file '{0}'", virtualPath);
                    Log.LogError(LogTitle, ex);

                    Exception compilationException = ex is TargetInvocationException ? ex.InnerException : ex;
                    var brokenTemplate = GetIncorrectlyLoadedPageTemplate(virtualPath, compilationException);

                    loadingExceptions.Add(brokenTemplate.Id, brokenTemplate.LoadingException);
                    templates.Add(brokenTemplate);
                    continue;
                }

                if (webPage == null || !(webPage is RazorPageTemplate))
                {
                    sharedFiles.Add(new SharedRazorFile(virtualPath));
                    // Add shared code file here
                    continue;
                }

                RazorPageTemplate razorPageTemplate = webPage as RazorPageTemplate;
                razorPageTemplate.Configure();

                PageTemplateDescriptor parsedTemplate;
                IDictionary<string, PropertyInfo> placeholderProperties;

                try
                {
                    ParseTemplate(virtualPath, fileInfo.FullName, razorPageTemplate, out parsedTemplate, out placeholderProperties);
                }
                catch(Exception ex)
                {
                    Log.LogError(LogTitle, "Failed to load razor page template '{0}'", virtualPath);
                    Log.LogError(LogTitle, ex);

                    var brokenTemplate = GetIncorrectlyLoadedPageTemplate(virtualPath, ex);

                    loadingExceptions.Add(brokenTemplate.Id, brokenTemplate.LoadingException);
                    templates.Add(brokenTemplate);
                    continue;
                }
                

                templates.Add(parsedTemplate);

                templateRenderingData.Add(parsedTemplate.Id, new TemplateRenderingInfo(virtualPath, placeholderProperties));
            }

            return new State
                       {
                           Templates = templates,
                           RenderingInfo = templateRenderingData,
                           SharedFiles = sharedFiles,
                           LoadingExceptions = loadingExceptions
                       };
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
            return UrlUtils.Combine(_templatesDirectoryVirtualPath, filePath.Substring(_templateDirectory.Length).Replace('\\', '/'));
        }

        private void ParseTemplate(string virtualPath,
                                   string filePath,
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
            if(e.Name.StartsWith("_"))
            {
                return;
            }

            PageTemplateProviderRegistry.FlushTemplates();
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
            get { return _templateDirectory; }
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
