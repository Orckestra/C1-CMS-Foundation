using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using Composite.Core.Collections;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.Core.Extensions;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.C1Console.Security;
using Composite.C1Console.Security.Cryptography;
using Composite.C1Console.Workflow;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Elements.ElementProviders.SqlFunctionElementProvider
{
    [ConfigurationElementType(typeof(SqlFunctionElementProviderData))]
    internal sealed class SqlFunctionElementProvider : IHooklessElementProvider, IDataExchangingElementProvider, IAuxiliarySecurityAncestorProvider
    {
        private ElementProviderContext _context;

        private ResourceHandle FolderIcon { get { return CommonElementIcons.Folder; } }
        private ResourceHandle OpenFolderIcon { get { return CommonElementIcons.FolderOpen; } }
        private ResourceHandle EmptyFolderIcon { get { return CommonElementIcons.Folder; } }
        private ResourceHandle XmlQueryInfoIcon { get { return CommonElementIcons.MimeTextXml; } }

        public static ResourceHandle Function { get { return GetIconHandle("sql-based-function"); } }
        public static ResourceHandle Connection { get { return GetIconHandle("sql-based-connection"); } }
        public static ResourceHandle AddConnection { get { return GetIconHandle("sql-based-connection-add"); } }
        public static ResourceHandle DeleteConnection { get { return GetIconHandle("sql-based-connection-delete"); } }
        public static ResourceHandle EditConnection { get { return GetIconHandle("sql-based-connection-edit"); } }
        public static ResourceHandle AddFunction { get { return GetIconHandle("sql-based-function-add"); } }
        public static ResourceHandle EditFunction { get { return GetIconHandle("sql-based-function-edit"); } }
        public static ResourceHandle DeleteFunction { get { return GetIconHandle("sql-based-function-delete"); } }

        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }



        public SqlFunctionElementProvider()
        {            
            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DataEntityToken>(this);
        }



        public ElementProviderContext Context
        {
            set { _context = value; }
        }



        #region Element methods
        public IEnumerable<Element> GetRoots(SearchToken seachToken)
        {
            var connections = DataFacade.GetData<ISqlConnection>();

            List<Element> elements = new List<Element>();
            bool hasChildren = connections.Any();

            Element element = new Element(_context.CreateElementHandle(new SqlFunctionProviderRootEntityToken(_context.ProviderName, _context.ProviderName)))
            {
                VisualData = new ElementVisualizedData()
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.RootLabel"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.RootLabelToolTip"),
                        HasChildren = hasChildren,
                        Icon = hasChildren ? this.FolderIcon : this.EmptyFolderIcon,
                        OpenedIcon = OpenFolderIcon
                    }
            };

            element.AddAction(
                new ElementAction(new ActionHandle(
                    new WorkflowActionToken(
                        WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.SqlFunctionElementProvider.AddNewSqlConnectionWorkflow"),
                        new PermissionType[] { PermissionType.Add }
                    )))
                {
                    VisualData = new ActionVisualizedData
                                 {
                                     Label = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.AddConnection"),
                                     ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.AddConnectionToolTip"),
                                     Icon = AddConnection,
                                     Disabled = false,
                                     ActionLocation = new ActionLocation
                                      {
                                          ActionType = ActionType.Add,
                                          IsInFolder = false,
                                          IsInToolbar = true,
                                          ActionGroup = PrimaryActionGroup
                                      }
                                 }
                });

            elements.Add(element);

            return elements;

        }



        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken searchToken)
        {
            if ((entityToken is SqlFunctionProviderRootEntityToken))
            {
                return GetConnectionElements();
            }
            else
            {
                return GetFunctionElements(entityToken, searchToken);
            }
        }



        private List<Element> GetConnectionElements()
        {
            var connections = DataFacade.GetData<ISqlConnection>();
            var queries = DataFacade.GetData<ISqlFunctionInfo>();

            List<Element> elements = new List<Element>();
            foreach (ISqlConnection connection in connections)
            {
                int queryCount = queries.Where(x => x.ConnectionId == connection.Id).Count();
                bool hasChildren = queryCount > 0;

                Element element = new Element(_context.CreateElementHandle(connection.GetDataEntityToken()))
                {
                    VisualData = new ElementVisualizedData()
                    {
                        Label = connection.Name,
                        ToolTip = connection.EncryptedConnectionString.Decrypt(),
                        HasChildren = hasChildren,
                        Icon = SqlFunctionElementProvider.Connection,
                        OpenedIcon = SqlFunctionElementProvider.Connection
                    }
                };
                elements.Add(element);

                element.AddAction(
                    new ElementAction(new ActionHandle(
                        new WorkflowActionToken(
                            WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.SqlFunctionElementProvider.EditSqlConnectionWorkflow"),
                            new PermissionType[] { PermissionType.Edit }
                        )))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.EditConnection"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.EditConnectionToolTip"),
                            Icon = EditConnection,
                            Disabled = false,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Edit,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    });

                element.AddAction(
                    new ElementAction(new ActionHandle(
                        new WorkflowActionToken(
                            WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.SqlFunctionElementProvider.DeleteSqlConnectionWorkflow"),
                            new PermissionType[] { PermissionType.Delete }
                        )))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.DeleteConnection"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.DeleteConnectionToolTip"),
                            Icon = DeleteConnection,
                            Disabled = false,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Delete,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    });

                element.AddAction(
                    new ElementAction(new ActionHandle(
                        new WorkflowActionToken(
                            WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.SqlFunctionElementProvider.AddNewSqlFunctionProviderWorkflow"),
                            new PermissionType[] { PermissionType.Add }
                        )))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.AddQuery"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.AddQueryToolTip"),
                            Icon = AddConnection,
                            Disabled = false,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Add,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    });

            }

            return elements;
        }



        private List<Element> GetFunctionElements(EntityToken entityToken, SearchToken searchToken)
        {
            Guid connectionId;
            string namespaceName;
            if ((entityToken is DataEntityToken))
            {
                DataEntityToken dataEntityToken = (DataEntityToken)entityToken;

                if (dataEntityToken.Data is ISqlConnection)
                {
                    connectionId = ((ISqlConnection)dataEntityToken.Data).Id;
                    namespaceName = "";
                }
                else
                {
                    // stuff has been deleted and we are refreshed on a dead function folder
                    return new List<Element>();
                }
            }
            else if ((entityToken is SqlFunctionProviderFolderEntityToken))
            {
                SqlFunctionProviderFolderEntityToken sqlFunctionProviderFolderEntityToken = (SqlFunctionProviderFolderEntityToken)entityToken;

                connectionId = new Guid(sqlFunctionProviderFolderEntityToken.ConnectionId);
                namespaceName = sqlFunctionProviderFolderEntityToken.Id;
            }
            else
            {
                throw new NotImplementedException();
            }


            IEnumerable<ISqlFunctionInfo> sqlFunctionInfoes;
            if (searchToken.IsValidKeyword() == false)
            {
                sqlFunctionInfoes =
                    from item in DataFacade.GetData<ISqlFunctionInfo>()
                    where item.ConnectionId == connectionId
                    select item;

            }
            else
            {
                string keyword = searchToken.Keyword.ToLower();

                sqlFunctionInfoes =
                    from item in DataFacade.GetData<ISqlFunctionInfo>()
                    where item.ConnectionId == connectionId &&
                          (((item.Name != null) && (item.Name.ToLower().Contains(keyword))) ||
                           ((item.Namespace != null) && (item.Namespace.ToLower().Contains(keyword))) ||
                           ((item.Command != null) && (item.Command.ToLower().Contains(keyword))))
                    select item;
            }

            NamespaceTreeBuilder builder = new NamespaceTreeBuilder(sqlFunctionInfoes.Select(q => (INamespaceTreeBuilderLeafInfo)new SqlNamespaceTreeBuilderLeafInfo(q)));

            NamespaceTreeBuilderFolder folderNode;
            if (namespaceName == "")
            {
                folderNode = builder.RootFolder;
            }
            else
            {
                folderNode = builder.GetFolder(namespaceName);
            }

            List<Element> result = new List<Element>();

            if (folderNode != null)
            {
                if (folderNode.SubFolders != null)
                {
                    foreach (NamespaceTreeBuilderFolder node in folderNode.SubFolders)
                    {
                        Element element = CreateFolderElement(node, connectionId.ToString());

                        result.Add(element);
                    }
                }

                if (folderNode.Leafs != null)
                {
                    foreach (INamespaceTreeBuilderLeafInfo leafInfo in folderNode.Leafs)
                    {
                        Element element = CreateXmlFunctionInfoElement(leafInfo, connectionId.ToString());

                        result.Add(element);
                    }
                }
            }

            return result;
        }



        private Element CreateFolderElement(NamespaceTreeBuilderFolder node, string connectionId)
        {
            bool hasChildren = (node.SubFolders.Count != 0) || (node.Leafs.Count != 0);

            var element = new Element(_context.CreateElementHandle(new SqlFunctionProviderFolderEntityToken(StringExtensionMethods.CreateNamespace(node.Namespace, node.Name, '.'), _context.ProviderName, connectionId)))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = node.Name,
                    ToolTip = node.Name,
                    HasChildren = (node.SubFolders.Count != 0) || (node.Leafs.Count != 0),
                    Icon = hasChildren ? this.FolderIcon : this.EmptyFolderIcon,
                    OpenedIcon = this.OpenFolderIcon
                }
            };

            element.AddAction(new ElementAction(new ActionHandle(
                new WorkflowActionToken(
                    WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.SqlFunctionElementProvider.AddNewSqlFunctionProviderWorkflow"),
                    new PermissionType[] { PermissionType.Add }
                )))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.AddQuery"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.AddQueryToolTip"),
                    Icon = SqlFunctionElementProvider.AddFunction,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Edit,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryActionGroup
                    }
                }
            });

            return element;
        }



        private Element CreateXmlFunctionInfoElement(INamespaceTreeBuilderLeafInfo leafInfo, string connectionId)
        {
            var element = new Element(_context.CreateElementHandle(((SqlNamespaceTreeBuilderLeafInfo)leafInfo).EntityToken))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = leafInfo.Name,
                    ToolTip = leafInfo.Name,
                    HasChildren = false,
                    Icon = SqlFunctionElementProvider.Function
                }
            };

            element.AddAction(
                new ElementAction(new ActionHandle(
                    new WorkflowActionToken(
                        WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.SqlFunctionElementProvider.EditSqlFunctionProviderWorkflow"),
                        new PermissionType[] { PermissionType.Edit }
                    )))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.EditQuery"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.EditQueryToolTip"),
                        Icon = SqlFunctionElementProvider.EditFunction,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Edit,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryActionGroup
                        }
                    }
                });

            element.AddAction(
                new ElementAction(new ActionHandle(
                    new WorkflowActionToken(
                        WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.SqlFunctionElementProvider.DeleteSqlFunctionProviderWorkflow"),
                        new PermissionType[] { PermissionType.Delete }
                    )))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.DeleteQuery"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.SqlFunction", "SqlFunctionElementProvider.DeleteQueryToolTip"),
                        Icon = SqlFunctionElementProvider.DeleteFunction,
                        Disabled = false,
                        ActionLocation = new ActionLocation
                        {
                            ActionType = ActionType.Edit,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryActionGroup
                        }
                    }
                });

            return element;
        }
        #endregion



        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            var result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                var dataEntityToken = entityToken as DataEntityToken;

                if (dataEntityToken.InterfaceType == typeof(ISqlFunctionInfo))
                {
                    ISqlFunctionInfo sqlFunctionInfo = dataEntityToken.Data as ISqlFunctionInfo;
                    
                    var parentEntityToken = new SqlFunctionProviderFolderEntityToken(sqlFunctionInfo.Namespace, _context.ProviderName, sqlFunctionInfo.ConnectionId.ToString());

                    result.Add(entityToken, new EntityToken[] { parentEntityToken });
                }
                else if (dataEntityToken.InterfaceType == typeof(ISqlConnection))
                {
                    var parentEntityToken = new SqlFunctionProviderRootEntityToken(_context.ProviderName, _context.ProviderName);

                    result.Add(entityToken, new EntityToken[] { parentEntityToken });
                }
            }

            return result;
        }
   


        public object GetData(string name)
        {
            Guid connectionId = new Guid(name);

            IEnumerable<ISqlFunctionInfo> sqlFunctionInfoes =
                    from functionInfo in DataFacade.GetData<ISqlFunctionInfo>()
                    where functionInfo.ConnectionId == connectionId
                    select functionInfo;

            return new NamespaceTreeBuilder(sqlFunctionInfoes.Select(q => (INamespaceTreeBuilderLeafInfo)new SqlNamespaceTreeBuilderLeafInfo(q)));
        }




        [DebuggerDisplay("Name = {Name}, Namespace = {Namespace}")]
        private sealed class SqlNamespaceTreeBuilderLeafInfo : INamespaceTreeBuilderLeafInfo
        {
            readonly ISqlFunctionInfo _sqlFunctionInfo;

            public SqlNamespaceTreeBuilderLeafInfo(ISqlFunctionInfo sqlFunctionInfo)
            {
                _sqlFunctionInfo = sqlFunctionInfo;
            }

            public string Name
            {
                get { return _sqlFunctionInfo.Name; }
            }

            public string Namespace
            {
                get { return _sqlFunctionInfo.Namespace; }
            }


            public EntityToken EntityToken
            {
                get { return _sqlFunctionInfo.GetDataEntityToken(); }
            }
        }
    }



    [Assembler(typeof(SqlFunctionElementProviderAssembler))]
    internal sealed class SqlFunctionElementProviderData : HooklessElementProviderData
    {
    }



    internal sealed class SqlFunctionElementProviderAssembler : IAssembler<IHooklessElementProvider, HooklessElementProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IHooklessElementProvider Assemble(IBuilderContext context, HooklessElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            return new SqlFunctionElementProvider();
        }
    }
}
