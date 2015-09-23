using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using Composite.C1Console.Actions;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Core.Routing;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.Foundation.PluginFacades;
using Composite.Data.Types;
using Composite.Data.Types.StoreIdFilter;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider
{
    [ConfigurationElementType(typeof(MediaFileElementProviderData))]
    internal sealed class MediaFileProviderElementProvider : IHooklessElementProvider, IDragAndDropElementProvider, ILabeledPropertiesElementProvider, IAuxiliarySecurityAncestorProvider
    {
        private ElementProviderContext _context;
        private readonly bool _showOnlyImages;
        private string _rootLabel;
        private ResourceHandle FolderIcon { get { return CommonElementIcons.Folder; } }
        private ResourceHandle OpenFolderIcon { get { return CommonElementIcons.FolderOpen; } }
        private ResourceHandle EmptyFolderIcon { get { return CommonElementIcons.FolderOpen; } }
        private static ResourceHandle ReadOnlyFolderOpen { get { return GetIconHandle("media-read-only-folder-open"); } }
        private static ResourceHandle ReadOnlyFolderClosed { get { return GetIconHandle("media-read-only-folder-closed"); } }
        public static ResourceHandle AddMediaFolder { get { return GetIconHandle("media-add-media-folder"); } }
        public static ResourceHandle AddMediaFile { get { return GetIconHandle("media-add-media-file"); } }
        public static ResourceHandle DownloadFile { get { return GetIconHandle("media-download-file"); } } 
        public static ResourceHandle ReplaceMediaFile { get { return GetIconHandle("media-replace-media-file"); } }        
        public static ResourceHandle UploadZipFile { get { return GetIconHandle("media-upload-zip-file"); } }
        public static ResourceHandle EditImageFile { get { return GetIconHandle("media-edit-image-file"); } }
        public static ResourceHandle EditMediaFolder { get { return GetIconHandle("media-edit-media-folder"); } }
        public static ResourceHandle EditMediaFile { get { return GetIconHandle("media-edit-media-file"); } }
        public static ResourceHandle DeleteMediaFolder { get { return GetIconHandle("media-delete-media-folder"); } }
        public static ResourceHandle DeleteMediaFile { get { return GetIconHandle("media-delete-media-file"); } }

        private static readonly ActionGroup PrimaryFolderActionGroup = new ActionGroup("Folder", ActionGroupPriority.PrimaryMedium);
        private static readonly ActionGroup PrimaryFileActionGroup = new ActionGroup("File", ActionGroupPriority.PrimaryMedium);
        private static readonly ActionGroup PrimaryFileToolsActionGroup = new ActionGroup("FileTools", ActionGroupPriority.PrimaryMedium);

        private static readonly Expression IgnoreCaseConstantExpression = Expression.Constant(StringComparison.OrdinalIgnoreCase, typeof(StringComparison));
        private static readonly MethodInfo EndsWithMethodInfo = typeof(string).GetMethod("EndsWith", new[] { typeof(string), typeof(StringComparison) });
        

        public MediaFileProviderElementProvider(MediaFileElementProviderData data)
        {
            _showOnlyImages = data.ShowOnlyImages;
            _rootLabel = data.RootLabel;            

            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DataEntityToken>(this);
        }



        public ElementProviderContext Context
        {
            set { _context = value; }
        }



        public IEnumerable<Element> GetRoots(SearchToken seachToken)
        {
            var mediaStores = DataFacade.GetData<IMediaFileStore>();

            var elements = new List<Element>();
            foreach (IMediaFileStore store in mediaStores)
            {

                var element = new Element(_context.CreateElementHandle(new MediaRootFolderProviderEntityToken(store.Id)))
                {
                    VisualData = new ElementVisualizedData()
                    {
                        Label = store.Title,
                        ToolTip = GetResourceString("MediaFileProviderElementProvider.RootToolTip"),
                        HasChildren = true,
                        Icon = FolderIcon,
                        OpenedIcon = OpenFolderIcon
                    }
                };

                element.PropertyBag.Add("ReadOnly", store.IsReadOnly.ToString());
                element.PropertyBag.Add("ElementId", store.Id + ":/");

                if(!store.IsReadOnly)
                {
                    element.MovabilityInfo.AddDropType(typeof(IMediaFileFolder), store.Id);
                    element.MovabilityInfo.AddDropType(typeof(IMediaFile), store.Id);
                    element.MovabilityInfo.DragType = typeof(IMediaFileStore);

                    element.AddAction(
                       new ElementAction(new ActionHandle(
                           new WorkflowActionToken(
                               WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider.AddNewMediaFolderWorkflow"),
                               new PermissionType[] { PermissionType.Add }
                            )))
                       {
                           VisualData = new ActionVisualizedData
                           {
                               Label = GetResourceString("MediaFileProviderElementProvider.AddMediaFolder"),
                               ToolTip = GetResourceString("MediaFileProviderElementProvider.AddMediaFolderToolTip"),
                               Icon = MediaFileProviderElementProvider.AddMediaFolder,
                               Disabled = false,
                               ActivePositions = ElementActionActivePosition.NavigatorTree | ElementActionActivePosition.SelectorTree,
                               ActionLocation = new ActionLocation
                               {
                                   ActionType = ActionType.Add,
                                   IsInFolder = false,
                                   IsInToolbar = true,
                                   ActionGroup = PrimaryFolderActionGroup
                               }
                           }
                       });

                    element.AddAction(
                     new ElementAction(new ActionHandle(
                         new WorkflowActionToken(
                             WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider.AddNewMediaFileWorkflow"),
                             new PermissionType[] { PermissionType.Add }
                        )))
                     {
                         VisualData = new ActionVisualizedData
                         {
                             Label = GetResourceString("MediaFileProviderElementProvider.AddMediaFile"),
                             ToolTip = GetResourceString("MediaFileProviderElementProvider.AddMediaFileToolTip"),
                             Icon = MediaFileProviderElementProvider.AddMediaFile,
                             Disabled = false,
                             ActivePositions = ElementActionActivePosition.NavigatorTree | ElementActionActivePosition.SelectorTree,
                             ActionLocation = new ActionLocation
                             {
                                 ActionType = ActionType.Add,
                                 IsInFolder = false,
                                 IsInToolbar = true,
                                 ActionGroup = PrimaryFileActionGroup
                             }
                         }
                     });

                    element.AddAction(
                       new ElementAction(new ActionHandle(
                           new WorkflowActionToken(
                               WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider.AddMediaZipFileWorkflow"),
                               new PermissionType[] { PermissionType.Add }
                            ) { DoIgnoreEntityTokenLocking = true }))
                       {
                           VisualData = new ActionVisualizedData
                           {
                               Label = GetResourceString("MediaFileProviderElementProvider.UploadZipFile"),
                               ToolTip = GetResourceString("MediaFileProviderElementProvider.UploadZipFileToolTip"),
                               Icon = MediaFileProviderElementProvider.UploadZipFile,
                               Disabled = false,
                               ActionLocation = new ActionLocation
                               {
                                   ActionType = ActionType.Add,
                                   IsInFolder = false,
                                   IsInToolbar = true,
                                   ActionGroup = PrimaryFileActionGroup
                               }
                           }
                       });
                }

                elements.Add(element);
            }
            return elements;
        }



        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken searchToken)
        {
            if (entityToken is MediaRootFolderProviderEntityToken)
            {
                return GetChildrenOnPath("/", entityToken.Id, searchToken);
            }
            
            var dataEntityToken = (DataEntityToken)entityToken;
            Verify.IsNotNull(dataEntityToken, "Unexpected entity token type '{0}'", entityToken.GetType());

            if (dataEntityToken.InterfaceType == typeof (IMediaFile))
            {
                return null;
            }


            if (dataEntityToken.InterfaceType == typeof (IMediaFileFolder))
            {
                object data = dataEntityToken.Data;
                if (data == null)
                {
                    return Enumerable.Empty<Element>();
                }

                var folder = (IMediaFileFolder)data;
                return GetChildrenOnPath(folder.Path, folder.StoreId, searchToken);
            }

            throw new InvalidOperationException("Unexpected data entity token's interface type '{0}'".FormatWith(dataEntityToken.InterfaceType));
        }



        public IEnumerable<LabeledProperty> GetLabeledProperties(EntityToken entityToken)
        {
            if (!(entityToken is DataEntityToken))
            {
                throw new ArgumentException(string.Format("Got '{0}' expected '{1}'", typeof (EntityToken), typeof (DataEntityToken)));
            }
            
            var token = (DataEntityToken) entityToken;

            if (token.Data is IMediaFileFolder)
            {
                return GetFolderProperties((IMediaFileFolder) token.Data);
            }
            
            if (token.Data is IMediaFile)
            {
                return GetFileProperties((IMediaFile) token.Data);
            }
                
            throw new ArgumentException(string.Format("Unexpected type of data '{0}' in token", token.Data.GetType()));
        }


        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            var result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                var dataEntityToken = entityToken as DataEntityToken;

                Type type = dataEntityToken.InterfaceType;
                if (type != typeof(IMediaFile) && type != typeof(IMediaFileFolder)) continue;

                string storeId = null;

                IMediaFile mediaFile = dataEntityToken.Data as IMediaFile;
                if (mediaFile != null)
                {
                    if (mediaFile.FolderPath != "/") continue;

                    storeId = mediaFile.StoreId;
                }

                IMediaFileFolder mediaFileFolder = dataEntityToken.Data as IMediaFileFolder;
                if (mediaFileFolder != null)
                {
                    if (mediaFileFolder.Path.IsDirectChildOf("/", '/') == false) continue;

                    storeId = mediaFileFolder.StoreId;
                }

                var newEntityToken = new MediaRootFolderProviderEntityToken(storeId);

                result.Add(entityToken, new EntityToken[] { newEntityToken });
            }

            return result;
        }



        private IEnumerable<LabeledProperty> GetFileProperties(IMediaFile file)
        {
            var propertyList = new LabeledPropertyList
            {
                {"StoreId", "Store ID", file.StoreId},
                {"FolderPath", "Folder path", file.FolderPath},
                {"FileName", "File name", file.FileName},
                {"Title", "Description", file.Title},
                {"Description", "Description", file.Description},
                {"IsReadOnly", "Read only", file.IsReadOnly}
            };

            if (file.Length.HasValue) propertyList.Add("Length", "Length (bytes)", file.Length.Value);
            if (file.LastWriteTime.HasValue) propertyList.Add("LastWriteTime", "Last write time", file.LastWriteTime.Value);
            if (file.CreationTime.HasValue) propertyList.Add("CreationTime", "Creation time", file.CreationTime.Value);
            if (file.MimeType.Length > 0) propertyList.Add("MimeType", "MIME type", file.MimeType);
            propertyList.Add("Culture", "Culture", file.Culture);

            if (file.MimeType.StartsWith("image"))
            {
                if (file.MimeType == MimeTypeInfo.Svg)
                {
                    propertyList.Add("ImageFormat", "Image format", "svg");
                }
                else
                {
                    using (Stream fileStream = file.GetReadStream())
                    {
                        var bitmap = new Bitmap(fileStream);
                        propertyList.Add("ImageWidth", "Image width", bitmap.Width);
                        propertyList.Add("ImageHeight", "Image height", bitmap.Height);

                        string formatString = null;
                        if (bitmap.RawFormat.Guid.CompareTo(ImageFormat.Gif.Guid) == 0) formatString = "gif";
                        if (bitmap.RawFormat.Guid.CompareTo(ImageFormat.Jpeg.Guid) == 0) formatString = "jpeg";
                        if (bitmap.RawFormat.Guid.CompareTo(ImageFormat.Png.Guid) == 0) formatString = "png";
                        if (bitmap.RawFormat.Guid.CompareTo(ImageFormat.Tiff.Guid) == 0) formatString = "tiff";
                        if (formatString != null) propertyList.Add("ImageFormat", "Image format", formatString);
                    }
                }
            }

            return propertyList;
        }



        private IEnumerable<LabeledProperty> GetFolderProperties(IMediaFileFolder folder)
        {
            return new LabeledPropertyList
            {
                {"StoreId", "Store ID", folder.StoreId},
                {"Path", "Path", folder.Path},
                {"Title", "Title", folder.Title},
                {"Description", "Description", folder.Description},
                {"IsReadOnly", "Read only", folder.IsReadOnly}
            };
        }


        private static bool DoesFileExist(string path, string name)
        {
            return (from item in DataFacade.GetData<IMediaFile>()
                    where item.FolderPath == path && item.FileName == name
                    select item).Any();
        }


        public bool OnElementDraggedAndDropped(EntityToken draggedEntityToken, EntityToken newParentEntityToken, int dropIndex, DragAndDropType dragAndDropType, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            IData draggedData = ((DataEntityToken)draggedEntityToken).Data;

            string path;
            if ((newParentEntityToken is DataEntityToken))
            {
                path = ((IMediaFileFolder)((DataEntityToken)newParentEntityToken).Data).Path;
            }
            else if ((newParentEntityToken is MediaRootFolderProviderEntityToken))
            {
                path = "/";
            }
            else
            {
                throw new NotImplementedException();
            }


            IMediaFile draggedFile = draggedData as IMediaFile;
            IMediaFileFolder draggedFolder = draggedData as IMediaFileFolder;

            string oldPath = null;
            string storeId = null;

            if (dragAndDropType == DragAndDropType.Move)
            {
                if (draggedFile != null)
                {
                    if (DoesFileExist(path, draggedFile.FileName))
                    {
                        var messageService = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>();
                        messageService.ShowMessage(DialogType.Error, 
                            GetResourceString("MediaFileProviderElementProvider.ErrorMessageTitle"),
                            GetResourceString("MediaFileProviderElementProvider.FileAlreadyExistsMessage").FormatWith(draggedFile.FileName, path));
                        return false;
                    }
                    
                    oldPath = draggedFile.FolderPath;
                    storeId = draggedFile.StoreId;

                    draggedFile.FolderPath = path;
                    DataFacade.Update(draggedFile);
                }
                else if (draggedFolder != null)
                {
                    int index = draggedFolder.Path.LastIndexOf('/');

                    oldPath = draggedFolder.Path.Remove(index);
                    storeId = draggedFolder.StoreId;

                    string draggedFolderName = draggedFolder.Path.Remove(0, index + 1);

                    string newPath = path;
                    if (path.EndsWith("/") == false)
                    {
                        newPath = string.Format("{0}/", path);
                    }

                    string targetPath = string.Format("{0}{1}", newPath, draggedFolderName);

                    using (var scope = Composite.Data.Transactions.TransactionsFacade.CreateNewScope())
                    {
                        draggedFolder.Path = targetPath;
                        DataFacade.Update(draggedFolder);

                        scope.Complete();
                    }
                }
                else
                {
                    Verify.ThrowInvalidOperationException("Unexpected media data type.");
                }
            }
            else if (dragAndDropType == DragAndDropType.Copy)
            {
                if (draggedFile != null)
                {
                    storeId = draggedFile.StoreId;

                    IMediaFileStore store = DataFacade.GetData<IMediaFileStore>(x => x.Id == storeId).First();

                    StoreIdFilterQueryable<IMediaFile> fileQueryable = new StoreIdFilterQueryable<IMediaFile>(DataFacade.GetData<IMediaFile>(), storeId);

                    List<string> fileNames =
                        (from f in fileQueryable
                         where f.StoreId == storeId &&
                               f.FolderPath == path
                         select f.FileName).ToList();

                    var newWorkflowMediaFile = new WorkflowMediaFile(draggedFile)
                    {
                        FolderPath = path
                    };


                    string draggedFilenamePre = draggedFile.FileName;
                    string draggedFilenamePost = "";

                    int index = draggedFile.FileName.LastIndexOf('.');
                    if (index != -1)
                    {
                        draggedFilenamePre = draggedFile.FileName.Remove(index);
                        draggedFilenamePost = draggedFile.FileName.Remove(0, index);
                    }

                    string newFilename = draggedFile.FileName;
                    int counter = 1;
                    while (fileNames.Contains(newFilename))
                    {
                        newFilename = string.Format("{0}({1}){2}", draggedFilenamePre, counter++, draggedFilenamePost);
                    }

                    newWorkflowMediaFile.FileName = newFilename;

                    using (Stream readStream = draggedFile.GetReadStream())
                    {
                        using (Stream writeStream = newWorkflowMediaFile.GetNewWriteStream())
                        {
                            readStream.CopyTo(writeStream);
                        }
                    }

                    DataFacade.AddNew<IMediaFile>(newWorkflowMediaFile, store.DataSourceId.ProviderName);
                }
                else if (draggedFolder != null)
                {
                    return false;
                }
                else
                {
                    Verify.ThrowInvalidOperationException("Unexpected media data type.");
                }
            }
            else
            {
                Verify.ThrowInvalidOperationException("Unexpected copying mode.");
            }


            if (oldPath != null)
            {
                EntityToken entityToken = GetFolderByPath(oldPath, storeId);

                if (entityToken != null)
                {
                    var oldFolderSpecificTreeRefresher = new SpecificTreeRefresher(flowControllerServicesContainer);
                    oldFolderSpecificTreeRefresher.PostRefreshMesseges(entityToken);
                }
            }

            if (path != oldPath)
            {
                EntityToken entityToken = GetFolderByPath(path, storeId);

                if (entityToken != null)
                {
                    var oldFolderSpecificTreeRefresher = new SpecificTreeRefresher(flowControllerServicesContainer);
                    oldFolderSpecificTreeRefresher.PostRefreshMesseges(entityToken);
                }
            }

            return true;
        }

       
        private static StoreIdFilterQueryable<T> GetQuery<T>(string storeId) where T : class, IData
        {
            return new StoreIdFilterQueryable<T>(DataFacade.GetData<T>(), storeId);
        }

        private static EntityToken GetFolderByPath(string path, string storeId)
        {
            Verify.ArgumentNotNull(path, "path");

            if (path == string.Empty || path == "/")
            {
                return new MediaRootFolderProviderEntityToken(storeId);
            }

            var queryable = new StoreIdFilterQueryable<IMediaFileFolder>(DataFacade.GetData<IMediaFileFolder>(), storeId);

            var folder = (from folderInfo in queryable
                          where folderInfo.StoreId == storeId &&
                            folderInfo.Path == path
                          select folderInfo).FirstOrDefault();

            return folder == null ? null : folder.GetDataEntityToken();
            
        }      



        private IEnumerable<Element> GetChildrenOnPath(string parentPath, string storeId, SearchToken searchToken)
        {
            bool showFiles = true;
            bool showFolders = true;
            string folderChainToShow = null;

            if(searchToken is MediaFileSearchToken)
            {
                var mediaSearchToken = searchToken as MediaFileSearchToken;
                string folderPath = mediaSearchToken.Folder;
                if(folderPath != null)
                {
                    bool isUnderTargetFolder = parentPath.Length >= folderPath.Length;
                    showFiles = isUnderTargetFolder;

                    if (!isUnderTargetFolder)
                    {
                        // Filtering folders so we can see only ancestors "chain"
                        folderChainToShow = folderPath + "/";
                    }

                    showFolders = !(mediaSearchToken.HideSubfolders && parentPath == folderPath);
                }
            }

            IEnumerable<Element> result = null;
            if (showFolders)
            {
                var folderQueryable = GetQuery<IMediaFileFolder>(storeId);

                string parentPathPrefix = parentPath + (parentPath.EndsWith("/") ? "" : "/");
                int parentPathPrefixLength = parentPath.Length;

                var childFolders = folderQueryable.Where(item => item.Path.StartsWith(parentPathPrefix)
                                    && item.Path.LastIndexOf('/') <= parentPathPrefixLength).Evaluate();

                result =
                   (from item in childFolders
                    where folderChainToShow == null || folderChainToShow.StartsWith(item.Path + '/')
                    orderby item.Path
                    select CreateFolderElement(item)).ToList();

            }

            if(showFiles)
            {
                Expression<Func<IMediaFile, bool>> predicate = BuildFilePredicate(searchToken);

                var fileQueryable = GetQuery<IMediaFile>(storeId);

                var files = (from item in fileQueryable
                             where item.FolderPath == parentPath
                             orderby item.FileName
                             select item).Where(predicate).Evaluate().Select(CreateFileElement).ToList();

                result = result != null ? result.Concat(files) : files;
            }

            return result != null ? result.Evaluate() : Enumerable.Empty<Element>();
        }


        private Expression<Func<IMediaFile, bool>> BuildFilePredicate(SearchToken searchToken)
        {
            var predicates = new List<Expression<Func<IMediaFile, bool>>>();

            if (_showOnlyImages)
            {
                predicates.Add(x => x.MimeType != null && x.MimeType.StartsWith("image"));
            }

            if (searchToken.IsValidKeyword())
            {
                string keyword = searchToken.Keyword.ToLower();

                predicates.Add(x =>
                    (x.Description != null && x.Description.ToLower().Contains(keyword)) ||
                     (x.FileName != null && x.FileName.ToLower().Contains(keyword)) ||
                     (x.Title != null && x.Title.ToLower().Contains(keyword)));
            }

            var mediaFileSearchToken = searchToken as MediaFileSearchToken;
            if (mediaFileSearchToken != null)
            {
                if (mediaFileSearchToken.MimeTypes != null && mediaFileSearchToken.MimeTypes.Length > 0)
                {
                    var mimeTypes = new List<string>(mediaFileSearchToken.MimeTypes);
                    predicates.Add(x => mimeTypes.Contains(x.MimeType));
                }

                if (mediaFileSearchToken.Extensions != null && mediaFileSearchToken.Extensions.Length > 0)
                {
                    ParameterExpression fileParameter = Expression.Parameter(typeof(IMediaFile), "file");

                    Expression body = null;

                    foreach (string extension in mediaFileSearchToken.Extensions)
                    {
                        string suffix = extension.StartsWith(".") ? extension : "." + extension;

                        // "file.FileName"
                        Expression fileName = Expression.Property(fileParameter, typeof(IFile), "FileName");

                        // Building "file.FileName.EndsWith(suffix, StringComparison.OrdinalIgnoreCase)"
                        MethodCallExpression predicate = Expression.Call(fileName,
                                                                         EndsWithMethodInfo,
                                                                         Expression.Constant(suffix),
                                                                         IgnoreCaseConstantExpression);

                        if (body == null)
                        {
                            // file => file.FileName.EndsWith(extension, StringComparison.OrdinalIgnoreCase);
                            body = predicate;
                        }
                        else
                        {
                            // body = (.....) || file.FileName.EndsWith(extension, StringComparison.OrdinalIgnoreCase;
                            body = Expression.OrElse(body, predicate);
                        }
                    }

                    predicates.Add(Expression.Lambda<Func<IMediaFile, bool>>(body, fileParameter));
                }
            }

            if (predicates.Count == 0)
            {
                return (x => true);
            }
            
            return AndPredicates(predicates);
        }

        private static Expression<Func<T, bool>> AndPredicates<T>(IEnumerable<Expression<Func<T, bool>>> predicates) where T: IData
        {
            var p = Expression.Parameter(typeof(IMediaFile));

            Expression andBody = null;

            foreach (Expression<Func<T, bool>> predicate in predicates)
            {
                var conditionPart = Expression.Invoke(predicate, p);

                andBody = andBody == null
                            ? conditionPart as Expression
                            : Expression.And(andBody, conditionPart);
            }

            return Expression.Lambda<Func<T, bool>>(andBody, p);
        }

       

        private Element CreateFileElement(IMediaFile file)
        {
            var element = new Element(_context.CreateElementHandle(file.GetDataEntityToken()))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = file.FileName,
                    ToolTip = GetResourceString("MediaFileProviderElementProvider.MediaFileItemToolTip"),
                    HasChildren = false,
                    Icon = this.MediaFileIcon(file.MimeType),
                    OpenedIcon = this.MediaFileIcon(file.MimeType)
                }
            };

            if (DataProviderPluginFacade.IsWriteableProvider(file.DataSourceId.ProviderName))
            {
                element.MovabilityInfo.DragType = typeof(IMediaFile);
                element.MovabilityInfo.DragSubType = file.StoreId;
            }
            
            Verify.IsNotNull(file.FileName, "file.FileName is null. Media ID: {0}", file.Id);
            Verify.IsNotNull(file.FolderPath, "file.FolderPath is null. Media ID: {0}", file.Id);

            element.PropertyBag.Add("ElementId", file.StoreId + ":" + file.FolderPath.Combine(file.FileName, '/'));

            element.PropertyBag.Add("Uri", GetMediaUrl(file, true, false));
            element.PropertyBag.Add("ElementType", file.MimeType);

            if (file.MimeType.StartsWith("image/"))
            {
                string previewImageUrl =  UrlUtils.ResolvePublicUrl(MediaUrls.BuildUrl(file, UrlKind.Internal) + "?mw={width}&mh={height}");

                DateTime? modificationTime = file.LastWriteTime ?? file.CreationTime;
                if (modificationTime != null)
                {
                    previewImageUrl += "&timestamp=" + modificationTime.GetHashCode();
                }

                element.PropertyBag.Add("ListViewImage", previewImageUrl);
                element.PropertyBag.Add("DetailViewImage", previewImageUrl);
            }

            GetFileActions(file).ForEach(element.AddAction);

            return element;
        }



        internal static string GetMediaUrl(IMediaFile file, bool isInternal, bool downloadable)
        {
            return MediaUrlHelper.GetUrl(file, isInternal, downloadable);
        }



        private Element CreateFolderElement(IMediaFileFolder folder)
        {
            bool hasFolders = DataFacade.GetData<IMediaFileFolder>().Any(f => f.Path.StartsWith(folder.Path));

            bool hasChildren = hasFolders;

            if(!hasChildren)
            {
                bool hasFiles = DataFacade.GetData<IMediaFile>().Any(file => file.FolderPath == folder.Path);
                hasChildren = hasFiles;
            }

            ResourceHandle icon = this.EmptyFolderIcon;
            ResourceHandle openIcon = this.OpenFolderIcon;
            if (hasChildren)
            {
                icon = this.FolderIcon;
            }
            if (folder.IsReadOnly)
            {
                icon = MediaFileProviderElementProvider.ReadOnlyFolderClosed;
                openIcon = MediaFileProviderElementProvider.ReadOnlyFolderOpen;
            }

            Element element = new Element(_context.CreateElementHandle(folder.GetDataEntityToken()))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = folder.Path.GetFolderName('/'),
                    ToolTip = GetResourceString("MediaFileProviderElementProvider.OrganizedFilesAndFoldersToolTip"),
                    HasChildren = hasChildren,
                    Icon = icon,
                    OpenedIcon = openIcon
                },
            };

            if (DataProviderPluginFacade.IsWriteableProvider(folder.DataSourceId.ProviderName))
            {
                element.MovabilityInfo.AddDropType(typeof(IMediaFileFolder), folder.StoreId);
                element.MovabilityInfo.AddDropType(typeof(IMediaFile), folder.StoreId);
                element.MovabilityInfo.DragType = typeof(IMediaFileFolder);
                element.MovabilityInfo.DragSubType = folder.StoreId;
            }

            element.PropertyBag.Add("ReadOnly", folder.IsReadOnly.ToString());
            element.PropertyBag.Add("ElementId", folder.StoreId + ":" + folder.Path);

            foreach (ElementAction action in GetFolderActions(folder))
            {
                element.AddAction(action);
            }
            return element;
        }

        private IEnumerable<ElementAction> GetFileActions(IMediaFile file)
        {
            IList<ElementAction> fileActions = new List<ElementAction>();
            //if (!file.IsReadOnly)
            //{
            fileActions.Add(
             new ElementAction(new ActionHandle(
                 new WorkflowActionToken(
                     WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider.DeleteMediaFileWorkflow"),
                     new PermissionType[] { PermissionType.Delete }
                )))
             {
                 VisualData = new ActionVisualizedData
                 {
                     Label = GetResourceString("MediaFileProviderElementProvider.DeleteMediaFile"),
                     ToolTip = GetResourceString("MediaFileProviderElementProvider.DeleteMediaFileToolTip"),
                     Icon = DeleteMediaFile,
                     Disabled = file.IsReadOnly,
                     ActivePositions = ElementActionActivePosition.NavigatorTree | ElementActionActivePosition.SelectorTree,
                     ActionLocation = new ActionLocation
                     {
                         ActionType = ActionType.Delete,
                         IsInFolder = false,
                         IsInToolbar = true,
                         ActionGroup = PrimaryFileActionGroup
                     }
                 }
             });

            fileActions.Add(
             new ElementAction(new ActionHandle(
                 new WorkflowActionToken(
                     WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider.EditMediaFileWorkflow"),
                     new PermissionType[] { PermissionType.Edit }
                )))
             {
                 VisualData = new ActionVisualizedData
                 {
                     Label = GetResourceString("MediaFileProviderElementProvider.EditMediaFile"),
                     ToolTip = GetResourceString("MediaFileProviderElementProvider.EditMediaFileToolTip"),
                     Icon = EditMediaFile,
                     Disabled = file.IsReadOnly,
                     ActionLocation = new ActionLocation
                     {
                         ActionType = ActionType.Edit,
                         IsInFolder = false,
                         IsInToolbar = true,
                         ActionGroup = PrimaryFileActionGroup
                     }
                 }
             });

            if (file.MimeType != null && MimeTypeInfo.IsTextFile(file.MimeType))
            {
                fileActions.Add(
                 new ElementAction(new ActionHandle(
                     new WorkflowActionToken(
                         WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider.EditMediaFileTextContentWorkflow"),
                         new PermissionType[] { PermissionType.Edit }
                    )))
                 {
                     VisualData = new ActionVisualizedData
                     {
                         Label = GetResourceString("MediaFileProviderElementProvider.EditMediaFileTextContent"),
                         ToolTip = GetResourceString("MediaFileProviderElementProvider.EditMediaFileTextContentToolTip"),
                         Icon = CommonCommandIcons.Edit,
                         Disabled = file.IsReadOnly,
                         ActionLocation = new ActionLocation
                         {
                             ActionType = ActionType.Edit,
                             IsInFolder = false,
                             IsInToolbar = true,
                             ActionGroup = PrimaryFileToolsActionGroup
                         }
                     }
                 });
            }

            if (file.MimeType != null && file.MimeType.StartsWith("image"))
            {
                fileActions.Add(
                    new ElementAction(new ActionHandle(new EditImageActionToken()))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = GetResourceString("MediaFileProviderElementProvider.EditImage"),
                        ToolTip = GetResourceString("MediaFileProviderElementProvider.EditImageToolTip"),
                        Icon = MediaFileProviderElementProvider.EditImageFile,
                        Disabled = file.IsReadOnly,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Edit,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryFileToolsActionGroup
                        }
                    }
                });
            }

            if (file.MimeType != null)
            {
                fileActions.Add(
                    new ElementAction(new ActionHandle(new DownloadFileActionToken()))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetResourceString("MediaFileProviderElementProvider.Download"),
                            ToolTip = GetResourceString("MediaFileProviderElementProvider.DownloadToolTip"),
                            Icon = DownloadFile,
                            Disabled = file.Length == 0,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Other,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryFileToolsActionGroup
                            }
                        }
                    });
            }

            fileActions.Add(
          new ElementAction(new ActionHandle(
              new WorkflowActionToken(
                  WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider.UploadNewMediaFileWorkflow"),
                  new PermissionType[] { PermissionType.Edit }
                )))
          {
              VisualData = new ActionVisualizedData
              {
                  Label = GetResourceString("MediaFileProviderElementProvider.ChangeMediaFile"),
                  ToolTip = GetResourceString("MediaFileProviderElementProvider.ChangeMediaFileToolTip"),
                  Icon = MediaFileProviderElementProvider.ReplaceMediaFile,
                  Disabled = file.IsReadOnly,
                  ActionLocation = new ActionLocation
                  {
                      ActionType = ActionType.Edit,
                      IsInFolder = false,
                      IsInToolbar = true,
                      ActionGroup = PrimaryFileActionGroup
                  }
              }
          });
            //}

            return fileActions;
        }



        private IEnumerable<ElementAction> GetFolderActions(IMediaFileFolder folder)
        {
            IList<ElementAction> folderActions = new List<ElementAction>();
            if (!folder.IsReadOnly)
            {
                folderActions.Add(
                 new ElementAction(new ActionHandle(
                     new WorkflowActionToken(
                         WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider.AddNewMediaFolderWorkflow"),
                         new PermissionType[] { PermissionType.Add }
                    )))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetResourceString("MediaFileProviderElementProvider.AddMediaFolder"),
                            ToolTip = GetResourceString("MediaFileProviderElementProvider.AddMediaFolderToolTip"),
                            Icon = MediaFileProviderElementProvider.AddMediaFolder,
                            Disabled = false,
                            ActivePositions = ElementActionActivePosition.NavigatorTree | ElementActionActivePosition.SelectorTree,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Add,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryFolderActionGroup
                            }
                        }
                    });

                folderActions.Add(
                     new ElementAction(new ActionHandle(
                         new WorkflowActionToken(
                             WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider.DeleteMediaFolderWorkflow"),
                             new PermissionType[] { PermissionType.Delete }
                        )))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetResourceString("MediaFileProviderElementProvider.DeleteMediaFolder"),
                            ToolTip = GetResourceString("MediaFileProviderElementProvider.DeleteMediaFolderToolTip"),
                            Icon = DeleteMediaFolder,
                            Disabled = false,
                            ActivePositions = ElementActionActivePosition.NavigatorTree | ElementActionActivePosition.SelectorTree,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Delete,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryFolderActionGroup
                            }
                        }
                    });

                folderActions.Add(
                        new ElementAction(new ActionHandle(
                            new WorkflowActionToken(
                                WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider.EditMediaFolderWorkflow"),
                                new PermissionType[] { PermissionType.Edit }
                            )))
                       {
                           VisualData = new ActionVisualizedData
                           {
                               Label = GetResourceString("MediaFileProviderElementProvider.EditMediaFolder"),
                               ToolTip = GetResourceString("MediaFileProviderElementProvider.EditMediaFolderToolTip"),
                               Icon = EditMediaFolder,
                               Disabled = false,
                               ActionLocation = new ActionLocation
                               {
                                   ActionType = ActionType.Edit,
                                   IsInFolder = false,
                                   IsInToolbar = true,
                                   ActionGroup = PrimaryFolderActionGroup
                               }
                           }
                       });

                folderActions.Add(
                    new ElementAction(new ActionHandle(
                        new WorkflowActionToken(
                            WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider.AddNewMediaFileWorkflow"),
                            new PermissionType[] { PermissionType.Add }
                        )))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = GetResourceString("MediaFileProviderElementProvider.AddMediaFile"),
                            ToolTip = GetResourceString("MediaFileProviderElementProvider.AddMediaFileToolTip"),
                            Icon = MediaFileProviderElementProvider.AddMediaFile,
                            Disabled = false,
                            ActivePositions = ElementActionActivePosition.NavigatorTree | ElementActionActivePosition.SelectorTree,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Add,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryFileActionGroup
                            }
                        }
                    });

                folderActions.Add(
                     new ElementAction(new ActionHandle(
                         new WorkflowActionToken(
                             WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MediaFileProviderElementProvider.AddMediaZipFileWorkflow"),
                             new PermissionType[] { PermissionType.Add }
                         )))
                     {
                         VisualData = new ActionVisualizedData
                         {
                             Label = GetResourceString("MediaFileProviderElementProvider.UploadZipFile"),
                             ToolTip = GetResourceString("MediaFileProviderElementProvider.UploadZipFileToolTip"),
                             Icon = MediaFileProviderElementProvider.UploadZipFile,
                             Disabled = false,
                             ActionLocation = new ActionLocation
                             {
                                 ActionType = ActionType.Add,
                                 IsInFolder = false,
                                 IsInToolbar = true,
                                 ActionGroup = PrimaryFileActionGroup
                             }
                         }
                     });
            }

            return folderActions;
        }

        private static string GetResourceString(string key)
        {
            return StringResourceSystemFacade.GetString("Composite.Management", key);
        }

        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }



        private ResourceHandle MediaFileIcon(string mimeType)
        {
            return MimeTypeInfo.GetResourceHandleFromMimeType(MimeTypeInfo.GetCanonical(mimeType));
        }
    }



    internal sealed class EditImageActionExecutor : Composite.C1Console.Actions.IActionExecutor
    {
        public Composite.C1Console.Actions.FlowToken Execute(Composite.C1Console.Security.EntityToken entityToken, Composite.C1Console.Security.ActionToken actionToken, Composite.C1Console.Actions.FlowControllerServicesContainer flowControllerServicesContainer)
        {
            DataEntityToken token = (DataEntityToken)entityToken;
            IMediaFile mediaFile = (IMediaFile)token.Data;

            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;
            string url = UrlUtils.ResolveAdminUrl(string.Format("content/views/editors/imageeditor/ImageEditor.aspx?src={0}&lastWriteTime={1}", System.Web.HttpUtility.UrlEncode(mediaFile.CompositePath), System.Web.HttpUtility.UrlEncode(mediaFile.LastWriteTime.ToString())));

            Composite.C1Console.Events.ConsoleMessageQueueFacade.Enqueue(
                new Composite.C1Console.Events.OpenViewMessageQueueItem 
                { 
                    EntityToken = EntityTokenSerializer.Serialize(entityToken, true),
                    Url = url, 
                    ViewId = Guid.NewGuid().ToString(), 
                    ViewType = Composite.C1Console.Events.ViewType.Main 
                }, 
            currentConsoleId);

            return null;
        }
    }


    internal sealed class DownloadFileActionExecutor : IActionExecutor
    {
        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            DataEntityToken token = (DataEntityToken)entityToken;
            IMediaFile mediaFile = (IMediaFile)token.Data;

            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;

            string url = MediaFileProviderElementProvider.GetMediaUrl(mediaFile, false, true);

            ConsoleMessageQueueFacade.Enqueue(new DownloadFileMessageQueueItem(url), currentConsoleId);

            return null;
        }
    }


    [ActionExecutor(typeof(EditImageActionExecutor))]
    internal sealed class EditImageActionToken : ActionToken
    {
        static private IEnumerable<PermissionType> _permissionTypes = new PermissionType[] { PermissionType.Edit };

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }


        public override string Serialize()
        {
            return "EditImage";
        }


        public static ActionToken Deserialize(string serializedData)
        {
            return new EditImageActionToken();
        }
    }

    [ActionExecutor(typeof(DownloadFileActionExecutor))]
    internal sealed class DownloadFileActionToken : ActionToken
    {
        static private IEnumerable<PermissionType> _permissionTypes = new [] { PermissionType.Read };

        public override IEnumerable<PermissionType> PermissionTypes
        {
            get { return _permissionTypes; }
        }


        public override string Serialize()
        {
            return "DownloadFile";
        }


        public static ActionToken Deserialize(string serializedData)
        {
            return new DownloadFileActionToken();
        }
    }



    [Assembler(typeof(MediaFileElementProviderAssembler))]
    internal sealed class MediaFileElementProviderData : HooklessElementProviderData
    {
        private const string _showOnlyImagesProperty = "showOnlyImages";
        [ConfigurationProperty(_showOnlyImagesProperty, IsRequired = true)]
        public bool ShowOnlyImages
        {
            get { return (bool)base[_showOnlyImagesProperty]; }
            set { base[_showOnlyImagesProperty] = value; }
        }



        private const string _rootLabel = "rootLabel";
        [ConfigurationProperty(_rootLabel, IsRequired = true)]
        public string RootLabel
        {
            get { return (string)base[_rootLabel]; }
            set { base[_rootLabel] = value; }
        }
    }



    internal sealed class MediaFileElementProviderAssembler : IAssembler<IHooklessElementProvider, HooklessElementProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IHooklessElementProvider Assemble(IBuilderContext context, HooklessElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new MediaFileProviderElementProvider(objectConfiguration as MediaFileElementProviderData);
        }
    }
}
