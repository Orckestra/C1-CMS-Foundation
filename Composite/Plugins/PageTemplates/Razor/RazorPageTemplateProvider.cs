using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Web.WebPages;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Foundation;
using Composite.Core.WebClient;
using Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.PageTemplates.Razor
{
    [ConfigurationElementType(typeof(RazorPageTemplateProviderData))]
    internal class RazorPageTemplateProvider : IPageTemplateProvider
    {
        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        private static readonly string LayoutFileMask = "*.cshtml";
        private static readonly string LogTitle = typeof (RazorPageTemplateProvider).Name;

        private readonly string _providerName;
        private readonly string _templateDirectory;
        private readonly string _templatesDirectoryVirtualPath;
        
        private readonly object _initializationLock = new object();
        private readonly C1FileSystemWatcher _watcher;
        private DateTime _lastUpdateTime;

        private volatile State _state;

        private class State
        {
            public List<PageTemplateDescriptor> Templates;
            public List<SharedFile> SharedFiles;
            public Hashtable<Guid, TemplateRenderingInfo> RenderingInfo;
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

        public IPageRenderer BuildPageRenderer()
        {
            var state = GetInitializedState();

            return new RazorPageRenderer(state.RenderingInfo);
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

                    templates.Add(GetIncorrectlyLoadedPageTemplate(virtualPath, compilationException));
                    continue;
                }

                if(webPage == null || !(webPage is AspNet.Razor.RazorPageTemplate))
                {
                    sharedFiles.Add(new SharedRazorFile(virtualPath));
                    // Add shared code file here
                    continue;
                }
                
                PageTemplateDescriptor parsedTemplate;
                IDictionary<string, PropertyInfo> placeholderProperties;

                try
                {
                    ParseTemplate(virtualPath, fileInfo.FullName, webPage as AspNet.Razor.RazorPageTemplate, out parsedTemplate, out placeholderProperties);
                }
                catch(Exception ex)
                {
                    Log.LogError(LogTitle, "Failed to load razor page template '{0}'", virtualPath);
                    Log.LogError(LogTitle, ex);

                    templates.Add(GetIncorrectlyLoadedPageTemplate(virtualPath, ex));
                    continue;
                }
                

                templates.Add(parsedTemplate);

                templateRenderingData.Add(parsedTemplate.Id, new TemplateRenderingInfo(virtualPath, placeholderProperties));
            }

            return new State
                       {
                           Templates = templates,
                           RenderingInfo = templateRenderingData,
                           SharedFiles = sharedFiles
                       };
        }

        private PageTemplateDescriptor GetIncorrectlyLoadedPageTemplate(string virtualPath, Exception loadingException)
        {
            Guid templateId = GetMD5Hash(virtualPath.ToLowerInvariant());

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
            templateDescriptor = new RazorPageTemplateDescriptor(virtualPath);

            TemplateDefinitionHelper.ExtractPageTemplateInfo(webPage, templateDescriptor, out placeholderProperties);
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
            Type type = WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.AddNewRazorPageTemplateWorkflow");

            return new[] { new ElementAction(new ActionHandle(new WorkflowActionToken(type, new[] { PermissionType.Add })))
            {
                VisualData = new ActionVisualizedData
                          {
                              Label = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "RazorPageTemplateProvider.AddTemplate"),
                              ToolTip = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "RazorPageTemplateProvider.AddTemplateToolTip"),
                              Icon = PageTemplateElementProvider.AddTemplate,
                              Disabled = false,
                              ActionLocation = new ActionLocation
                              {
                                  ActionType = ActionType.Add,
                                  IsInFolder = false,
                                  IsInToolbar = true,
                                  ActionGroup = PrimaryActionGroup
                              }
                          }
            }};
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
