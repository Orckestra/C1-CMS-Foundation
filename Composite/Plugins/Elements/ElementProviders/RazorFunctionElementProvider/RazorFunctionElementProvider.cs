using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Composite.AspNet.Security;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.ResourceSystem;
using Composite.Functions;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;
using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.Elements.ElementProviders.RazorFunctionElementProvider
{
    [ConfigurationElementType(typeof(RazorFunctionProviderElementProviderData))]
    internal class RazorFunctionElementProvider: BaseFunctionProviderElementProvider.BaseFunctionProviderElementProvider
    {
        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        protected static ResourceHandle AddFunctionIcon { get { return GetIconHandle("razor-function-add"); } }
        protected static ResourceHandle EditFunctionIcon { get { return GetIconHandle("razor-function-edit"); } }
        protected static ResourceHandle DeleteFunctionIcon { get { return GetIconHandle("razor-function-delete"); } }

        private readonly string _functionProviderName;
        private readonly string _rootLabel;

        public RazorFunctionElementProvider(string functionProvider, string rootLabel)
        {
            _functionProviderName = functionProvider;
            _rootLabel = rootLabel;
        }

        public override string FunctionProviderName
        {
            get { return _functionProviderName; }
        }

        protected override IEnumerable<IFunctionTreeBuilderLeafInfo> OnGetFunctionInfos(SearchToken searchToken)
        {
            var functions = FunctionFacade.GetFunctionsByProvider(_functionProviderName);

            if(searchToken != null && !string.IsNullOrEmpty(searchToken.Keyword))
            {
                string keyword = searchToken.Keyword.ToLowerInvariant();

                functions = functions.Where(f => f.Namespace.IndexOf(keyword, StringComparison.OrdinalIgnoreCase) > 0
                                                 || f.Name.IndexOf(keyword, StringComparison.OrdinalIgnoreCase) > 0);
            }

            return functions.Select(f => new RazorFunctionTreeBuilderLeafInfo(f));
        }

        protected override IEnumerable<Type> OnGetEntityTokenTypes()
        {
            return new [] { typeof(FileBasedFunctionEntityToken)};
        }

        protected override IFunctionTreeBuilderLeafInfo OnIsEntityOwner(EntityToken entityToken)
        {
            if(entityToken is FileBasedFunctionEntityToken && entityToken.Source == _functionProviderName)
            {
                string functionFullName = entityToken.Id;

                IFunction function = FunctionFacade.GetFunctionsByProvider(_functionProviderName)
                        .FirstOrDefault(func => func.Namespace + "." + func.Name == functionFullName);

                return function == null ? null : new RazorFunctionTreeBuilderLeafInfo(function);
            }

            return null;
        }



        /// <exclude />
        protected override IEnumerable<ElementAction> OnGetFolderActions()
        {
            Type workflow = WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.RazorFunctionProviderElementProvider.AddNewRazorFunctionWorkflow");

            return new[] { new ElementAction(new ActionHandle(new WorkflowActionToken(workflow, new [] { PermissionType.Add }))) {
                         VisualData = new ActionVisualizedData { 
                            Label = GetText("AddNewRazorFunction.Label"), 
                            ToolTip = GetText("AddNewRazorFunction.ToolTip"),
                            Icon = AddFunctionIcon,
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
            var editWorkflow = WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.RazorFunctionProviderElementProvider.EditRazorFunctionWorkflow");
            var deleteWorkflow = WorkflowFacade.GetWorkflowType("Composite.Plugins.Elements.ElementProviders.RazorFunctionProviderElementProvider.DeleteRazorFunctionWorkflow");

            return new [] 
                {
                    new ElementAction(new ActionHandle(
                        new WorkflowActionToken(
                            editWorkflow, new [] { PermissionType.Edit }
                        ))) {
                        VisualData = new ActionVisualizedData { 
                            Label = GetText("EditRazorFunction.Label"), 
                            ToolTip = GetText("EditRazorFunction.ToolTip"),
                            Icon = EditFunctionIcon,
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
                            deleteWorkflow, new [] { PermissionType.Delete }
                        ){Payload = GetContext().ProviderName})) {
                        VisualData = new ActionVisualizedData { 
                            Label = GetText("DeleteRazorFunction.Label"), 
                            ToolTip = GetText("DeleteRazorFunction.ToolTip"),
                            Icon = DeleteFunctionIcon,
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


        private sealed class RazorFunctionTreeBuilderLeafInfo : IFunctionTreeBuilderLeafInfo
        {
            private readonly IFunction _function;

            public RazorFunctionTreeBuilderLeafInfo(IFunction function)
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
                get { return _function.EntityToken; }
            }
        }

        #region Configuration

        internal sealed class RazorFunctionElementProviderAssembler : IAssembler<IHooklessElementProvider, HooklessElementProviderData>
        {
            [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
            public IHooklessElementProvider Assemble(IBuilderContext context, HooklessElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
            {
                var data = (RazorFunctionProviderElementProviderData)objectConfiguration;

                return new RazorFunctionElementProvider(data.RazorFunctionProviderName, data.Label);
            }
        }

        [Assembler(typeof(RazorFunctionElementProviderAssembler))]
        internal sealed class RazorFunctionProviderElementProviderData : HooklessElementProviderData
        {
            private const string _razorFunctionProviderNameProperty = "razorFunctionProviderName";
            [ConfigurationProperty(_razorFunctionProviderNameProperty, IsRequired = true)]
            public string RazorFunctionProviderName
            {
                get { return (string)base[_razorFunctionProviderNameProperty]; }
                set { base[_razorFunctionProviderNameProperty] = value; }
            }

            private const string _labelProperty = "label";
            [ConfigurationProperty(_labelProperty, DefaultValue = null)]
            public string Label
            {
                get { return (string)base[_labelProperty]; }
                set { base[_labelProperty] = value; }
            }
        }

        #endregion Configuration

        protected override string RootFolderLabel
        {
            get { return !string.IsNullOrEmpty(_rootLabel) 
                        ? StringResourceSystemFacade.ParseString(_rootLabel) 
                        : GetText("RootElement.Label"); }
        }

        protected override string RootFolderToolTip
        {
            get { return GetText("RootElement.ToolTip"); }
        }

        private static string GetText(string stringId)
        {
            return StringResourceSystemFacade.GetString("Composite.Plugins.RazorFunction", stringId);
        }
    }
}
