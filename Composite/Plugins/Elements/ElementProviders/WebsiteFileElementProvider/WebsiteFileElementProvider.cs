using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Linq;
using Composite.C1Console.Actions;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Core.WebClient;
using Composite.Data;
using Composite.Data.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider
{
    [ConfigurationElementType(typeof(WebsiteFileElementProviderData))]
    internal sealed class WebsiteFileElementProvider : IHooklessElementProvider, IDataExchangingElementProvider
    {
        private ElementProviderContext _context;
        private readonly string _rootPath;
        private readonly string _rootLabel;
        private readonly string _folderWhiteListKeyName;
        private readonly List<string> _manageableKeyNames;
        private readonly List<string> _manageableKeyNameLabels;

        private static ResourceHandle FolderIcon => CommonElementIcons.Folder;
        private static ResourceHandle OpenFolderIcon => CommonElementIcons.FolderOpen;
        private static ResourceHandle EmptyFolderIcon => CommonElementIcons.FolderOpen;
        private static ResourceHandle ReadOnlyFolderOpen => GetIconHandle("website-read-only-folder-open");
        private static ResourceHandle ReadOnlyFolderClosed => GetIconHandle("website-read-only-folder-closed");
        private static ResourceHandle AddWebsiteFolder => GetIconHandle("website-add-website-folder");
        private static ResourceHandle AddWebsiteFile => GetIconHandle("website-create-website-file");
        private static ResourceHandle DeleteWebsiteFolder => GetIconHandle("website-delete-website-folder");
        private static ResourceHandle DeleteWebsiteFile => GetIconHandle("website-delete-website-file");
        private static ResourceHandle EditWebsiteFile => GetIconHandle("website-edit-website-file");
        private static ResourceHandle UploadWebsiteFile => GetIconHandle("website-upload-website-file");
        private static ResourceHandle UploadAndExtractZipFile => GetIconHandle("website-upload-zip-file");
        private static ResourceHandle DownloadWebsiteFile => GetIconHandle("media-download-file");
        private static ResourceHandle AddFolderToWhiteList => GetIconHandle("website-add-folder-to-whitelist");
        private static ResourceHandle RemoveFolderFromWhiteList => GetIconHandle("website-remove-folder-from-whitelist");


        private static readonly ActionGroup PrimaryFolderActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);
        private static readonly ActionGroup PrimaryFileActionGroup = new ActionGroup("File", ActionGroupPriority.PrimaryMedium);
//        private static readonly ActionGroup PrimaryFileToolsActionGroup = new ActionGroup("FileTools", ActionGroupPriority.PrimaryMedium);
        private static readonly ActionGroup PrimaryFolderToolsActionGroup = new ActionGroup("FolderTools", ActionGroupPriority.PrimaryMedium);

        private static readonly PermissionType[] _addNewWebsiteFolderPermissionTypes = { PermissionType.Add };
        private static readonly PermissionType[] _addNewWebsiteFilePermissionTypes = { PermissionType.Add };
        private static readonly PermissionType[] _uploadAndExtractZipFileWorkflow = { PermissionType.Add };
        private static readonly PermissionType[] _deleteWebsiteFolderPermissionTypes = { PermissionType.Delete };
        private static readonly PermissionType[] _deleteWebsiteFilePermissionTypes = { PermissionType.Delete };
        private static readonly PermissionType[] _editWebsiteFilePermissionTypes = { PermissionType.Edit };
        private static readonly PermissionType[] _uploadWebsiteFilePermissionTypes = { PermissionType.Add };
        private static readonly PermissionType[] _changeWhiteListPermissionTypes = { PermissionType.Administrate };


        public WebsiteFileElementProvider(WebsiteFileElementProviderData objectConfiguration)
        {
            _rootLabel = objectConfiguration.RootLabel;
            _folderWhiteListKeyName = objectConfiguration.FolderWhiteListKeyName;

            if (!string.IsNullOrEmpty(objectConfiguration.ManageableKeyNames))
            {
                _manageableKeyNames = objectConfiguration.ManageableKeyNames.Split(',').ToList();
                _manageableKeyNameLabels = StringResourceSystemFacade.SplitParseableStrings(objectConfiguration.ManageableKeyNameLabels, ',').ToList();
            }
            else
            {
                _manageableKeyNames = new List<string>();
            }

            _rootPath = Path.GetDirectoryName(PathUtil.BaseDirectory);
        }



        public ElementProviderContext Context
        {
            set => _context = value;
        }



        public IEnumerable<Element> GetRoots(SearchToken seachToken)
        {
            Element element = new Element(_context.CreateElementHandle(new WebsiteFileElementProviderRootEntityToken(_context.ProviderName, _rootPath)))
            {
                VisualData = new ElementVisualizedData()
                {
                    Label = StringResourceSystemFacade.ParseString(_rootLabel),
                    ToolTip = StringResourceSystemFacade.ParseString(_rootLabel),
                    HasChildren = true,
                    Icon = FolderIcon,
                    OpenedIcon = OpenFolderIcon
                }
            };

            //element.MovabilityInfo.AddDropType(typeof(WebsiteFolder));
            //element.MovabilityInfo.AddDropType(typeof(WebsiteFile));

            //List<IFolderWhiteList> myWhiteLists = DataFacade.GetData<IFolderWhiteList>(f => f.KeyName == _folderWhiteListKeyName).ToList();

            if (string.IsNullOrEmpty(_folderWhiteListKeyName) || DataFacade.GetData<IFolderWhiteList>(f => f.KeyName == _folderWhiteListKeyName && f.TildeBasedPath == "~\\").Any())
            {
                element.AddAction(
                   new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider.AddNewWebsiteFolderWorkflow"), _addNewWebsiteFolderPermissionTypes)))
                   {
                       VisualData = new ActionVisualizedData
                       {
                           Label = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "AddWebsiteFolderTitle"),
                           ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "AddWebsiteFolderToolTip"),
                           Icon = WebsiteFileElementProvider.AddWebsiteFolder,
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
                   new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider.AddNewWebsiteFileWorkflow"), _addNewWebsiteFilePermissionTypes)))
                   {
                       VisualData = new ActionVisualizedData
                       {
                           Label = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "AddWebsiteFileTitle"),
                           ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "AddWebsiteFileToolTip"),
                           Icon = WebsiteFileElementProvider.AddWebsiteFile,
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
                   new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider.UploadWebsiteFileWorkflow"), _uploadWebsiteFilePermissionTypes)))
                   {
                       VisualData = new ActionVisualizedData
                       {
                           Label = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "UploadWebsiteFileTitle"),
                           ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "UploadWebsiteFileToolTip"),
                           Icon = WebsiteFileElementProvider.UploadWebsiteFile,
                           Disabled = false,
                           ActivePositions = ElementActionActivePosition.NavigatorTree | ElementActionActivePosition.SelectorTree,
                           ActionLocation = new ActionLocation
                           {
                               ActionType = ActionType.Add,
                               IsInFolder = false,
                               IsInToolbar = true,
                               ActionGroup = PrimaryFolderActionGroup,
                               ActionBundle = "Upload"
                           }
                       }
                   });

                element.AddAction(
                   new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider.UploadAndExtractZipFileWorkflow"), _uploadAndExtractZipFileWorkflow)))
                   {
                       VisualData = new ActionVisualizedData
                       {
                           Label = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "UploadAndExtractZipFileTitle"),
                           ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "UploadAndExtractZipFileToolTip"),
                           Icon = WebsiteFileElementProvider.UploadAndExtractZipFile,
                           Disabled = false,
                           ActivePositions = ElementActionActivePosition.NavigatorTree | ElementActionActivePosition.SelectorTree,
                           ActionLocation = new ActionLocation
                           {
                               ActionType = ActionType.Add,
                               IsInFolder = false,
                               IsInToolbar = true,
                               ActionGroup = PrimaryFolderActionGroup,
                               ActionBundle = "Upload"
                           }
                       }
                   });

                var actionsToAppend = new List<ElementAction>();
                IEnumerable<IFolderWhiteList> manageableFolderWhiteLists = DataFacade.GetData<IFolderWhiteList>().ToList();
                AppendFolderManagementActions( PathUtil.BaseDirectory, manageableFolderWhiteLists, actionsToAppend);

                element.AddAction(actionsToAppend);
            }

            yield return element;
        }



        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken searchToken)
        {
            if (entityToken is WebsiteFileElementProviderRootEntityToken)
            {
                return GetChildrenOnPath(_rootPath, searchToken);
            }

            if (entityToken is WebsiteFileElementProviderEntityToken websiteFileEntityToken)
            {
                string path = websiteFileEntityToken.Path;

                if (C1Directory.Exists(path))
                {
                    return GetChildrenOnPath(path, searchToken);
                }

                return new Element[] { };
            }

            throw new NotImplementedException();
        }



        public object GetData(string name)
        {
            return name == "RootPath" ? _rootPath : null;
        }



        private IEnumerable<Element> GetChildrenOnPath(string parentPath, SearchToken searchToken)
        {
            IEnumerable<WebsiteFolder> websiteFolders = GetFoldersOnPath(parentPath, searchToken);
            IEnumerable<WebsiteFile> websiteFiles = GetFilesOnPath(parentPath, searchToken);

            IEnumerable<Element> folders = CreateFolderElements(websiteFolders);
            IEnumerable<Element> files = CreateFileElements(websiteFiles);

            return folders.Concat(files).ToList();
        }



        private IEnumerable<Element> CreateFileElements(IEnumerable<WebsiteFile> websiteFiles)
        {
            foreach (WebsiteFile websiteFile in websiteFiles)
            {
                var element = new Element(_context.CreateElementHandle(new WebsiteFileElementProviderEntityToken(_context.ProviderName, websiteFile.FullPath, _rootPath)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = websiteFile.FileName,
                        ToolTip = websiteFile.FileName,
                        HasChildren = false,
                        Icon = WebsiteFileIcon(websiteFile.MimeType),
                        OpenedIcon = WebsiteFileIcon(websiteFile.MimeType)
                    }
                };

                element.PropertyBag.Add("Uri", PathUtil.GetWebsitePath(websiteFile.FullPath));
                element.PropertyBag.Add("ElementType", websiteFile.MimeType);

                //element.MovabilityInfo.DragType = typeof(WebsiteFile);

                foreach (ElementAction action in GetFileActions(websiteFile))
                {
                    element.AddAction(action);
                }

                yield return element;
            }
        }



        private IEnumerable<Element> CreateFolderElements(IEnumerable<WebsiteFolder> websiteFolders)
        {
            IEnumerable<IFolderWhiteList> manageableFolderWhiteLists = DataFacade.GetData<IFolderWhiteList>().ToList();

            IEnumerable<IFolderWhiteList> myWhiteLists = null;
            if (!string.IsNullOrEmpty(_folderWhiteListKeyName))
            {
                myWhiteLists = DataFacade.GetData<IFolderWhiteList>(f=>f.KeyName==_folderWhiteListKeyName).ToList();
            }

            foreach (WebsiteFolder websiteFolder in websiteFolders)
            {
                var element = new Element(_context.CreateElementHandle(new WebsiteFileElementProviderEntityToken(_context.ProviderName, websiteFolder.FullPath, _rootPath)))
                {
                    VisualData = new ElementVisualizedData
                    {
                        Label = websiteFolder.FolderName,
                        ToolTip = websiteFolder.FolderName,
                        HasChildren = true,
                        Icon = FolderIcon,
                        OpenedIcon = OpenFolderIcon
                    },
                };

                if (myWhiteLists == null || myWhiteLists.Any(f => websiteFolder.FullPath.StartsWith(f.GetFullPath())))
                {
                    foreach (ElementAction action in GetFolderActions(websiteFolder, manageableFolderWhiteLists))
                    {
                        element.AddAction(action);
                    }
                }

                yield return element;
            }
        }



        private IEnumerable<WebsiteFolder> GetFoldersOnPath(string parentPath, SearchToken searchToken)
        {
            IEnumerable<WebsiteFolder> folders =
                from folderPath in C1Directory.GetDirectories(parentPath)
                orderby folderPath
                select new WebsiteFolder(folderPath);

            if (searchToken.IsValidKeyword())
            {
                folders =
                    from folder in folders
                    where folder.FolderName.ToLowerInvariant().Contains(searchToken.Keyword.ToLowerInvariant()) 
                    select folder;
            }

            if (!string.IsNullOrEmpty(_folderWhiteListKeyName))
            {
                List<IFolderWhiteList> whiteList = DataFacade.GetData<IFolderWhiteList>().Where(f => f.KeyName == _folderWhiteListKeyName).ToList();

                folders =
                    from folder in folders.ToList()
                    where whiteList.Any(f => folder.FullPath.StartsWith(f.GetFullPath()) || f.GetFullPath().StartsWith(folder.FullPath))
                    select folder;
            }

            return folders;
        }



        private IEnumerable<WebsiteFile> GetFilesOnPath(string parentPath, SearchToken searchToken)
        {
            if (!string.IsNullOrEmpty(_folderWhiteListKeyName))
            {
                string parentTildaPath = IFolderWhiteListExtensions.GetTildePath(parentPath);
                // NOTE: linq2sql conversion doesn't support xxx.StartsWith(someParameter) construction, that's why we're using two ling statements to get the data
                bool isWhitelisted = (from path in ((from item in DataFacade.GetData<IFolderWhiteList>()
                                                     where item.KeyName == _folderWhiteListKeyName
                                                     select item.TildeBasedPath) as IEnumerable<string>)
                                      where parentTildaPath.StartsWith(path)
                                      select path).Any();

                if (!isWhitelisted)
                {
                    yield break;
                }
            }

            IEnumerable<WebsiteFile> files =
                from filename in Directory.GetFiles(parentPath)
                orderby filename
                select new WebsiteFile(filename);

            if (searchToken.IsValidKeyword())
            {
                files =
                    from file in files
                    where file.FileName.ToLowerInvariant().Contains(searchToken.Keyword.ToLowerInvariant()) 
                    select file;
            }

            foreach (var file in files)
                yield return file;
        }



        private IEnumerable<ElementAction> GetFolderActions(WebsiteFolder websiteFolder, IEnumerable<IFolderWhiteList> manageableFolderWhiteLists)
        {
            IList<ElementAction> folderActions = new List<ElementAction>();

            folderActions.Add(
                new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider.AddNewWebsiteFolderWorkflow"), _addNewWebsiteFolderPermissionTypes)))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "AddWebsiteFolderTitle"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "AddWebsiteFolderToolTip"),
                        Icon = WebsiteFileElementProvider.AddWebsiteFolder,
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
               new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider.AddNewWebsiteFileWorkflow"), _addNewWebsiteFilePermissionTypes)))
               {
                   VisualData = new ActionVisualizedData
                   {
                       Label = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "AddWebsiteFileTitle"),
                       ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "AddWebsiteFileToolTip"),
                       Icon = WebsiteFileElementProvider.AddWebsiteFile,
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
               new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider.UploadWebsiteFileWorkflow"), _uploadWebsiteFilePermissionTypes)))
               {
                   VisualData = new ActionVisualizedData
                   {
                       Label = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "UploadWebsiteFileTitle"),
                       ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "UploadWebsiteFileToolTip"),
                       Icon = WebsiteFileElementProvider.UploadWebsiteFile,
                       Disabled = false,
                       ActivePositions = ElementActionActivePosition.NavigatorTree | ElementActionActivePosition.SelectorTree,
                       ActionLocation = new ActionLocation
                       {
                           ActionType = ActionType.Add,
                           IsInFolder = false,
                           IsInToolbar = true,
                           ActionGroup = PrimaryFolderActionGroup,
                           ActionBundle = "Upload"

                       }
                   }
               });

            folderActions.Add(
               new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider.UploadAndExtractZipFileWorkflow"), _uploadAndExtractZipFileWorkflow)))
               {
                   VisualData = new ActionVisualizedData
                   {
                       Label = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "UploadAndExtractZipFileTitle"),
                       ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "UploadAndExtractZipFileToolTip"),
                       Icon = WebsiteFileElementProvider.UploadAndExtractZipFile,
                       Disabled = false,
                       ActivePositions = ElementActionActivePosition.NavigatorTree | ElementActionActivePosition.SelectorTree,
                       ActionLocation = new ActionLocation
                       {
                           ActionType = ActionType.Add,
                           IsInFolder = false,
                           IsInToolbar = true,
                           ActionGroup = PrimaryFolderActionGroup,
                           ActionBundle = "Upload"
                       }
                   }
               });



            if (IsDeleteActionAllowed(websiteFolder))
            {
                folderActions.Add(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider.DeleteWebsiteFolderWorkflow"), _deleteWebsiteFolderPermissionTypes)))
                     {
                         VisualData = new ActionVisualizedData
                         {
                             Label = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "DeleteWebsiteFolderTitle"),
                             ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "DeleteWebsiteFolderToolTip"),
                             Icon = DeleteWebsiteFolder,
                             Disabled = false,
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
            }


            AppendFolderManagementActions(websiteFolder.FullPath, manageableFolderWhiteLists, folderActions);
          
            return folderActions;
        }

        private void AppendFolderManagementActions(string websiteFolderPath, IEnumerable<IFolderWhiteList> manageableFolderWhiteLists, IList<ElementAction> folderActions)
        {
            for (int i = 0; i < _manageableKeyNames.Count; i++)
            {
                string keyName = _manageableKeyNames[i];
                string itemLabel = StringResourceSystemFacade.ParseString(_manageableKeyNameLabels[i]);

                ResourceHandle icon;
                string label;
                string tooltip;
                WorkflowActionToken workflowActionToken;

                ActionCheckedStatus checkedStatus;
                var tildeBasedPath = IFolderWhiteListExtensions.GetTildePath(websiteFolderPath);
                if (manageableFolderWhiteLists.Any(f => f.KeyName == keyName && f.TildeBasedPath == tildeBasedPath))
                {
                    workflowActionToken = new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider.RemoveWebsiteFolderFromWhiteListWorkflow"), _changeWhiteListPermissionTypes);
                    label = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "RemoveFolderFromWhiteListTitle");
                    tooltip = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "RemoveFolderFromWhiteListToolTip");
                    icon = WebsiteFileElementProvider.RemoveFolderFromWhiteList;
                    checkedStatus = ActionCheckedStatus.Checked;
                }
                else
                {
                    workflowActionToken = new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider.AddWebsiteFolderToWhiteListWorkflow"), _changeWhiteListPermissionTypes);
                    label = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "AddFolderToWhiteListTitle");
                    tooltip = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "AddFolderToWhiteListToolTip");
                    icon = WebsiteFileElementProvider.AddFolderToWhiteList;
                    checkedStatus = ActionCheckedStatus.Unchecked;
                }

                label = string.Format(label, itemLabel);
                tooltip = string.Format(tooltip, itemLabel);

                workflowActionToken.Payload = keyName;

                folderActions.Add(
                   new ElementAction(new ActionHandle(workflowActionToken))
                   {
                       VisualData = new ActionVisualizedData
                       {
                           Label = label,
                           ToolTip = tooltip,
                           Icon = icon,
                           Disabled = false,
                           ActionLocation = new ActionLocation
                           {
                               ActionType = ActionType.Other,
                               IsInFolder = false,
                               IsInToolbar = false,
                               ActionGroup = PrimaryFolderToolsActionGroup
                           },
                           ActionCheckedStatus = checkedStatus
                       }
                   });

            }
        }



        private IEnumerable<ElementAction> GetFileActions(WebsiteFile websiteFile)
        {
            IList<ElementAction> fileActions = new List<ElementAction>();

            if (IsDeleteActionAllowed(websiteFile))
            {
                fileActions.Add(
                    new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider.DeleteWebsiteFileWorkflow"), _deleteWebsiteFilePermissionTypes)))
                     {
                         VisualData = new ActionVisualizedData
                         {
                             Label = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "DeleteWebsiteFileTitle"),
                             ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "DeleteWebsiteFileToolTip"),
                             Icon = DeleteWebsiteFile,
                             Disabled = websiteFile.IsReadOnly,
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
            }

            // Download
            fileActions.Add(
                new ElementAction(new ActionHandle(new DownloadFileActionToken()))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "DownloadFileTitle"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.WebsiteFileElementProvider", "DownloadFileToolTip"),
                        Icon = DownloadWebsiteFile,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Add, // For sorting purpose
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryFileActionGroup
                        }
                    }
                });

            if (IsEditActionAllowed(websiteFile))
            {
                fileActions.Add(
                        new ElementAction(new ActionHandle(
                            websiteFile.MimeType==MimeTypeInfo.Resx?
                                (ActionToken) new UrlActionToken(websiteFile.FileName, EditWebsiteFile,
                                    UrlUtils.ResolvePublicUrl($"Composite/content/misc/editors/resxeditor/resxeditor.aspx?f={websiteFile.FullPath}"), _editWebsiteFilePermissionTypes):
                            new WorkflowActionToken(
                                WorkflowFacade.GetWorkflowType(
                                    "Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider.EditWebsiteFileTextContentWorkflow"),
                                _editWebsiteFilePermissionTypes)))
                        {
                            VisualData = new ActionVisualizedData
                            {
                                Label = StringResourceSystemFacade.GetString(
                                    "Composite.Plugins.WebsiteFileElementProvider", "EditWebsiteFileTitle"),
                                ToolTip = StringResourceSystemFacade.GetString(
                                    "Composite.Plugins.WebsiteFileElementProvider", "EditWebsiteFileToolTip"),
                                Icon = EditWebsiteFile,
                                Disabled = websiteFile.IsReadOnly,
                                ActionLocation = new ActionLocation
                                {
                                    ActionType = ActionType.Edit,
                                    IsInFolder = false,
                                    IsInToolbar = true,
                                    ActionGroup = PrimaryFileActionGroup
                                }
                            }
                        });

                if (websiteFile.MimeType == MimeTypeInfo.Resx && 
                    !CultureInfo.GetCultures(CultureTypes.SpecificCultures).
                    Any(f => f.Name != "" && 
                    websiteFile.FileName.EndsWith("." + f.Name + ".Resx", StringComparison.OrdinalIgnoreCase)))
                {
                    var files = Directory.GetFiles(Path.GetDirectoryName(websiteFile.FullPath));
                    foreach (var cultureInfo in DataLocalizationFacade.ActiveLocalizationCultures)
                    {
                        if (!files.Any(f => cultureInfo.Name!="" && f.EndsWith("." + cultureInfo.Name + ".Resx", StringComparison.OrdinalIgnoreCase)))
                        {

                        fileActions.Add(
                            new ElementAction(new ActionHandle(
                                new UrlActionToken(websiteFile.FileName, EditWebsiteFile,
                                    UrlUtils.ResolvePublicUrl(
                                        $"Composite/content/misc/editors/resxeditor/resxeditor.aspx?f={websiteFile.FullPath}&t={cultureInfo.Name}"),
                                    _editWebsiteFilePermissionTypes)
                            ))
                            {
                                VisualData = new ActionVisualizedData
                                {
                                    Label = string.Format(StringResourceSystemFacade.GetString(
                                        "Composite.Web.SourceEditor", "ResxEditor.TranslateTo.Label"), cultureInfo.DisplayName),
                                    ToolTip = string.Format(StringResourceSystemFacade.GetString(
                                        "Composite.Web.SourceEditor", "ResxEditor.TranslateTo.Tooltip"), cultureInfo.DisplayName),
                                    Icon = EditWebsiteFile,
                                    Disabled = websiteFile.IsReadOnly,
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
                    }
                }
            }
            

            return fileActions;
        }



        private static bool IsDeleteActionAllowed(WebsiteEntity websiteEntity)
        {
            if (websiteEntity is WebsiteFile)
            {
                return true;
                //WebsiteFile websiteFile = websiteEntity as WebsiteFile;

                //string canonical = MimeTypeInfo.GetCanonical(websiteFile.MimeType);

                //return _editableMimeTypes.Contains(canonical);
            }
            if (websiteEntity is WebsiteFolder)
            {
                //return false;
                // Deleting a folder causes the webserver to restart...

                //if (Directory.GetFiles(websiteEntity.FullPath).Length > 0) return false;
                //if (Directory.GetDirectories(websiteEntity.FullPath).Length > 0) return false;

                return true;
            }

            throw new NotImplementedException();
        }


        private static bool IsEditActionAllowed(WebsiteEntity websiteEntity)
        {
            if (websiteEntity is WebsiteFile websiteFile)
            {
                return MimeTypeInfo.IsTextFile(websiteFile.MimeType);
            }

            if (websiteEntity is WebsiteFolder)
            {
                return false;
            }
            
            throw new NotImplementedException();
        }



        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }



        internal static ResourceHandle WebsiteFileIcon(string mimeType)
        {
            return MimeTypeInfo.GetResourceHandleFromMimeType(MimeTypeInfo.GetCanonical(mimeType));
        }
    }

    internal sealed class DownloadFileActionExecutor : IActionExecutor
    {
        public static string GetDownloadLink(WebsiteFileElementProviderEntityToken fileToken)
        {
            var urlString = new UrlBuilder(UrlUtils.AdminRootPath + "/services/Admin/DownloadFile.ashx");

            string relativeFilePath = fileToken.Path.Substring(fileToken.RootPath.Length);

            urlString["file"] = relativeFilePath;
            urlString["provider"] = fileToken.Source;

            return urlString.ToString();
        }

        public FlowToken Execute(EntityToken entityToken, ActionToken actionToken, FlowControllerServicesContainer flowControllerServicesContainer)
        {
            var fileToken = (WebsiteFileElementProviderEntityToken)entityToken;

            string downloadLink = GetDownloadLink(fileToken);

            string currentConsoleId = flowControllerServicesContainer.GetService<IManagementConsoleMessageService>().CurrentConsoleId;

            ConsoleMessageQueueFacade.Enqueue(new DownloadFileMessageQueueItem(downloadLink), currentConsoleId);

            return null;
        }
    }

    [ActionExecutor(typeof(DownloadFileActionExecutor))]
    internal sealed class DownloadFileActionToken : ActionToken
    {
        internal static readonly PermissionType[] RequiredPermissionTypes = { PermissionType.Administrate, PermissionType.Edit };

        public override IEnumerable<PermissionType> PermissionTypes => RequiredPermissionTypes;

        public override string Serialize() => "DownloadFile";


        public static ActionToken Deserialize(string serializedData) => new DownloadFileActionToken();

        public override bool IgnoreEntityTokenLocking => true;
    }



    [Assembler(typeof(WebsiteFileElementProviderAssembler))]
    internal sealed class WebsiteFileElementProviderData : HooklessElementProviderData
    {
        private const string _rootLabel = "rootLabel";
        [ConfigurationProperty(_rootLabel, IsRequired = true)]
        public string RootLabel
        {
            get { return (string)base[_rootLabel]; }
            set { base[_rootLabel] = value; }
        }


        private const string _folderWhiteListKeyName = "folderWhiteListKeyName";
        /// <summary>
        /// If specified, the key to use when localitng "white listed" folders for this provider.
        /// When empty all folders are shown (no white-listing required)
        /// </summary>
        [ConfigurationProperty(_folderWhiteListKeyName, IsRequired = false, DefaultValue = "")]
        public string FolderWhiteListKeyName
        {
            get { return (string)base[_folderWhiteListKeyName]; }
            set { base[_folderWhiteListKeyName] = value; }
        }


        private const string _manageableKeyNames = "manageableKeyNames";
        /// <summary>
        /// A comma seperated list of "key names" this provider should manage. In effect, this 
        /// controls the folders in other providers that have the specified key name.
        /// </summary>
        [ConfigurationProperty(_manageableKeyNames, IsRequired = false, DefaultValue = "")]
        public string ManageableKeyNames
        {
            get { return (string)base[_manageableKeyNames]; }
            set { base[_manageableKeyNames] = value; }
        }


        private const string _manageableKeyNameLabels = "manageableKeyNameLabels";
        /// <summary>
        /// A comma seperated list of strings that denote what is managed by the respective "key name"
        /// specified for ManageableKeyNames (in the same order). Used for humans to build command labels.
        /// </summary>
        [ConfigurationProperty(_manageableKeyNameLabels, IsRequired = false, DefaultValue = "")]
        public string ManageableKeyNameLabels
        {
            get { return (string)base[_manageableKeyNameLabels]; }
            set { base[_manageableKeyNameLabels] = value; }
        }
    }



    internal sealed class WebsiteFileElementProviderAssembler : IAssembler<IHooklessElementProvider, HooklessElementProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IHooklessElementProvider Assemble(IBuilderContext context, HooklessElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new WebsiteFileElementProvider(objectConfiguration as WebsiteFileElementProviderData);
        }
    }
}
