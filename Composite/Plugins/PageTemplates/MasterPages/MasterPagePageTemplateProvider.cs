using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Web.Hosting;
using System.Web.UI;
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

namespace Composite.Plugins.PageTemplates.MasterPages
{
    [ConfigurationElementType(typeof(MasterPagePageTemplateProviderData))]
    internal class MasterPagePageTemplateProvider : IPageTemplateProvider, ISharedCodePageTemplateProvider
    {
        private static readonly string LogTitle = typeof (MasterPagePageTemplateProvider).FullName;

        private static readonly FileRelatedDataCache<CachedTemplateInformation> _templateCache =
            new FileRelatedDataCache<CachedTemplateInformation>("Templates", "masterPage",
                                                                CachedTemplateInformation.SerializeToFile,
                                                                CachedTemplateInformation.DeserializeFromFile); 

        internal static readonly string TempFilePrefix = "_temp_";
        private static readonly string MasterPageFileMask = "*.master";
        private static readonly string FileWatcherMask = "*.master*";
        private static readonly string FileWatcher_Regex = @"\.cs|\.master";

        private readonly string _providerName;
        private readonly string _templatesDirectoryVirtualPath;
        private readonly string _templatesDirectory;

        private volatile State _state;

        private readonly object _initializationLock = new object();
        private readonly C1FileSystemWatcher _watcher;

        public string AddNewTemplateLabel
        {
            get; private set;
        }

        public Type AddNewTemplateWorkflow
        {
            get; private set;
        }

        public MasterPagePageTemplateProvider(string name, string templatesDirectoryVirtualPath, string addNewTemplateLabel, Type addNewTemplateWorkflow)
        {
            _providerName = name;
            _templatesDirectoryVirtualPath = templatesDirectoryVirtualPath;
            _templatesDirectory = PathUtil.Resolve(_templatesDirectoryVirtualPath);

            AddNewTemplateLabel = addNewTemplateLabel;
            AddNewTemplateWorkflow = addNewTemplateWorkflow;

            Verify.That(C1Directory.Exists(_templatesDirectory), "Folder '{0}' does not exist", _templatesDirectory);

            string folderToWatch = _templatesDirectory;

            try
            {
                if (ReparsePointUtils.DirectoryIsReparsePoint(folderToWatch))
                {
                    folderToWatch = ReparsePointUtils.GetDirectoryReparsePointTarget(folderToWatch);
                }

                _watcher = new C1FileSystemWatcher(folderToWatch, FileWatcherMask)
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
                Log.LogWarning(LogTitle, "Failed to create a file system watcher for directory '{0}'. Provider: {1}", folderToWatch, name);
                Log.LogWarning(LogTitle, ex);
            }
        }

        public IEnumerable<PageTemplateDescriptor> GetPageTemplates()
        {
            return GetInitializedState().Templates;
        }

        public IPageRenderer BuildPageRenderer(Guid templateId)
        {
            var state = GetInitializedState();

            return new MasterPagePageRenderer(state.RenderingInfo, state.LoadingExceptions);
        }

        public IEnumerable<ElementAction> GetRootActions()
        {
            return new ElementAction[0];
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
                           .Where(f => !f.Name.StartsWith(TempFilePrefix, StringComparison.Ordinal));


            var templates = new List<PageTemplateDescriptor>();
            var templateRenderingData = new Hashtable<Guid, MasterPageRenderingInfo>();
            var loadingExceptions = new Hashtable<Guid, Exception>();
            var sharedSourceFiles = new List<SharedFile>();

            // Loading and compiling layout controls
            foreach (var fileInfo in files)
            {
                string filePath = fileInfo.FullName;
                string virtualPath = ConvertToVirtualPath(filePath);
                string codeBehindFilePath = GetCodebehindFilePath(filePath);

                string[] cacheRelatedFiles = { filePath, codeBehindFilePath };

                CachedTemplateInformation cachedTemplateInformation;

                if (_templateCache.Get(virtualPath, cacheRelatedFiles, out cachedTemplateInformation))
                {
                    if (cachedTemplateInformation == null)
                    {
                        sharedSourceFiles.Add(new SharedMasterPage(virtualPath));
                        continue;
                    }

                    Guid templateId = cachedTemplateInformation.TemplateId;

                    templates.Add(new LazyInitializedMasterPagePageTemplateDescriptor(
                        filePath, 
                        codeBehindFilePath, 
                        templateId,
                        cachedTemplateInformation.Title,
                        this));

                    Verify.That(!templateRenderingData.ContainsKey(templateId), "Multiple master page templates defined with the same ID '{0}'", templateId);
                
                    templateRenderingData.Add(templateId, new LazyInitializedMasterPageRenderingInfo(filePath, virtualPath, this));
                    continue;
                }
                
                MasterPage masterPage;
                MasterPagePageTemplateDescriptor parsedPageTemplateDescriptor;
                MasterPageRenderingInfo renderingInfo;
                Exception loadingException;

                if (!LoadMasterPage(filePath, out masterPage, out parsedPageTemplateDescriptor, out renderingInfo, out loadingException))
                {
                    var brokenTemplate = GetIncorrectlyLoadedPageTemplate(filePath, loadingException);

                    loadingExceptions.Add(brokenTemplate.Id, brokenTemplate.LoadingException);
                    templates.Add(brokenTemplate);
                    continue;
                }

                if (masterPage == null)
                {
                    continue;
                }

                if (!(masterPage is MasterPagePageTemplate))
                {
                    sharedSourceFiles.Add(new SharedMasterPage(virtualPath));

                    if (!HostingEnvironment.ApplicationHost.ShutdownInitiated())
                    {
                        _templateCache.Add(virtualPath, cacheRelatedFiles, null);
                    }
                    
                    continue;
                }

                templates.Add(parsedPageTemplateDescriptor);

                Verify.That(!templateRenderingData.ContainsKey(parsedPageTemplateDescriptor.Id), 
                    "Multiple master page templates defined with the same ID '{0}'", parsedPageTemplateDescriptor.Id);
                
                templateRenderingData.Add(parsedPageTemplateDescriptor.Id, renderingInfo);


                _templateCache.Add(virtualPath, cacheRelatedFiles, new CachedTemplateInformation(parsedPageTemplateDescriptor));
            }

            return new State {
                Templates = templates,
                RenderingInfo = templateRenderingData,
                LoadingExceptions = loadingExceptions,
                SharedSourceFiles = sharedSourceFiles
            };
        }

        /// <summary>
        /// Compiles masters page and builds a <see cref="PageTemplateDescriptor" />.
        /// Returns <value>True</value> if there's no compilation errors
        /// </summary>
        /// <param name="filePath">The file path.</param>
        /// <param name="masterPage">The master page.</param>
        /// <param name="pageTemplateDescriptor">The page template descriptor.</param>
        /// <param name="renderingInfo">The rendering info.</param>
        /// <param name="loadingException">The loading exception.</param>
        /// <returns></returns>
        internal bool LoadMasterPage(
            string filePath,
            out MasterPage masterPage,
            out MasterPagePageTemplateDescriptor pageTemplateDescriptor,
            out MasterPageRenderingInfo renderingInfo,
            out Exception loadingException)
        {
            string virtualPath = ConvertToVirtualPath(filePath);

            try
            {
                masterPage = CompilationHelper.CompileMasterPage(virtualPath);
            }
            catch (Exception ex)
            {
                Log.LogError(LogTitle, "Failed to compile master page file '{0}'", virtualPath);
                Log.LogError(LogTitle, ex);

                loadingException = ex is TargetInvocationException ? ex.InnerException : ex;
                masterPage = null;
                pageTemplateDescriptor = null;
                renderingInfo = null;
                return false;
            }

            if (!(masterPage is MasterPagePageTemplate))
            {
                pageTemplateDescriptor = null;
                renderingInfo = null;
                loadingException = null;
                return true;
            }

            try
            {
                ParseTemplate(virtualPath,
                                filePath,
                                masterPage as MasterPagePageTemplate,
                                out pageTemplateDescriptor,
                                out renderingInfo);
            }
            catch (Exception ex)
            {
                Log.LogError(LogTitle, "Failed to load master page template file '{0}'", virtualPath);
                Log.LogError(LogTitle, ex);

                loadingException = ex;
                pageTemplateDescriptor = null;
                renderingInfo = null;
                return false;
            }

            loadingException = null;
            return true;
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
            string codeBehindFile = GetCodebehindFilePath(filePath);
            
            Guid templateId;
            
            string idTokenBegin = "Guid TemplateId { get { return new Guid(\"";
            string idTokenEnd = "\"); } }";

            if(!TemplateParsingHelper.TryExtractTemplateIdFromCSharpCode(codeBehindFile, out templateId, idTokenBegin, idTokenEnd))
            {
                templateId = GetMD5Hash(filePath.ToLowerInvariant());
            }
            
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

        internal static void ParseTemplate(string virtualPath, 
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
            if (e.Name.StartsWith(TempFilePrefix)
                || !Regex.IsMatch(e.Name, FileWatcher_Regex, RegexOptions.IgnoreCase))
            {
                return;
            }

            PageTemplateProviderRegistry.FlushTemplates();
            PageTemplatePreview.ClearCache();
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
            public Hashtable<Guid, Exception> LoadingExceptions;
            public List<SharedFile> SharedSourceFiles;   
        }
    }
}
