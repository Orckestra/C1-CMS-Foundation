using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Composite.Elements.Plugins.ElementProvider;
using Composite.Security;
using Composite.Elements;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Composite.ResourceSystem;
using Composite.ResourceSystem.Icons;
using System.IO;
using Composite.GlobalSettings;
using Composite.IO;
using Composite.Workflow;
using Composite.Trees;


namespace Composite.StandardPlugins.Elements.ElementProviders.DeveloperApplicationProvider
{
    [ConfigurationElementType(typeof(NonConfigurableHooklessElementProvider))]
    internal sealed class DeveloperApplicationProvider : IHooklessElementProvider, IAuxiliarySecurityAncestorProvider
    {
        private ElementProviderContext _context;


        private static ResourceHandle TreeDefinitionsRootIcon = GetIconHandle("developerapplication-treedefinitionroot");
        private static ResourceHandle TreeDefinitionIcon = GetIconHandle("developerapplication-treedefinition");
        private static ResourceHandle TreeDefinitionIconAdd = GetIconHandle("developerapplication-treedefinition-add");
        private static ResourceHandle TreeDefinitionIconEdit = GetIconHandle("developerapplication-treedefinition-edit");
        private static ResourceHandle TreeDefinitionIconDelete = GetIconHandle("developerapplication-treedefinition-delete");


        public DeveloperApplicationProvider()
        {
            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DeveloperApplicationProviderEntityToken>(this);

            foreach (string treeDefinitionFilename in this.TreeDefinitionFilenames)
            {
                string filename = Path.GetFileName(treeDefinitionFilename);

                DeveloperApplicationProviderEntityToken entityToken = new DeveloperApplicationProviderEntityToken(DeveloperApplicationProviderEntityToken.TreeDefinitionId, filename);

                TreeFacade.AddCustomAttachmentPoint(filename, entityToken);
            }
        }



        public ElementProviderContext Context
        {
            set { _context = value; }
        }



        public IEnumerable<Element> GetRoots(SearchToken seachToken)
        {
            Element treeRootFolderElement = new Element(_context.CreateElementHandle(new DeveloperApplicationProviderEntityToken(DeveloperApplicationProviderEntityToken.TreeRootFolderId)))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = "Tree Definitions",
                    ToolTip = "Tree Definitions",
                    HasChildren = this.TreeDefinitionFilenames.Count() > 0,
                    Icon = TreeDefinitionsRootIcon
                }
            };

            treeRootFolderElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Workflows.Trees.Workflows.AddTreeDefinitionWorkflow"), PermissionTypePredefined.Add)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Trees", "TreeAddTreeDefinitionWorkflow.AddNew.Label"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Trees", "TreeAddTreeDefinitionWorkflow.AddNew.ToolTip"),
                    Icon = TreeDefinitionIconAdd,
                    Disabled = false,
                    ActionLocation = ActionLocation.AddPrimaryActionLocation
                }
            });



            yield return treeRootFolderElement;
        }



        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken seachToken)
        {
            if (entityToken.Id == DeveloperApplicationProviderEntityToken.TreeRootFolderId)
            {
                foreach (string treeDefinitionFilename in this.TreeDefinitionFilenames)
                {
                    string filename = Path.GetFileName(treeDefinitionFilename);

                    Element treeDefintionElement = new Element(_context.CreateElementHandle(
                        new DeveloperApplicationProviderEntityToken(DeveloperApplicationProviderEntityToken.TreeDefinitionId, filename)))
                    {
                        VisualData = new ElementVisualizedData
                        {
                            Label = filename,
                            ToolTip = filename,
                            Icon = TreeDefinitionIcon
                        }
                    };

                    treeDefintionElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Workflows.Trees.Workflows.DeleteTreeDefinitionWorkflow"), PermissionTypePredefined.Delete)))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.Trees", "TreeDeleteTreeDefinitionWorkflow.Delete.Label"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Trees", "TreeDeleteTreeDefinitionWorkflow.Delete.ToolTip"),
                            Icon = TreeDefinitionIconDelete,
                            Disabled = false,
                            ActionLocation = ActionLocation.DeletePrimaryActionLocation
                        }
                    });

                    treeDefintionElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Workflows.Trees.Workflows.EditTreeDefinitionWorkflow"), PermissionTypePredefined.Edit)))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.Trees", "TreeDeleteTreeDefinitionWorkflow.Edit.Label"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Trees", "TreeDeleteTreeDefinitionWorkflow.Edit.ToolTip"),
                            Icon = TreeDefinitionIconEdit,
                            Disabled = false,
                            ActionLocation = ActionLocation.EditPrimaryActionLocation
                        }
                    });

                    yield return treeDefintionElement;
                }

                yield break;
            }
            else if (entityToken.Id == DeveloperApplicationProviderEntityToken.TreeDefinitionId)
            {
                //DeveloperApplicationProviderEntityToken castedEntityToken = (DeveloperApplicationProviderEntityToken)entityToken;

                //foreach (Element element in TreeFacade.GetElementsByTreeId(castedEntityToken.Filename, entityToken, new Dictionary<string, string>()))
                //{
                //    yield return element;
                //}
            }

            yield break;
        }



        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            Dictionary<EntityToken, IEnumerable<EntityToken>> result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                if (entityToken is DeveloperApplicationProviderEntityToken)
                {
                    switch (entityToken.Id)
                    {
                        case DeveloperApplicationProviderEntityToken.TreeDefinitionId:
                            result.Add(entityToken, new EntityToken[] { new DeveloperApplicationProviderEntityToken(DeveloperApplicationProviderEntityToken.TreeRootFolderId) });
                            break;
                    }
                }
            }

            return result;
        }



        private IEnumerable<string> TreeDefinitionFilenames
        {
            get
            {
                return Directory.GetFiles(PathUtil.Resolve(GlobalSettingsFacade.TreeDefinitionsDirectory), "*.xml");
            }
        }


        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }
}
