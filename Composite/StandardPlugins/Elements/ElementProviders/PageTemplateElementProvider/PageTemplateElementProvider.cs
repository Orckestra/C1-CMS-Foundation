using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Elements;
using Composite.Elements.Plugins.ElementProvider;
using Composite.ResourceSystem;
using Composite.ResourceSystem.Icons;
using Composite.Security;
using Composite.Workflow;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.StandardPlugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [ConfigurationElementType(typeof(PageTemplateElementProviderData))]
    public sealed class PageTemplateElementProvider : IHooklessElementProvider, IAuxiliarySecurityAncestorProvider
    {
        private ElementProviderContext _context;

        public static ResourceHandle RootOpen { get { return GetIconHandle("page-template-root-open"); } }
        public static ResourceHandle RootClosed { get { return GetIconHandle("page-template-root-closed"); } }
        public static ResourceHandle DesignTemplate { get { return GetIconHandle("page-template-template"); } }

        public static ResourceHandle AddTemplate { get { return GetIconHandle("page-template-add"); } }
        public static ResourceHandle EditTemplate { get { return GetIconHandle("page-template-edit"); } }
        public static ResourceHandle DeleteTemplate { get { return GetIconHandle("page-template-delete"); } }

        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);
        
        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }

        public PageTemplateElementProvider()
        {
            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DataEntityToken>(this);
        }



        public ElementProviderContext Context
        {
            set { _context = value; }
        }



        public IEnumerable<Element> GetRoots(SearchToken searchToken)
        {
            Element element = new Element(_context.CreateElementHandle(new PageTemplateRootEntityToken()));

            bool hasChildren = DataFacade.GetData<IPageTemplate>().Count() != 0;

            element.VisualData = new ElementVisualizedData
                         {
                             Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTemplateElementProvider", "PageTemplateElementProvider.RootLabel"),
                             ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTemplateElementProvider", "PageTemplateElementProvider.RootLabelToolTip"),
                             HasChildren = hasChildren,
                             Icon = PageTemplateElementProvider.RootClosed,
                             OpenedIcon = PageTemplateElementProvider.RootOpen
                         };

            element.AddAction(new ElementAction(new ActionHandle(
                new WorkflowActionToken(
                    WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.PageTemplateElementProvider.AddNewPageTemplateWorkflow"),
                    new PermissionType[] { PermissionType.Add }
                ))) {
                    VisualData = new ActionVisualizedData {
                        Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTemplateElementProvider", "PageTemplateElementProvider.AddTemplate"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTemplateElementProvider", "PageTemplateElementProvider.AddTemplateToolTip"),
                        Icon = PageTemplateElementProvider.AddTemplate,
                        Disabled = false,
                        ActionLocation = new ActionLocation {
                            ActionType = ActionType.Add,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryActionGroup
                        }
                    }});

            
            return new List<Element> { element };
        }



        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken searchToken)
        {
            if ((entityToken is PageTemplateRootEntityToken) == false) return new Element[] { };


            IEnumerable<IPageTemplate> pageTemplates;
            if (searchToken.IsValidKeyword() == false)
            {
                pageTemplates = DataFacade.GetData<IPageTemplate>();
            }
            else
            {
                string keyword = searchToken.Keyword.ToLower();

                pageTemplates = 
                    from template in DataFacade.GetData<IPageTemplate>().ToList()
                    where ((template.Title != null) && (template.Title.ToLower().Contains(keyword))) ||
                          (IFileServices.GetFile<IPageTemplateFile>(template.PageTemplateFilePath).ReadAllText().Contains(keyword))
                    select template;                    
            }

            pageTemplates = pageTemplates.OrderBy(template => template.Title).ToList();

            return GetElements(pageTemplates);
        }


   
        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            Dictionary<EntityToken, IEnumerable<EntityToken>> result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                DataEntityToken dataEntityToken = entityToken as DataEntityToken;

                Type type = dataEntityToken.InterfaceType;
                if (type != typeof(IPageTemplate)) continue;

                PageTemplateRootEntityToken newEntityToken = new PageTemplateRootEntityToken();

                result.Add(entityToken, new EntityToken[] { newEntityToken });
            }

            return result;
        }



        private List<Element> GetElements(IEnumerable<IPageTemplate> pageTemplates)
        {
            List<Element> elements = new List<Element>();

            foreach (IPageTemplate pageTemplate in pageTemplates)
            {
                Element element = new Element(_context.CreateElementHandle(pageTemplate.GetDataEntityToken()));


                element.VisualData = new ElementVisualizedData
                                     {
                                         Label = pageTemplate.Title,
                                         ToolTip = pageTemplate.Title,
                                         HasChildren = false,
                                         Icon = PageTemplateElementProvider.DesignTemplate,
                                     };

                element.AddAction(new ElementAction(new ActionHandle(
                    new WorkflowActionToken(
                        WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.PageTemplateElementProvider.EditPageTemplateWorkflow"),
                        new PermissionType[] { PermissionType.Edit }
                    )))
                {
                    VisualData = new ActionVisualizedData {
                        Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTemplateElementProvider", "PageTemplateElementProvider.EditTemplate"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTemplateElementProvider", "PageTemplateElementProvider.EditTemplateToolTip"),
                        Icon = PageTemplateElementProvider.EditTemplate,
                        Disabled = false,
                        ActionLocation = new ActionLocation {
                            ActionType = ActionType.Edit,
                            IsInFolder = false,
                            IsInToolbar = true,
                            ActionGroup = PrimaryActionGroup
                        }
                    }});


                element.AddAction(new ElementAction(new ActionHandle(new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.StandardPlugins.Elements.ElementProviders.PageTemplateElementProvider.DeletePageTemplateWorkflow"), new [] { PermissionType.Delete })))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTemplateElementProvider", "PageTemplateElementProvider.DeleteTemplate"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.PageTemplateElementProvider", "PageTemplateElementProvider.DeleteTemplateToolTip"),
                        Icon = DeleteTemplate,
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


                elements.Add(element);
            }

            return elements;
        }   
    }





    [Assembler(typeof(NonConfigurableHooklessElementProviderAssembler))]
    public sealed class PageTemplateElementProviderData : HooklessElementProviderData
    {
    }
}
