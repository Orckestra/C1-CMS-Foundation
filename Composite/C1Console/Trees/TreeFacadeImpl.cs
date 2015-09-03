using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading;
using System.Web.Hosting;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Xsl;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;
using Composite.C1Console.Events;
using Composite.C1Console.Security;
using Composite.C1Console.Trees.Foundation;
using Composite.C1Console.Trees.Foundation.AttachmentPoints;
using Composite.C1Console.Users;
using Composite.Core;
using Composite.Core.Collections.Generic;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Linq;
using Composite.Core.ResourceSystem;
using Composite.Core.Threading;
using Composite.Core.Types;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.GeneratedTypes;
using Composite.Data.ProcessControlled;
using Composite.Data.Transactions;
using Composite.Data.Types;
using Composite.Plugins.Elements.ElementProviders.DeveloperApplicationProvider;


namespace Composite.C1Console.Trees
{
    [FlushAttribute("ReloadAllTrees")]
    internal sealed class TreeFacadeImpl : ITreeFacade
    {
        private static readonly string LogTitle = "TreeFacade";

        private const string XslFilename = "Tree.xsl";

        private static readonly ResourceLocker<Resources> _resourceLocker = new ResourceLocker<Resources>(new Resources(), Resources.Initialize, false);
        private static readonly object _reloadAttachmentPointsSyncRoot = new object();


        public void Initialize()
        {
            using (_resourceLocker.Locker)
            {
                if (!GlobalInitializerFacade.IsReinitializingTheSystem)
                {
                    DataEventSystemFacade.SubscribeToDataAfterAdd<IDataItemTreeAttachmentPoint>(OnUpdateTreeAttachmentPoints, true);
                    DataEventSystemFacade.SubscribeToDataDeleted<IDataItemTreeAttachmentPoint>(OnUpdateTreeAttachmentPoints, true);
                    DataEventSystemFacade.SubscribeToStoreChanged<IDataItemTreeAttachmentPoint>(OnTreeAttachmentPointsStoreChange, true);

                    GeneratedTypesFacade.SubscribeToUpdateTypeEvent(OnDataTypeChanged);

                    var treeAuxiliaryAncestorProvider = new C1Console.Trees.TreeAuxiliaryAncestorProvider();
                    AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<TreeSimpleElementEntityToken>(treeAuxiliaryAncestorProvider, true);
                    AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<TreeFunctionElementGeneratorEntityToken>(treeAuxiliaryAncestorProvider, true);
                    AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<TreeDataFieldGroupingElementEntityToken>(treeAuxiliaryAncestorProvider, true);
                    AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DataEntityToken>(treeAuxiliaryAncestorProvider, true);
                    AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<TreePerspectiveEntityToken>(treeAuxiliaryAncestorProvider, true);

                    _resourceLocker.Resources.PersistentAttachmentPoints = new Dictionary<string, List<IAttachmentPoint>>();

                    LoadAllTrees();
                    InitializeTreeAttachmentPoints();
                    TreeSharedRootsFacade.Clear();

                    var fileWatcher = new C1FileSystemWatcher(TreeDefinitionsFolder, "*.xml");
                    fileWatcher.Created += OnReloadTrees;
                    fileWatcher.Deleted += OnReloadTrees;
                    fileWatcher.Changed += OnReloadTrees;
                    fileWatcher.Renamed += OnReloadTrees;
                    fileWatcher.EnableRaisingEvents = true;

                    _resourceLocker.Resources.FileSystemWatcher = fileWatcher;


                    _resourceLocker.Resources.RootEntityToken = ElementFacade.GetRootsWithNoSecurity().First().ElementHandle.EntityToken;
                }
            }
        }



        public Tree GetTree(string treeId)
        {
            Tree tree;

            using (_resourceLocker.ReadLocker)
            {
                _resourceLocker.Resources.Trees.TryGetValue(treeId, out tree);
            }

            return tree;
        }



        public IEnumerable<Tree> AllTrees
        {
            get
            {
                using (_resourceLocker.ReadLocker)
                {
                    return _resourceLocker.Resources.Trees.Values.Evaluate();
                }
            }
        }



        public bool HasAttachmentPoints(EntityToken parentEntityToken)
        {
            using (_resourceLocker.ReadLocker)
            {
                return _resourceLocker.Resources.Trees.Any(f => f.Value.HasAttachmentPoints(parentEntityToken));
            }
        }



        public bool HasPossibleAttachmentPoints(EntityToken parentEntityToken)
        {
            using (_resourceLocker.ReadLocker)
            {
                return _resourceLocker.Resources.Trees.Any(f => f.Value.HasPossibleAttachmentPoints(parentEntityToken));
            }
        }



        public IEnumerable<Tree> GetTreesByEntityToken(EntityToken parentEntityToken)
        {
            using (_resourceLocker.ReadLocker)
            {
                return _resourceLocker.Resources.Trees.Values.Where(tree => tree.HasAttachmentPoints(parentEntityToken));
            }
        }



        public IEnumerable<Element> GetElementsByTreeId(string treeId, EntityToken parentEntityToken, Dictionary<string, string> piggybag)
        {
            Tree tree = GetTree(treeId);
            if (tree == null) return new Element[] { };

            var dynamicContext = new TreeNodeDynamicContext(TreeNodeDynamicContextDirection.Down)
            {
                Piggybag = piggybag,
                CurrentEntityToken = parentEntityToken,
                CurrentTreeNode = tree.RootTreeNode
            };

            return tree.RootTreeNode.GetElements(parentEntityToken, dynamicContext);
        }



        public Tree LoadTreeFromDom(string treeId, XDocument document)
        {
            string xslFilename = Path.Combine(TreeDefinitionsFolder, XslFilename);

            var fileInfo = new C1FileInfo(xslFilename);

            // The default xslt transformation does no changes and it's xsl file has size of 358 bytes, skipping this file saves up to 0.5 second on site startup
            if (fileInfo.Exists && fileInfo.Length != 358)
            {
                try
                {
                    var newDocument = new XDocument();
                    using (XmlWriter xmlWriter = newDocument.CreateWriter())
                    {
                        var xslTransform = new XslCompiledTransform();

                        xslTransform.LoadFromPath(xslFilename);

                        xslTransform.Transform(document.CreateReader(), xmlWriter);
                    }

                    document = newDocument;
                }
                catch (Exception ex)
                {
                    Log.LogCritical("TreeFacade", "Failed to apply xslt on the tree {0} with the following exception", treeId);
                    Log.LogCritical("TreeFacade", ex);
                }
            }

            return Load(treeId, document);
        }



        public void OnFlush()
        {
            using (_resourceLocker.Locker)
            {
                _resourceLocker.Resources.PersistentAttachmentPoints = new Dictionary<string, List<IAttachmentPoint>>();
                Initialize();
            }
        }



        private void OnDataTypeChanged(EventArgs eventArgs)
        {
            OnReloadTrees(null, null);
        }



        private void OnReloadTrees(object sender, FileSystemEventArgs e)
        {
            if (HostingEnvironment.ApplicationHost.ShutdownInitiated())
            {
                return;
            }

            Thread.CurrentThread.CurrentCulture = UserSettings.CultureInfo;


            using (GlobalInitializerFacade.CoreIsInitializedScope)
            using (_resourceLocker.Locker)
            {
                TimeSpan timeSpan = DateTime.Now - _resourceLocker.Resources.LastFileChange;
                if (timeSpan.TotalMilliseconds > 100)
                {
                    _resourceLocker.Resources.LastFileChange = DateTime.Now;
                    ReloadAllTrees();
                }
            }
        }



        private void LoadAllTrees()
        {
            using (_resourceLocker.Locker)
            {
                _resourceLocker.Resources.Trees = new Dictionary<string, Tree>();

                Log.LogVerbose(LogTitle, "Loading all tree definitions from {0}", TreeDefinitionsFolder);

                foreach (string filename in C1Directory.GetFiles(TreeDefinitionsFolder, "*.xml"))
                {
                    string treeId = Path.GetFileName(filename);

                    try
                    {
                        Log.LogVerbose(LogTitle, "Loading tree from file: " + filename);

                        int t1 = Environment.TickCount;

                        Tree tree = LoadTreeFromFile(treeId);

                        if (tree.BuildResult.ValidationErrors.Any())
                        {
                            Log.LogError(LogTitle, "Tree {0} was not loaded due to the following validation errors", treeId);

                            var sb = new StringBuilder();
                            foreach (ValidationError validationError in tree.BuildResult.ValidationErrors)
                            {
                                sb.AppendLine(string.Format("{0} at {1}", validationError.Message, validationError.XPath));
                                Log.LogError("TreeFacade", string.Format("{0} at {1} in {2}", validationError.Message, validationError.XPath, filename));
                            }

                            //Tree errorTree = CreateErrorTree(treeId, sb.ToString());
                            //if (_resourceLocker.Resources.Trees.ContainsKey(errorTree.TreeId) == false)
                            //{
                            //    _resourceLocker.Resources.Trees.Add(errorTree.TreeId, errorTree);
                            //}
                        }
                        else
                        {
                            _resourceLocker.Resources.Trees.Add(treeId, tree);
                        }

                        int msElapsed = Environment.TickCount - t1;

                        if (msElapsed > 20)
                        {
                            Log.LogVerbose("TreeFacade", "Time spend on loading the tree: " + msElapsed + "ms, file: " + filename);
                        }
                    }
                    catch (Exception ex)
                    {
                        Log.LogError("TreeFacade: Failed to load the tree " + treeId, ex);

                        //Tree errorTree = CreateErrorTree(treeId, ex.Message);
                        //if (_resourceLocker.Resources.Trees.ContainsKey(errorTree.TreeId) == false)
                        //{
                        //    _resourceLocker.Resources.Trees.Add(errorTree.TreeId, errorTree);
                        //}
                    }
                }
            }
        }



        private Tree CreateErrorTree(string treeId, string errorMessage)
        {
            var tree = new Tree("ERRORTREE:" + treeId)
            {
                BuildProcessContext = new BuildProcessContext(),
                BuildResult = new BuildResult()
            };

            tree.AttachmentPoints.Add(
                new EntityTokenAttachmentPoint
                {
                    EntityToken = new DeveloperApplicationProviderEntityToken(DeveloperApplicationProviderEntityToken.TreeDefinitionId, treeId),
                    Position = ElementAttachingProviderPosition.Top
                }
            );

            tree.RootTreeNode = new RootTreeNode()
            {
                Id = "ERRORTREEROOT",
                Tree = tree
            };

            var simpleElementTreeNode = new SimpleElementTreeNode()
            {
                Label = StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "KeyFacade.ErrorTreeNode.Label"),
                Id = "ERROR",
                ToolTip = errorMessage,
                Icon = ResourceHandle.BuildIconFromDefaultProvider("close"),
                Tree = tree
            };

            var messageBoxActionNode = new MessageBoxActionNode
            {
                Id = 1,
                OwnerNode = simpleElementTreeNode,
                Label = StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "KeyFacade.ErrorTreeNode.ShowMessage.Label"),
                ToolTip = StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "KeyFacade.ErrorTreeNode.ShowMessage.ToolTip"),
                Icon = ResourceHandle.BuildIconFromDefaultProvider("log-showlog"),
                Title = StringResourceSystemFacade.GetString("Composite.C1Console.Trees", "KeyFacade.ErrorTreeNode.ShowMessage.Title"),
                Message = errorMessage,
                DialogType = DialogType.Error,
                PermissionTypes = new List<PermissionType> { PermissionType.Administrate }
            };

            simpleElementTreeNode.AddActionNode(messageBoxActionNode);

            tree.RootTreeNode.AddChildTreeNode(simpleElementTreeNode);

            return tree;
        }



        private Tree LoadTreeFromFile(string treeId)
        {
            string filename = Path.Combine(TreeDefinitionsFolder, treeId);

            for (int i = 0; i < 10; i++)
            {
                try
                {
                    XDocument document = XDocumentUtils.Load(filename);
                    return LoadTreeFromDom(treeId, document);
                }
                catch (IOException)
                {
                    Thread.Sleep(100);
                }
            }

            throw new InvalidOperationException("Could not load tree " + treeId);
        }



        private void ReloadAllTrees()
        {
            using (ThreadDataManager.EnsureInitialize())
            {
                LoadAllTrees();

                InitializeTreeAttachmentPoints();

                TreeSharedRootsFacade.Clear();

                using (_resourceLocker.ReadLocker)
                {
                    var refreshTreeMessageQueueItem = new RefreshTreeMessageQueueItem
                    {
                        EntityToken = _resourceLocker.Resources.RootEntityToken
                    };

                    ConsoleMessageQueueFacade.Enqueue(refreshTreeMessageQueueItem, null);
                }
            }
        }



        private Tree Load(string treeId, XDocument document)
        {
            Tree tree = TreeBuilder.BuildTree(treeId, document);

            //if (tree.BuildResult.ValidationErrors.Count() == 0)
            //{
            //    tree.LogTree();
            //}

            return tree;
        }


        private void OnTreeAttachmentPointsStoreChange(object sender, StoreEventArgs storeEventArgs)
        {
            if (!storeEventArgs.DataEventsFired)
            {
                InitializeTreeAttachmentPoints();
            }
        }


        private void OnUpdateTreeAttachmentPoints(object sender, DataEventArgs dataEventArgs)
        {
            InitializeTreeAttachmentPoints();
        }



        #region Attachment points


        public bool AddPersistedAttachmentPoint(string treeId, Type interfaceType, object keyValue, ElementAttachingProviderPosition position = ElementAttachingProviderPosition.Top)
        {
            var attachmentPoint = DataFacade.BuildNew<IDataItemTreeAttachmentPoint>();
            attachmentPoint.Id = Guid.NewGuid();
            attachmentPoint.TreeId = treeId;
            attachmentPoint.Position = position.ToString();
            attachmentPoint.InterfaceType = TypeManager.SerializeType(interfaceType);
            attachmentPoint.KeyValue = ValueTypeConverter.Convert<string>(keyValue);

            bool added = false;
            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                bool exist =
                    (from d in DataFacade.GetData<IDataItemTreeAttachmentPoint>()
                     where d.InterfaceType == attachmentPoint.InterfaceType && d.KeyValue == attachmentPoint.KeyValue && d.TreeId == treeId
                     select d).Any();

                if (!exist)
                {
                    DataFacade.AddNew<IDataItemTreeAttachmentPoint>(attachmentPoint);
                    added = true;
                }

                transactionScope.Complete();
            }

            return added;
        }



        public bool RemovePersistedAttachmentPoint(string treeId, Type interfaceType, object keyValue)
        {
            string serializedInterfaceType = TypeManager.SerializeType(interfaceType);
            string serializedKeyValue = ValueTypeConverter.Convert<string>(keyValue);

            bool removed = false;
            using (var transactionScope = TransactionsFacade.CreateNewScope())
            {
                IEnumerable<IDataItemTreeAttachmentPoint> dataItemTreeAttachmentPoints =
                    (from d in DataFacade.GetData<IDataItemTreeAttachmentPoint>()
                     where d.InterfaceType == serializedInterfaceType && d.KeyValue == serializedKeyValue && d.TreeId == treeId
                     select d).Evaluate();

                if (dataItemTreeAttachmentPoints.Any())
                {
                    DataFacade.Delete<IDataItemTreeAttachmentPoint>(dataItemTreeAttachmentPoints);
                    removed = true;
                }

                transactionScope.Complete();
            }

            return removed;
        }

        /// <summary>
        /// This will add a attachment point until the system flushes.
        /// This can be used by element provider implementors to attach trees to their exising trees.
        /// </summary>
        /// <param name="treeId"></param>
        /// <param name="entityToken"></param>
        /// <param name="position"></param>
        public bool AddCustomAttachmentPoint(string treeId, EntityToken entityToken, ElementAttachingProviderPosition position = ElementAttachingProviderPosition.Top)
        {
            Tree tree = GetTree(treeId);
            if (tree == null) return false;

            var customAttachmentPoint = new CustomAttachmentPoint(entityToken, position);
            tree.AttachmentPoints.Add(customAttachmentPoint);

            List<IAttachmentPoint> attachmentPoints;
            using (_resourceLocker.Locker)
            {
                if (_resourceLocker.Resources.PersistentAttachmentPoints.TryGetValue(treeId, out attachmentPoints) == false)
                {
                    attachmentPoints = new List<IAttachmentPoint>();
                    _resourceLocker.Resources.PersistentAttachmentPoints.Add(treeId, attachmentPoints);
                }
            }

            attachmentPoints.Add(customAttachmentPoint);

            return true;
        }



        private void ClearAttachmentPoints<T>()
            where T : IAttachmentPoint
        {
            using (_resourceLocker.ReadLocker)
            {
                foreach (Tree tree in _resourceLocker.Resources.Trees.Values)
                {
                    tree.ClearAttachmentPoints<T>();
                }
            }
        }



        private void InitializeTreeAttachmentPoints()
        {
            lock (_reloadAttachmentPointsSyncRoot)
            {
                ClearAttachmentPoints<DynamicDataItemAttachmentPoint>();

                IEnumerable<IDataItemTreeAttachmentPoint> attachmentPoints = DataFacade.GetData<IDataItemTreeAttachmentPoint>().Evaluate();

                foreach (IDataItemTreeAttachmentPoint attachmentPoint in attachmentPoints)
                {
                    Tree tree = GetTree(attachmentPoint.TreeId);
                    if (tree == null)
                    {
                        string treePath = Path.Combine(TreeDefinitionsFolder, attachmentPoint.TreeId);
                        if (!C1File.Exists(treePath)) // This ensures that invalid, but existing trees does not remove these attachment points
                        {
                            if (DataFacade.WillDeleteSucceed(attachmentPoint))
                            {
                                Log.LogWarning("TreeFacade", "A data item attachment points is referring a non existing tree '{0}' and is deleted", attachmentPoint.TreeId);

                                // Preventing events so this method won't call itself recursively
                                DataFacade.Delete(attachmentPoint, true, CascadeDeleteType.Allow);
                            }
                        }

                        continue;
                    }

                    Type interfaceType = TypeManager.GetType(attachmentPoint.InterfaceType);
                    object keyValue = ValueTypeConverter.Convert(attachmentPoint.KeyValue, interfaceType.GetKeyProperties()[0].PropertyType);

                    var position = (ElementAttachingProviderPosition)Enum.Parse(typeof(ElementAttachingProviderPosition), attachmentPoint.Position);

                    var dataItemTreeAttachmentPoint = new DynamicDataItemAttachmentPoint
                    {
                        InterfaceType = interfaceType,
                        KeyValue = keyValue,
                        Position = position
                    };

                    // Log.LogVerbose("TreeFacade", string.Format("Tree with id '{0}' is dynamically attached to the data type '{1}' with key value of '{2}'", attachmentPoint.TreeId, interfaceType, keyValue));

                    tree.AttachmentPoints.Add(dataItemTreeAttachmentPoint);

                    DataEventSystemFacade.SubscribeToDataDeleted(interfaceType, OnDataItemDeleted, false);
                }


                using (_resourceLocker.ReadLocker)
                {
                    foreach (var kvp in _resourceLocker.Resources.PersistentAttachmentPoints)
                    {
                        Tree tree = GetTree(kvp.Key);
                        if (tree == null) continue;

                        tree.AttachmentPoints.AddRange(kvp.Value);
                    }
                }
            }
        }



        private static void OnDataItemDeleted(object sender, DataEventArgs dataEventArgs)
        {
            Type interfaceType = dataEventArgs.Data.DataSourceId.InterfaceType;

            if (typeof(IPublishControlled).IsAssignableFrom(interfaceType) &&
                !dataEventArgs.Data.DataSourceId.DataScopeIdentifier.Equals(DataScopeIdentifier.Administrated))
            {
                return; // Only remove attachment point if its the admin version of a publishable data item that have been delete
            }

            if (typeof(ILocalizedControlled).IsAssignableFrom(interfaceType) &&
                DataFacade.ExistsInAnyLocale(interfaceType, dataEventArgs.Data.DataSourceId.LocaleScope))
            {
                return; // Data exists in other locales, so do not remove this attachment point
            }

            PropertyInfo propertyInfo = interfaceType.GetKeyProperties()[0];
            string keyValue = ValueTypeConverter.Convert<string>(propertyInfo.GetValue(dataEventArgs.Data, null));

            IEnumerable<IDataItemTreeAttachmentPoint> attachmentPoints =
                from d in DataFacade.GetData<IDataItemTreeAttachmentPoint>()
                where
                    d.InterfaceType == TypeManager.SerializeType(interfaceType) &&
                    d.KeyValue == keyValue
                select d;

            DataFacade.Delete<IDataItemTreeAttachmentPoint>(attachmentPoints);
        }

        private static string TreeDefinitionsFolder
        {
            get { return PathUtil.Resolve(GlobalSettingsFacade.TreeDefinitionsDirectory); }
        }

        #endregion



        private sealed class Resources
        {
            public Dictionary<string, Tree> Trees { get; set; }
            public Dictionary<string, List<IAttachmentPoint>> PersistentAttachmentPoints { get; set; }
            public C1FileSystemWatcher FileSystemWatcher { get; set; }
            public DateTime LastFileChange { get; set; }
            public EntityToken RootEntityToken { get; set; }

            public static void Initialize(Resources resources)
            {
                resources.Trees = new Dictionary<string, Tree>();
                resources.PersistentAttachmentPoints = new Dictionary<string, List<IAttachmentPoint>>();
            }
        }
    }
}
