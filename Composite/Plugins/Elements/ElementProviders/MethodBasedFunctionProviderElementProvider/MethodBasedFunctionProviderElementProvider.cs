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


namespace Composite.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider
{
    [ConfigurationElementType(typeof(MethodBasedFunctionProviderElementProviderData))]
    internal sealed class MethodBasedFunctionProviderElementProvider : BaseFunctionProviderElementProvider.BaseFunctionProviderElementProvider
    {
        private string _providerName;

        public static ResourceHandle AddIcon { get { return GetIconHandle("method-based-function-add"); } }
        public static ResourceHandle EditIcon { get { return GetIconHandle("method-based-function-edit"); } }
        public static ResourceHandle DeleteIcon { get { return GetIconHandle("method-based-function-delete"); } }

        private static ResourceHandle GetIconHandle(string name)
        {
            return new ResourceHandle(BuildInIconProviderName.ProviderName, name);
        }


        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        public MethodBasedFunctionProviderElementProvider(string providerName)
        {
            _providerName = providerName;
        }


        protected override string RootFolderLabel
        {
            get
            {
                return StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "RootFolderLabel");
            }
        }


        protected override string RootFolderToolTip
        {
            get
            {
                return StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "RootFolderToolTip");
            }
        }



        protected override IEnumerable<IFunctionTreeBuilderLeafInfo> OnGetFunctionInfos(SearchToken searchToken)
        {
            if (searchToken.IsValidKeyword() == true)
            {
                string keyword = searchToken.Keyword.ToLowerInvariant();

                return
                    from function in DataFacade.GetData<IMethodBasedFunctionInfo>()
                    where function.MethodName.ToLowerInvariant().Contains(keyword) ||
                          function.Namespace.ToLowerInvariant().Contains(keyword) ||
                          function.UserMethodName.ToLowerInvariant().Contains(keyword)
                    select (IFunctionTreeBuilderLeafInfo)new MethodFunctionTreeBuilderLeafInfo(function);
            }
            else
            {
                IEnumerable<IFunctionTreeBuilderLeafInfo> methodBasedFunctions =
                    from function in DataFacade.GetData<IMethodBasedFunctionInfo>()
                    select (IFunctionTreeBuilderLeafInfo)new MethodFunctionTreeBuilderLeafInfo(function);

                IEnumerable<IFunctionTreeBuilderLeafInfo> editableMethodBasedFunctions =
                     from function in DataFacade.GetData<IInlineFunction>()
                     select (IFunctionTreeBuilderLeafInfo)new EditableMethodFunctionTreeBuilderLeafInfo(function);

                return methodBasedFunctions.Concat(editableMethodBasedFunctions).OrderBy(f => f.Name);
            }
        }



        protected override IEnumerable<Type> OnGetEntityTokenTypes()
        {
            yield return typeof(DataEntityToken);
        }



        protected override IFunctionTreeBuilderLeafInfo OnIsEntityOwner(EntityToken entityToken)
        {
            DataEntityToken dataEntityToken = entityToken as DataEntityToken;
            if (dataEntityToken == null) return null;

            if (dataEntityToken.InterfaceType == typeof(IMethodBasedFunctionInfo))
            {
                return new MethodFunctionTreeBuilderLeafInfo(dataEntityToken.Data as IMethodBasedFunctionInfo);
            }
            else if (dataEntityToken.InterfaceType == typeof(IInlineFunction))
            {
                return new EditableMethodFunctionTreeBuilderLeafInfo(dataEntityToken.Data as IInlineFunction);
            }

            return null;
        }



        protected override IEnumerable<ElementAction> OnGetFolderActions()
        {
            return new ElementAction[]
                {
                    new ElementAction(new ActionHandle(
                        new WorkflowActionToken(
                            WorkflowFacade.GetWorkflowType("Composite.Workflows.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider.AddInlineFunctionWorkflow"),
                            new PermissionType[] { PermissionType.Add }
                        ))) {
                         VisualData = new ActionVisualizedData { 
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "Create"), 
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "CreateToolTip"),
                            Icon = MethodBasedFunctionProviderElementProvider.AddIcon,
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
                            WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider.AddNewMethodBasedFunctionWorkflow"),
                            new PermissionType[] { PermissionType.Add }
                        ))) {
                         VisualData = new ActionVisualizedData { 
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "Add"), 
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "AddToolTip"),
                            Icon = MethodBasedFunctionProviderElementProvider.AddIcon,
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


        protected override IEnumerable<ElementAction> OnGetFunctionActions(IFunctionTreeBuilderLeafInfo function)
        {
            if (function is MethodFunctionTreeBuilderLeafInfo)
            {
                return new ElementAction[] 
                {
                    new ElementAction(new ActionHandle(
                        new WorkflowActionToken(
                            WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider.EditMethodBasedFunctionWorkflow"),
                            new PermissionType[] { PermissionType.Edit }
                        ))) {
                        VisualData = new ActionVisualizedData { 
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "Edit"), 
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "EditToolTip"),
                            Icon = MethodBasedFunctionProviderElementProvider.EditIcon,
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
                            WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider.DeleteMethodBasedFunctionWorkflow"),
                            new PermissionType[] { PermissionType.Delete }
                        ) { 
                            Payload = GetContext().ProviderName
                        })) {
                        VisualData = new ActionVisualizedData { 
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "Delete"), 
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "DeleteToolTip"),
                            Icon = MethodBasedFunctionProviderElementProvider.DeleteIcon,
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
            else if (function is EditableMethodFunctionTreeBuilderLeafInfo)
            {
                return new ElementAction[] 
                {
                    new ElementAction(new ActionHandle(
                        new WorkflowActionToken(
                            WorkflowFacade.GetWorkflowType("Composite.Workflows.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider.EditInlineFunctionWorkflow"),
                            new PermissionType[] { PermissionType.Edit }
                        ))) {
                        VisualData = new ActionVisualizedData { 
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "Edit"), 
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "EditToolTip"),
                            Icon = MethodBasedFunctionProviderElementProvider.EditIcon,
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
                            WorkflowFacade.GetWorkflowType("Composite.Workflows.Plugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider.DeleteInlineFunctionWorkflow"),
                            new PermissionType[] { PermissionType.Delete }
                        ) { 
                            Payload = GetContext().ProviderName
                        })) {
                        VisualData = new ActionVisualizedData { 
                            Label = StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "Delete"), 
                            ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.MethodBasedFunctionProviderElementProvider", "DeleteToolTip"),
                            Icon = MethodBasedFunctionProviderElementProvider.DeleteIcon,
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

            throw new NotImplementedException();
        }



        private sealed class MethodFunctionTreeBuilderLeafInfo : IFunctionTreeBuilderLeafInfo
        {
            private IMethodBasedFunctionInfo _function;

            public MethodFunctionTreeBuilderLeafInfo(IMethodBasedFunctionInfo function)
            {
                _function = function;
            }

            public string Name
            {
                get { return _function.UserMethodName; }
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



        private sealed class EditableMethodFunctionTreeBuilderLeafInfo : IFunctionTreeBuilderLeafInfo
        {
            private IInlineFunction _function;

            public EditableMethodFunctionTreeBuilderLeafInfo(IInlineFunction function)
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




    [Assembler(typeof(MethodBasedFunctionProviderElementProviderAssembler))]
    internal sealed class MethodBasedFunctionProviderElementProviderData : HooklessElementProviderData
    {
        private const string _methodBasedFunctionProviderNameProperty = "methodBasedFunctionProviderName";
        [ConfigurationProperty(_methodBasedFunctionProviderNameProperty, IsRequired = true)]
        public string MethodBasedFunctionProviderName
        {
            get { return (string)base[_methodBasedFunctionProviderNameProperty]; }
            set { base[_methodBasedFunctionProviderNameProperty] = value; }
        }
    }




    internal sealed class MethodBasedFunctionProviderElementProviderAssembler : IAssembler<IHooklessElementProvider, HooklessElementProviderData>
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
        public IHooklessElementProvider Assemble(IBuilderContext context, HooklessElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
            MethodBasedFunctionProviderElementProviderData data = (MethodBasedFunctionProviderElementProviderData)objectConfiguration;

            return new MethodBasedFunctionProviderElementProvider(data.MethodBasedFunctionProviderName);
        }
    }
}
