using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.UI;
using Composite.C1Console.Elements;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Foundation;
using Composite.Core.WebClient;
using Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.PageTemplates.MasterPages
{
    [ConfigurationElementType(typeof(MasterPagePageTemplateProviderData))]
    internal class MasterPagePageTemplateProvider : IPageTemplateProvider, ISharedCodePageTemplateProvider
    {
        private static readonly string LogTitle = typeof (MasterPagePageTemplateProvider).FullName;

        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        private static readonly string MasterPageFileMask = "*.master";
        private static readonly string FileWatcherMask = "*.master*";
        private static readonly string FileWatcher_Regex = @"\.cs|\.master";

        private readonly string _providerName;
        private readonly string _templatesDirectoryVirtualPath;
        private readonly string _templatesDirectory;

        private volatile State _state;

        private readonly object _initializationLock = new object();
        private readonly C1FileSystemWatcher _watcher;
        private DateTime _lastUpdateTime;

        public MasterPagePageTemplateProvider(string name, string templatesDirectoryVirtualPath)
        {
            _providerName = name;
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

        public IEnumerable<PageTemplateDescriptor> GetPageTemplates()
        {
            return GetInitializedState().Templates;
        }

        public IPageRenderer BuildPageRenderer(Guid templateId)
        {
            var state = GetInitializedState();

            return new MasterPagePageRenderer(state.RenderingInfo);
        }

        public IEnumerable<ElementAction> GetRootActions()
        {
            Type type = WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.AddNewMasterPagePageTemplateWorkflow");

            return new[] { new ElementAction(new ActionHandle(new WorkflowActionToken(type, new[] { PermissionType.Add })))
            {
                VisualData = new ActionVisualizedData
                          {
                              Label = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "MasterPagePageTemplateProvider.AddTemplate"),
                              ToolTip = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "MasterPagePageTemplateProvider.AddTemplateToolTip"),
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

            return state.SharedSourceFiles;
        }

        private State GetInitializedState()
        {
            var state = _state;
            if(state != null)
            {
                return state;
            }

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
                           .GetFiles(MasterPageFileMask, SearchOption.AllDirectories)
                           .Where(f => !f.Name.StartsWith("_", StringComparison.Ordinal));


            var templates = new List<PageTemplateDescriptor>();
            var templateRenderingData = new Hashtable<Guid, MasterPageRenderingInfo>();
            var sharedSourceFiles = new List<SharedFile>();

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

                    Exception compilationException = ex is TargetInvocationException ? ex.InnerException : ex;

                    templates.Add(GetIncorrectlyLoadedPageTemplate(fileInfo.FullName, compilationException));
                    continue;
                }

                if (masterPage == null)
                {
                    continue;
                } 
                if (!(masterPage is MasterPagePageTemplate))
                {
                    sharedSourceFiles.Add(new SharedMasterPage(ConvertToVirtualPath(fileInfo.FullName)));
                    continue;
                }

                MasterPagePageTemplateDescriptor parsedPageTemplateDescriptor;
                MasterPageRenderingInfo renderingInfo;

                try
                {
                    ParseTemplate(virtualPath, 
                                  fileInfo.FullName, 
                                  masterPage as MasterPagePageTemplate, 
                                  out parsedPageTemplateDescriptor, 
                                  out renderingInfo);
                }
                catch(Exception ex)
                {
                    Log.LogError(LogTitle, "Failed to load master page template file '{0}'", virtualPath);
                    Log.LogError(LogTitle, ex);

                    templates.Add(GetIncorrectlyLoadedPageTemplate(fileInfo.FullName, ex));

                    continue;
                }

                templates.Add(parsedPageTemplateDescriptor);

                if (templateRenderingData.ContainsKey(parsedPageTemplateDescriptor.Id))
                {
                    throw new InvalidOperationException("Multiple master page templates defined with the same ID '{0}'".FormatWith(parsedPageTemplateDescriptor.Id));
                }
                templateRenderingData.Add(parsedPageTemplateDescriptor.Id, renderingInfo);
            }

            return new State {
                Templates = templates,
                RenderingInfo = templateRenderingData,
                SharedSourceFiles = sharedSourceFiles
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


        private PageTemplateDescriptor GetIncorrectlyLoadedPageTemplate(string filePath, Exception loadingException)
        {
            Guid templateId = GetMD5Hash(filePath.ToLowerInvariant());
            string codeBehindFile = GetCodebehindFilePath(filePath);

            return new MasterPagePageTemplateDescriptor(filePath, codeBehindFile)
                {
                    Id = templateId,
                    Title = Path.GetFileName(filePath),
                    LoadingException = loadingException
                };
        }


        internal static string GetCodebehindFilePath(string masterFilePath)
        {
            string csFile = masterFilePath + ".cs";
            return C1File.Exists(csFile) ? csFile : null;
        }

        private void ParseTemplate(string virtualPath, 
                                           string filePath, 
                                           MasterPagePageTemplate masterPage,
                                           out MasterPagePageTemplateDescriptor pageTemplateDescriptor,
                                           out MasterPageRenderingInfo renderingInfo)
        {
            string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(filePath);

            string csFile = GetCodebehindFilePath(filePath);

            IDictionary<string, PropertyInfo> placeholderProperties;
            Func<MasterPagePageTemplateDescriptor> constructor = () => new MasterPagePageTemplateDescriptor(filePath, csFile);

            pageTemplateDescriptor = TemplateDefinitionHelper.BuildPageTemplateDescriptor(masterPage, constructor, out placeholderProperties);

            if (pageTemplateDescriptor.Title == null)
            {
                pageTemplateDescriptor.Title = fileNameWithoutExtension;
            }

            renderingInfo = new MasterPageRenderingInfo(virtualPath, placeholderProperties);
        }

        public string ConvertToVirtualPath(string filePath)
        {
            return UrlUtils.Combine(_templatesDirectoryVirtualPath, filePath.Substring(_templatesDirectory.Length).Replace('\\', '/'));
        }

        private void Watcher_OnChanged(object sender, FileSystemEventArgs e)
        {
            // Ignoring changes to files, not related to master pages, and temporary files
            if (e.Name.StartsWith("_")
                || !Regex.IsMatch(e.Name, FileWatcher_Regex, RegexOptions.IgnoreCase))
            {
                return;
            }

            PageTemplateProviderRegistry.FlushTemplates();
        }

        public void FlushTemplates()
        {
            _state = null;
        }

        public string TemplateDirectoryPath
        {
            get { return _templatesDirectory; }
        }


        /// <summary>
        /// Immutable state - loaded page templates
        /// </summary>
        private class State
        {
            public List<PageTemplateDescriptor> Templates;
            public Hashtable<Guid, MasterPageRenderingInfo> RenderingInfo;
            public List<SharedFile> SharedSourceFiles;   
        }
    }
}
