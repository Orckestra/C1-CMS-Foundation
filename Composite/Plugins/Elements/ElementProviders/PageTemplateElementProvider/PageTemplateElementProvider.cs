using System;
using System.Collections.Generic;
using System.Linq;
using Composite.Core.PageTemplates;
using Composite.Core.PageTemplates.Foundation;
using Composite.Core.PageTemplates.Foundation.PluginFacade;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.C1Console.Security;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [ConfigurationElementType(typeof(PageTemplateElementProviderData))]
    internal sealed class PageTemplateElementProvider : IHooklessElementProvider, IAuxiliarySecurityAncestorProvider
    {
        private ElementProviderContext _context;

        public static ResourceHandle RootOpen { get { return GetIconHandle("page-template-root-open"); } }
        public static ResourceHandle RootClosed { get { return GetIconHandle("page-template-root-closed"); } }
        public static ResourceHandle DesignTemplate { get { return GetIconHandle("page-template-template"); } }

        public static ResourceHandle AddTemplate { get { return GetIconHandle("page-template-add"); } }
        public static ResourceHandle EditTemplate { get { return GetIconHandle("page-template-edit"); } }
        public static ResourceHandle DeleteTemplate { get { return GetIconHandle("page-template-delete"); } }

        
        internal static ResourceHandle GetIconHandle(string name)
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

            bool hasChildren = DataFacade.GetData<IPageTemplate>().Any();

            element.VisualData = new ElementVisualizedData
                         {
                             Label = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "PageTemplateElementProvider.RootLabel"),
                             ToolTip = SR.GetString("Composite.Plugins.PageTemplateElementProvider", "PageTemplateElementProvider.RootLabelToolTip"),
                             HasChildren = hasChildren,
                             Icon = PageTemplateElementProvider.RootClosed,
                             OpenedIcon = PageTemplateElementProvider.RootOpen
                         };

            foreach(var pageTemplateProviderName in PageTemplateProviderRegistry.ProviderNames)
            {
                var provider = PageTemplateProviderPluginFacade.GetProvider(pageTemplateProviderName);

                Verify.IsNotNull(provider, "Failed to get provider by name '{0}'", pageTemplateProviderName);

                IEnumerable<ElementAction> actions = provider.GetRootActions();

                element.AddAction(actions);
            }

            return new [] { element };
        }



        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken searchToken)
        {
            if ((entityToken is PageTemplateRootEntityToken) == false) return new Element[] { };

            var pageTemplates = PageTemplateFacade.GetPageTemplates();

            if (searchToken.IsValidKeyword())
            {
                string keyword = searchToken.Keyword.ToLowerInvariant();

                pageTemplates = pageTemplates
                    .Where(t => t.Title.IndexOf(keyword, StringComparison.InvariantCultureIgnoreCase) > 0
                                || t.Description.IndexOf(keyword, StringComparison.InvariantCultureIgnoreCase) > 0);
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



        private IEnumerable<Element> GetElements(IEnumerable<PageTemplate> pageTemplates)
        {
            List<Element> elements = new List<Element>();

            foreach (PageTemplate pageTemplate in pageTemplates)
            {
                var entityToken = pageTemplate.GetEntityToken();

                Element element = new Element(_context.CreateElementHandle(entityToken));

                element.VisualData = new ElementVisualizedData
                                     {
                                         Label = pageTemplate.Title,
                                         ToolTip = pageTemplate.Title,
                                         HasChildren = false,
                                         Icon = PageTemplateElementProvider.DesignTemplate,
                                     };

                IEnumerable<ElementAction> actions = pageTemplate.GetActions();

                element.AddAction(actions);

                elements.Add(element);
            }

            return elements;
        }   
    }





    [Assembler(typeof(NonConfigurableHooklessElementProviderAssembler))]
    internal sealed class PageTemplateElementProviderData : HooklessElementProviderData
    {
    }
}
