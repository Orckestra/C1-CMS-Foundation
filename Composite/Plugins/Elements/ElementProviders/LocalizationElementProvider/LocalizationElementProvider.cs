using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Composite.Core.Types;
using Composite.Core.Localization;


namespace Composite.Plugins.Elements.ElementProviders.LocalizationElementProvider
{
    [ConfigurationElementType(typeof(NonConfigurableHooklessElementProvider))]
    internal sealed class LocalizationElementProvider : IHooklessElementProvider, IAuxiliarySecurityAncestorProvider
    {
        private ElementProviderContext _context;


        private static ResourceHandle RootClosedIcon = GetIconHandle("localization-element-closed-root");
        private static ResourceHandle RootOpenedIcon = GetIconHandle("localization-element-opened-root");
        private static ResourceHandle LocaleItemIcon = GetIconHandle("localization-element-localeitem");
        private static ResourceHandle DefaultLocaleItemIcon = GetIconHandle("localization-element-defaultlocaleitem");
        private static ResourceHandle AddSystemLocaleIcon = GetIconHandle("localization-addsystemlocale");
        private static ResourceHandle EditSystemLocaleIcon = GetIconHandle("localization-editsystemlocale");                
        private static ResourceHandle SetAsDefaultIcon = GetIconHandle("localization-setasdefault");
        private static ResourceHandle RemoveSystemLocaleIcon = GetIconHandle("localization-removesystemlocale");

        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);



        public LocalizationElementProvider()
        {
            AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider<DataEntityToken>(this);
        }



        public ElementProviderContext Context
        {
            set { _context = value; }
        }



        public IEnumerable<Element> GetRoots(SearchToken seachToken)
        {
            Element element = new Element(_context.CreateElementHandle(new LocalizationElementProviderRootEntityToken()));
            element.VisualData = new ElementVisualizedData
            {
                Label = StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", "ElementProvider.RootFolderLabel"),
                ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", "ElementProvider.RootFolderToolTip"),
                HasChildren = true,
                Icon = RootClosedIcon,
                OpenedIcon = RootOpenedIcon
            };


            element.AddAction(new ElementAction(new ActionHandle(
                new WorkflowActionToken(
                    WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.LocalizationElementProvider.AddSystemLocaleWorkflow"),
                    new PermissionType[] { PermissionType.Administrate }
                )))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", "AddSystemLocaleWorkflow.AddElementActionLabel"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", "AddSystemLocaleWorkflow.AddElementActionToolTip"),
                    Icon = AddSystemLocaleIcon,
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

            yield return element;
        }



        public IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken seachToken)
        {
            if ((entityToken is LocalizationElementProviderRootEntityToken) == false) throw new InvalidOperationException();

            IEnumerable<ISystemActiveLocale> locales = DataFacade.GetData<ISystemActiveLocale>().ToList();

            List<Element> elements = new List<Element>();

            foreach (ISystemActiveLocale locale in locales)
            {
                bool isDefault = LocalizationFacade.IsDefaultLocale(locale.CultureName);

                ResourceHandle iconHandle = LocaleItemIcon;
                if (isDefault)
                {
                    //lable = string.Format("{0} ({1})", lable, StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", "ElementProvider.DefaultLabel"));
                    iconHandle = DefaultLocaleItemIcon;
                }

                Element element = new Element(_context.CreateElementHandle(locale.GetDataEntityToken()));
                element.VisualData = new ElementVisualizedData
                {
                    Label = DataLocalizationFacade.GetCultureTitle(new CultureInfo(locale.CultureName)),
                    ToolTip = DataLocalizationFacade.GetCultureTitle(new CultureInfo(locale.CultureName)),
                    HasChildren = false,
                    Icon = iconHandle
                };


                element.AddAction(new ElementAction(new ActionHandle(
                    new WorkflowActionToken(
                        WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.LocalizationElementProvider.EditSystemLocaleWorkflow"),
                        new PermissionType[] { PermissionType.Administrate }
                    )))
                {
                    VisualData = new ActionVisualizedData
                    {
                        Label = StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", "EditSystemLocaleWorkflow.EditElementActionLabel"),
                        ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", "EditSystemLocaleWorkflow.EditElementActionToolTip"),
                        Icon = EditSystemLocaleIcon,
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


                if (isDefault == false)
                {
                    element.AddAction(new ElementAction(new ActionHandle(
                        new WorkflowActionToken(
                            WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.LocalizationElementProvider.DefineDefaultActiveLocaleWorkflow"),
                            new PermissionType[] { PermissionType.Administrate }
                        )))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", "DefineDefaultActiveLocaleWorkflow.ElementActionLabel"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", "DefineDefaultActiveLocaleWorkflow.ElementActionToolTip"),
                            Icon = SetAsDefaultIcon,
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


                    element.AddAction(new ElementAction(new ActionHandle(
                        new WorkflowActionToken(
                            WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.LocalizationElementProvider.RemoveSystemLocaleWorkflow"),
                            new PermissionType[] { PermissionType.Administrate }
                        )))
                    {
                        VisualData = new ActionVisualizedData
                        {
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", "RemoveSystemLocaleWorkflow.RemoveElementActionLabel"),
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.LocalizationElementProvider", "RemoveSystemLocaleWorkflow.RemoveElementActionToolTip"),
                            Icon = RemoveSystemLocaleIcon,
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
                }

                elements.Add(element);
            }

            return elements.OrderBy(f => f.VisualData.Label);
        }



        public Dictionary<EntityToken, IEnumerable<EntityToken>> GetParents(IEnumerable<EntityToken> entityTokens)
        {
            Dictionary<EntityToken, IEnumerable<EntityToken>> result = new Dictionary<EntityToken, IEnumerable<EntityToken>>();

            foreach (EntityToken entityToken in entityTokens)
            {
                DataEntityToken dataEntityToken = entityToken as DataEntityToken;

                Type type = dataEntityToken.InterfaceType;
                if (type != typeof(ISystemActiveLocale)) continue;

                LocalizationElementProviderRootEntityToken newEntityToken = new LocalizationElementProviderRootEntityToken();

                result.Add(entityToken, new EntityToken[] { newEntityToken });
            }

            return result;
        }        



        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }        
    }
}
