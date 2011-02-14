using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.C1Console.Security;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.C1Console.Workflow;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Elements.ElementProviders.XsltBasedFunctionProviderElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [ConfigurationElementType(typeof(XsltBasedFunctionProviderElementProviderData))]
    public sealed class XsltBasedFunctionProviderElementProvider : BaseFunctionProviderElementProvider.BaseFunctionProviderElementProvider
    {
        private string _providerName;

        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        /// <exclude />
        public static ResourceHandle AddFunction { get { return GetIconHandle("xslt-based-function-add"); } }

        /// <exclude />
        public static ResourceHandle EditFunction { get { return GetIconHandle("xslt-based-function-edit"); } }

        /// <exclude />
        public static ResourceHandle DeleteFunction { get { return GetIconHandle("xslt-based-function-delete"); } }


        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }


        /// <exclude />
        public XsltBasedFunctionProviderElementProvider(string providerName)
        {
            _providerName = providerName;
        }


        /// <exclude />
        protected override string RootFolderLabel
        {
            get
            {
                return StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", "Plugins.XsltBasedFunctionProviderElementProvider.RootFolderLabel");
            }
        }


        /// <exclude />
        protected override string RootFolderToolTip
        {
            get
            {
                return StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", "Plugins.XsltBasedFunctionProviderElementProvider.RootFolderToolTip");
            }
        }


        /// <exclude />
        protected override IEnumerable<IFunctionTreeBuilderLeafInfo> OnGetFunctionInfos(SearchToken searchToken)
        {
            if (searchToken.IsValidKeyword() == false)
            {
                return
                    from function in DataFacade.GetData<IXsltFunction>()
                    orderby function.Name
                    select (IFunctionTreeBuilderLeafInfo)new XsltFunctionTreeBuilderLeafInfo(function);
            }
            else
            {
                string keyword = searchToken.Keyword.ToLower();

                return
                    from function in DataFacade.GetData<IXsltFunction>()
                    where function.Name.ToLower().Contains(keyword) ||
                          function.Namespace.ToLower().Contains(keyword)
                    orderby function.Name
                    select (IFunctionTreeBuilderLeafInfo)new XsltFunctionTreeBuilderLeafInfo(function);
            }
        }



        /// <exclude />
        protected override IEnumerable<Type> OnGetEntityTokenTypes()
        {
            yield return typeof(DataEntityToken);
        }



        /// <exclude />
        protected override IFunctionTreeBuilderLeafInfo OnIsEntityOwner(EntityToken entityToken)
        {
            DataEntityToken dataEntityToken = entityToken as DataEntityToken;
            if (dataEntityToken == null) return null;

            if (dataEntityToken.InterfaceType != typeof(IXsltFunction)) return null;

            return new XsltFunctionTreeBuilderLeafInfo(dataEntityToken.Data as IXsltFunction);
        }



        /// <exclude />
        protected override IEnumerable<ElementAction> OnGetFolderActions()
        {
            return new ElementAction[]
                {
                    new ElementAction(new ActionHandle(
                        new WorkflowActionToken(
                            WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.XsltBasedFunctionProviderElementProvider.AddNewXsltFunctionWorkflow"),
                            new PermissionType[] { PermissionType.Add }
                        ))) {
                         VisualData = new ActionVisualizedData { 
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", "XsltBasedFunctionProviderElementProvider.Add"), 
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", "XsltBasedFunctionProviderElementProvider.AddToolTip"),
                            Icon = XsltBasedFunctionProviderElementProvider.AddFunction,
                            Disabled = false, 
                            ActionLocation = new ActionLocation { 
                                ActionType = ActionType.Edit,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    }
                };
        }



        /// <exclude />
        protected override IEnumerable<ElementAction> OnGetFunctionActions(IFunctionTreeBuilderLeafInfo function)
        {
            return new ElementAction[] 
                {
                    new ElementAction(new ActionHandle(
                        new WorkflowActionToken(
                            WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.XsltBasedFunctionProviderElementProvider.EditXsltFunctionWorkflow"),
                            new PermissionType[] { PermissionType.Edit }
                        ))) {
                        VisualData = new ActionVisualizedData { 
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", "XsltBasedFunctionProviderElementProvider.Edit"), 
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", "XsltBasedFunctionProviderElementProvider.EditToolTip"),
                            Icon = XsltBasedFunctionProviderElementProvider.EditFunction,
                            Disabled = false, 
                            ActionLocation = new ActionLocation { 
                                ActionType = ActionType.Edit,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    },

                    new ElementAction(new ActionHandle(
                        new WorkflowActionToken(
                            WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.XsltBasedFunctionProviderElementProvider.DeleteXsltFunctionWorkflow"),
                            new PermissionType[] { PermissionType.Delete }
                        ){Payload = GetContext().ProviderName})) {
                        VisualData = new ActionVisualizedData { 
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", "XsltBasedFunctionProviderElementProvider.Delete"), 
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.XsltBasedFunction", "XsltBasedFunctionProviderElementProvider.DeleteToolTip"),
                            Icon = XsltBasedFunctionProviderElementProvider.DeleteFunction,
                            Disabled = false, 
                            ActionLocation = new ActionLocation { 
                                ActionType = ActionType.Delete,
                                IsInFolder = false,
                                IsInToolbar = true,
                                ActionGroup = PrimaryActionGroup
                            }
                        }
                    }
                };
        }        



        private sealed class XsltFunctionTreeBuilderLeafInfo : IFunctionTreeBuilderLeafInfo
        {
            private IXsltFunction _function;

            public XsltFunctionTreeBuilderLeafInfo(IXsltFunction function)
            {
                _function = function;
            }

            public string Name
            {
                get { return _function.Name; }
            }

            public string Namespace
            {
                get { return _function.Namespace; }
            }

            public EntityToken EntityToken
            {
                get { return _function.GetDataEntityToken(); }
            }
        }
    }




    [Assembler(typeof(XsltBasedFunctionProviderElementProviderAssembler))]
    internal sealed class XsltBasedFunctionProviderElementProviderData : HooklessElementProviderData
    {
        private const string _codeDomQueryResultProviderNameProperty = "XsltBasedFunctionProviderName";
        [ConfigurationProperty(_codeDomQueryResultProviderNameProperty, IsRequired = true)]
        public string XsltBasedFunctionProviderName
        {
            get { return (string)base[_codeDomQueryResultProviderNameProperty]; }
            set { base[_codeDomQueryResultProviderNameProperty] = value; }
        }
    }




    internal sealed class XsltBasedFunctionProviderElementProviderAssembler : IAssembler<IHooklessElementProvider, HooklessElementProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IHooklessElementProvider Assemble(IBuilderContext context, HooklessElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            XsltBasedFunctionProviderElementProviderData data = (XsltBasedFunctionProviderElementProviderData)objectConfiguration;

            return new XsltBasedFunctionProviderElementProvider(data.XsltBasedFunctionProviderName);
        }
    }
}
