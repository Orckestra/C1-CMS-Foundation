using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Composite.C1Console.Workflow;
using Composite.Core.IO;
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
using Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;

using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;
using FileElementProvider = Composite.Plugins.Elements.ElementProviders.WebsiteFileElementProvider.WebsiteFileElementProvider;

namespace Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider
{
    [ConfigurationElementType(typeof(PageTemplateElementProviderData))]
    internal sealed class PageTemplateElementProvider : IHooklessElementProvider, IAuxiliarySecurityAncestorProvider
    {
        private ElementProviderContext _context;

        public static ResourceHandle RootOpen { get { return GetIconHandle("page-template-root-open"); } }
        public static ResourceHandle RootClosed { get { return GetIconHandle("page-template-root-closed"); } }
        public static ResourceHandle DesignTemplate { get { return GetIconHandle("page-template-template"); } }
        public static ResourceHandle TemplateWithError { get { return GetIconHandle("error"); } }

        public static ResourceHandle AddTemplate { get { return GetIconHandle("page-template-add"); } }
        public static ResourceHandle EditTemplate { get { return GetIconHandle("page-template-edit"); } }
        public static ResourceHandle DeleteTemplate { get { return GetIconHandle("page-template-delete"); } }

        public static ResourceHandle FolderIcon { get { return GetIconHandle("folder"); } }

        private static readonly ActionGroup EditCodeFileActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        
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

            bool hasChildren = PageTemplateFacade.GetPageTemplates().Any();

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
            if (entityToken is SharedCodeFolderEntityToken)
            {
                return GetSharedCodeElements(searchToken);
            }

            if ((entityToken is PageTemplateRootEntityToken) == false) return new Element[] { };

            bool sharedFilesExist = PageTemplateFacade.GetSharedFiles().Any();

            IEnumerable<Element> result = sharedFilesExist 
                ? new [] { GetSharedCodeElement()}
                : new Element[0];

            var pageTemplates = PageTemplateFacade.GetPageTemplates();

            if (searchToken.IsValidKeyword())
            {
                string keyword = searchToken.Keyword.ToLowerInvariant();

                pageTemplates = pageTemplates
                    .Where(t => t.Title.IndexOf(keyword, StringComparison.InvariantCultureIgnoreCase) > 0
                                || t.Description.IndexOf(keyword, StringComparison.InvariantCultureIgnoreCase) > 0);
            }

            pageTemplates = pageTemplates.OrderBy(template => template.Title).ToList();

            return result.Concat( GetElements(pageTemplates) );
        }

        private IEnumerable<Element> GetSharedCodeElements(SearchToken searchToken)
        {
            var result = new List<Element>();

            foreach(SharedFile sharedFile in PageTemplateFacade.GetSharedFiles())
            {
                string relativeFilePath = sharedFile.RelativeFilePath;

                string fullPath = relativeFilePath.StartsWith("~") ? PathUtil.Resolve(relativeFilePath) : relativeFilePath;
                var websiteFile = new WebsiteFile(fullPath);

                Element element = new Element(_context.CreateElementHandle(new SharedCodeFileEntityToken(relativeFilePath)))
                {
                    VisualData = new ElementVisualizedData()
                    {
                        Label = websiteFile.FileName,
                        ToolTip = websiteFile.FileName,
                        HasChildren = false,
                        Icon = FileElementProvider.WebsiteFileIcon(websiteFile.MimeType),
                        OpenedIcon = FileElementProvider.WebsiteFileIcon(websiteFile.MimeType)
                    }
                };

                element.PropertyBag.Add("Uri", PathUtil.GetWebsitePath(websiteFile.FullPath));
                element.PropertyBag.Add("ElementType", websiteFile.MimeType);

                // Adding "Edit" action for text-editable files
                if (sharedFile.DefaultEditAction && MimeTypeInfo.IsTextFile(websiteFile.MimeType))
                {
                    element.AddWorkflowAction(
                        "Composite.Plugins.Elements.ElementProviders.PageTemplateElementProvider.EditSharedCodeFileWorkflow",
                        new[] {PermissionType.Edit},
                        new ActionVisualizedData
                            {
                                Label = GetResourceString("EditSharedCodeFile.Label"),
                                ToolTip = GetResourceString("EditSharedCodeFile.ToolTip"),
                                Icon = CommonCommandIcons.Edit,
                                Disabled = websiteFile.IsReadOnly,
                                ActionLocation = new ActionLocation
                                                        {
                                                            ActionType = ActionType.Edit,
                                                            IsInFolder = false,
                                                            IsInToolbar = true,
                                                            ActionGroup = EditCodeFileActionGroup
                                                        }
                            });
                }

                var customActions = sharedFile.GetActions();
                foreach(var action in customActions)
                {
                    element.AddAction(action);
                }
                
                result.Add(element);
            }

            return result;
        } 

        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            Dictionary<EntityToken, IEnumerable<EntityToken>> result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                DataEntityToken dataEntityToken = entityToken as DataEntityToken;

                Type type = dataEntityToken.InterfaceType;
                if (type != typeof(IXmlPageTemplate)) continue;

                PageTemplateRootEntityToken newEntityToken = new PageTemplateRootEntityToken();

                result.Add(entityToken, new EntityToken[] { newEntityToken });
            }

            return result;
        }


        private Element GetSharedCodeElement()
        {
            Element element = new Element(_context.CreateElementHandle(new SharedCodeFolderEntityToken()));

            element.VisualData = new ElementVisualizedData
            {
                Label = GetResourceString("PageTemplateElementProvider.SharedCodeFolder.Title"),
                ToolTip = GetResourceString("PageTemplateElementProvider.SharedCodeFolder.ToolTip"),
                HasChildren = true,
                Icon = FolderIcon,
            };

            return element;
        }

        private static string GetResourceString(string key)
        {
            return SR.GetString("Composite.Plugins.PageTemplateElementProvider", key);
        }

        private IEnumerable<Element> GetElements(IEnumerable<PageTemplateDescriptor> pageTemplates)
        {
            List<Element> elements = new List<Element>();

            foreach (PageTemplateDescriptor pageTemplate in pageTemplates)
            {
                var entityToken = pageTemplate.GetEntityToken();

                Element element = new Element(_context.CreateElementHandle(entityToken));

                element.VisualData = new ElementVisualizedData
                                     {
                                         Label = pageTemplate.Title,
                                         ToolTip = pageTemplate.Title,
                                         HasChildren = false,
                                         Icon = pageTemplate.IsValid ? DesignTemplate : TemplateWithError,
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
