using System.Collections.Generic;
using System.IO;
using System.Linq;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.C1Console.Security;
using Composite.C1Console.Trees;
using Composite.C1Console.Workflow;
using Composite.Core.Configuration;
using Composite.Core.IO;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;


namespace Composite.Plugins.Elements.ElementProviders.PageTemplateFeatureElementProvider
{
    [ConfigurationElementType(typeof(NonConfigurableHooklessElementProvider))]
    internal sealed class PageTemplateFeatureElementProvider : IHooklessElementProvider, IAuxiliarySecurityAncestorProvider
    {
        private ElementProviderContext _context;


        private static readonly ResourceHandle PageTemplateFeatureRootIcon = GetIconHandle("page-template-feature-root-closed");
        private static readonly ResourceHandle PageTemplateFeatureRootIconOpen = GetIconHandle("page-template-feature-root-open");
        private static readonly ResourceHandle PageTemplateFeatureIcon = GetIconHandle("page-template-feature-template");
        private static readonly ResourceHandle PageTemplateFeatureIconAdd = GetIconHandle("page-template-feature-add");
        private static readonly ResourceHandle PageTemplateFeatureIconEdit = GetIconHandle("page-template-feature-edit");
        private static readonly ResourceHandle PageTemplateFeatureIconDelete = GetIconHandle("page-template-feature-delete");

        private static readonly ActionGroup PrimaryFolderToolsActionGroup = new ActionGroup("FolderTools", ActionGroupPriority.PrimaryMedium);


        public PageTemplateFeatureElementProvider()
        {
            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<PageTemplateFeatureEntityToken>(this);

            foreach (string pageTemplateFeratureFilename in this.PageTemplateFeatureFilenames)
            {
                string filename = Path.GetFileName(pageTemplateFeratureFilename);

                PageTemplateFeatureEntityToken entityToken = new PageTemplateFeatureEntityToken(PageTemplateFeatureEntityToken.FeatureId, filename);

                TreeFacade.AddCustomAttachmentPoint(filename, entityToken);
            }
        }



        public ElementProviderContext Context
        {
            set { _context = value; }
        }



        public IEnumerable<Element> GetRoots(SearchToken seachToken)
        {
            Element rootFolderElement = new Element(_context.CreateElementHandle(new PageTemplateFeatureEntityToken(PageTemplateFeatureEntityToken.RootFolderId)))
            {
                VisualData = new ElementVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "ElementProvider.RootLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "ElementProvider.RootToolTip"),
                    HasChildren = this.PageTemplateFeatureFilenames.Any(),
                    Icon = PageTemplateFeatureRootIcon,
                    OpenedIcon = PageTemplateFeatureRootIconOpen
                }
            };

            rootFolderElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateFeatureElementProvider.AddPageTemplateFeatureWorkflow"), PermissionTypePredefined.Add)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "ElementProvider.AddTemplateFeature"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "ElementProvider.AddTemplateFeatureToolTip"),
                    Icon = PageTemplateFeatureIconAdd,
                    Disabled = false,
                    ActionLocation = ActionLocation.AddPrimaryActionLocation
                }
            });

            yield return rootFolderElement;
        }



        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken seachToken)
        {
            if (entityToken.Id == PageTemplateFeatureEntityToken.RootFolderId)
            {
                foreach (string pageTemplateFeratureFilename in this.PageTemplateFeatureFilenames)
                {
                    string filename = Path.GetFileName(pageTemplateFeratureFilename);
                    string featureName = Path.GetFileNameWithoutExtension(filename);

                    bool isHtml = Path.GetExtension(filename) == ".html";

                    Element featureElement = new Element(_context.CreateElementHandle(
                        PageTemplateFeatureEntityToken.BuildFeatureEntityToken(featureName)))
                    {
                        VisualData = new ElementVisualizedData
                        {
                            Label = featureName,
                            ToolTip = filename,
                            Icon = PageTemplateFeatureIcon
                        }
                    };

                    featureElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateFeatureElementProvider.EditPageTemplateFeatureWorkflow"), PermissionTypePredefined.Edit)))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "ElementProvider.EditTemplateFeature"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "ElementProvider.EditTemplateFeatureToolTip"),
                            Icon = PageTemplateFeatureIconEdit,
                            Disabled = false,
                            ActionLocation = ActionLocation.EditPrimaryActionLocation
                        }
                    });

                    featureElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateFeatureElementProvider.DeletePageTemplateFeatureWorkflow"), PermissionTypePredefined.Delete)))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "ElementProvider.DeleteTemplateFeature"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "ElementProvider.DeleteTemplateFeatureToolTip"),
                            Icon = PageTemplateFeatureIconDelete,
                            Disabled = false,
                            ActionLocation = ActionLocation.DeletePrimaryActionLocation
                        }
                    });

                    featureElement.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.PageTemplateFeatureElementProvider.TogglePageTemplateFeatureEditorWorkflow"), PermissionTypePredefined.Edit)))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "ElementProvider.EditVisually"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.PageTemplateFeatureElementProvider", "ElementProvider.EditVisuallyToolTip"),
                            Icon = PageTemplateFeatureIconEdit,
                            Disabled = false,
                            ActionCheckedStatus = isHtml ? ActionCheckedStatus.Checked : ActionCheckedStatus.Unchecked,
                            ActionLocation = new ActionLocation
                            {
                                ActionType = ActionType.Other,
                                IsInFolder = false,
                                IsInToolbar = false,
                                ActionGroup = PrimaryFolderToolsActionGroup
                            },

                        }
                    });

                    yield return featureElement;
                }

                yield break;
            }

            yield break;
        }



        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            Dictionary<EntityToken, IEnumerable<EntityToken>> result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                if (entityToken is PageTemplateFeatureEntityToken)
                {
                    switch (entityToken.Id)
                    {
                        case PageTemplateFeatureEntityToken.FeatureId:
                            result.Add(entityToken, new EntityToken[] { new PageTemplateFeatureEntityToken(PageTemplateFeatureEntityToken.RootFolderId) });
                            break;
                    }
                }
            }

            return result;
        }



        private IEnumerable<string> PageTemplateFeatureFilenames
        {
            get
            {
                string featureDir = PathUtil.Resolve(GlobalSettingsFacade.PageTemplateFeaturesDirectory);

                if (C1Directory.Exists(featureDir))
                {
                    var htmlFiles = C1Directory.GetFiles(featureDir, "*.html");
                    var xmlFiles = C1Directory.GetFiles(featureDir, "*.xml");

                    foreach (var fileName in htmlFiles.Concat(xmlFiles).OrderBy(f => f))
                    {
                        yield return fileName;
                    }
                }
                else
                {
                    yield break;
                }
            }
        }



        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }
    }
}
