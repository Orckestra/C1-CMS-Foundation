using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Xml;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.C1Console.Forms.DataServices;
using Composite.C1Console.Forms.Flows;
using Composite.C1Console.Security;
using Composite.C1Console.Workflow;
using Composite.Core.ResourceSystem;
using Composite.Core.ResourceSystem.Icons;
using Composite.Core.Types;
using Composite.Functions;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.Plugins.Elements.ElementProviders.AllFunctionsElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [ConfigurationElementType(typeof(AllFunctionsElementProviderData))]
#pragma warning disable 612
    internal sealed class AllFunctionsElementProvider : BaseFunctionProviderElementProvider.BaseFunctionProviderElementProvider, ICustomSearchElementProvider
#pragma warning restore 612
    {
        private const string FunctionsProviderType = "functions";
        private const string WidgetFunctionsProviderType = "widgetFunctions";

        public static readonly ResourceHandle DocumentFunctionsIcon = GetIconHandle("all-functions-generatedocumentation");
        private static readonly ResourceHandle TestFunctionIcon = GetIconHandle("base-function-function");

        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        private readonly string _providerType;



        public AllFunctionsElementProvider(string providerType)
        {
            _providerType = providerType;

            if ((_providerType != FunctionsProviderType) && (_providerType != WidgetFunctionsProviderType))
            {
                throw new ArgumentException(string.Format("The provider type should be 'functions' or 'widgetFunctions'"), providerType);
            }
        }


        protected override void OnContextSetted()
        {
            string providerName = GetContext().ProviderName;

            if (_providerType == FunctionsProviderType)
            {
                AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider(typeof(StandardFunctionProviderEntityToken), new StandardFunctionAuxiliarySecurityAncestorProvider(providerName));
            }
            else
            {
                AuxiliarySecurityAncestorFacade.AddAuxiliaryAncestorProvider(typeof(StandardWidgetFunctionProviderEntityToken), new StandardFunctionAuxiliarySecurityAncestorProvider(providerName));
            }
        }


        protected override string RootFolderLabel
        {
            get
            {
                if (_providerType == FunctionsProviderType)
                {
                    return StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", "Plugins.AllFunctionsElementProvider.FunctionRootFolderLabel");
                }
                else if (_providerType == WidgetFunctionsProviderType)
                {
                    return StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", "Plugins.AllFunctionsElementProvider.WidgetFunctionRootFolderLabel");
                }
                else
                {
                    throw new NotImplementedException();
                }
            }
        }


        protected override string RootFolderToolTip
        {
            get
            {
                if (_providerType == FunctionsProviderType)
                {
                    return StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", "Plugins.AllFunctionsElementProvider.FunctionRootFolderToolTip");
                }
                if (_providerType == WidgetFunctionsProviderType)
                {
                    return StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", "Plugins.AllFunctionsElementProvider.WidgetFunctionRootFolderToolTip");
                }
                throw new NotImplementedException();
            }
        }


        protected override IEnumerable<IFunctionTreeBuilderLeafInfo> OnGetFunctionInfos(SearchToken searchToken)
        {
            var castedSearchToken = (AllFunctionsElementProviderSearchToken)searchToken;

            string loweredKeyword = null;
            if (searchToken != null)
            {
                loweredKeyword = (searchToken.Keyword ?? string.Empty).ToLowerInvariant();
            }

            foreach (string metaFunctionName in this.MetaFunctionNames.OrderBy(f => f))
            {
                IMetaFunction metaFunction = this.GetMetaFunction(metaFunctionName);

                if (castedSearchToken == null)
                {
                    yield return
                        new AllFunctionsTreeBuilderLeafInfo
                        {
                            Name = metaFunction.Name,
                            Namespace = metaFunction.Namespace,
                            EntityToken = metaFunction.EntityToken
                        };
                    continue;
                }

                if (!string.IsNullOrEmpty(loweredKeyword))
                {
                    if (!metaFunction.CompositeName().ToLowerInvariant().Contains(loweredKeyword))
                    {
                        continue;
                    }
                }

                bool shouldBeIncluded = true;

                if (!string.IsNullOrEmpty(castedSearchToken.AcceptableTypes) &&
                    castedSearchToken.AcceptableTypes != "__None__")
                {
                    shouldBeIncluded = false;

                    foreach (string typeKey in castedSearchToken.AcceptableTypes.Split(';'))
                    {
                        Type type = TypeManager.GetType(typeKey);

                        // MAW: Negate that string is an IEnumerable - thats just plain stupid.
                        if (type == typeof(IEnumerable) && metaFunction.ReturnType == typeof(String))
                        {
                            continue;
                        }

                        if (type.IsAssignableFrom(metaFunction.ReturnType)
                            || (metaFunction is IDowncastableFunction
                                && (metaFunction as IDowncastableFunction).ReturnValueIsDowncastable
                                && metaFunction.ReturnType.IsAssignableFrom(type)))
                        {
                            shouldBeIncluded = true;
                            break;
                        }


                        if (metaFunction is IWidgetFunction
                                && metaFunction.ReturnType.IsAssignableFrom(type))
                        {
                            shouldBeIncluded = true;
                            break;
                        }
                    }
                }

                if (shouldBeIncluded)
                {
                    yield return
                        new AllFunctionsTreeBuilderLeafInfo
                        {
                            Name = metaFunction.Name,
                            Namespace = metaFunction.Namespace,
                            EntityToken = metaFunction.EntityToken
                        };
                }
            }
        }




        protected override IEnumerable<ElementAction> OnGetFunctionActions(IFunctionTreeBuilderLeafInfo function)
        {
            string functionName = function.Namespace + "." + function.Name;

            IMetaFunction metaFunction = GetMetaFunction(functionName);

            bool isWidget = !(metaFunction is IFunction);

            if (!isWidget)
            {
                yield return CreateFunctionTesterAction(functionName);
            }

            yield return new ElementAction(new ActionHandle(new FunctionInfoActionToken(functionName, isWidget)))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", "AllFunctionsElementProvider.ViewFunctionInformation"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", "AllFunctionsElementProvider.ViewFunctionInformationTooltip"),
                    Disabled = false,
                    Icon = CommonElementIcons.Search,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        ActionGroup = PrimaryActionGroup,
                        IsInFolder = false,
                        IsInToolbar = true
                    }
                }
            };
        }



        protected override IEnumerable<ElementAction> OnGetFolderActions()
        {
            yield return new ElementAction(new ActionHandle(new DocumentFunctionsActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", "AllFunctionsElementProvider.GenerateDocumentation"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", "AllFunctionsElementProvider.GenerateDocumentationTooltip"),
                    Icon = AllFunctionsElementProvider.DocumentFunctionsIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryActionGroup
                    }
                }
            };
        }



        private static ElementAction CreateFunctionTesterAction(string functionName = "")
        {
            WorkflowActionToken actionToken = new WorkflowActionToken(WorkflowFacade.GetWorkflowType("Composite.Workflows.Plugins.Elements.ElementProviders.AllFunctionsElementProvider.FunctionTesterWorkflow"))
            {
                Payload = functionName
            };

            return new ElementAction(new ActionHandle(actionToken))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", "AllFunctionsElementProvider.FunctionTester.Label"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.Plugins.AllFunctionsElementProvider", "AllFunctionsElementProvider.FunctionTester.ToolTip"),
                    Icon = TestFunctionIcon,
                    Disabled = false,
                    ActionLocation = new ActionLocation
                    {
                        ActionType = ActionType.Other,
                        IsInFolder = false,
                        IsInToolbar = true,
                        ActionGroup = PrimaryActionGroup
                    }
                }
            };
        }



        protected override IEnumerable<Type> OnGetEntityTokenTypes()
        {
            yield break;
        }



        protected override IFunctionTreeBuilderLeafInfo OnIsEntityOwner(EntityToken entityToken)
        {
            return null;
        }



		//protected override TreeLockBehavior OnGetTreeLockBehavior()
		//{
		//	return TreeLockBehavior.None;
		//}



        private sealed class AllFunctionsTreeBuilderLeafInfo : IFunctionTreeBuilderLeafInfo
        {
            public EntityToken EntityToken
            {
                get;
                internal set;
            }

            public string Name
            {
                get;
                internal set;
            }

            public string Namespace
            {
                get;
                internal set;
            }
        }



        public SearchToken GetNewSearchToken(EntityToken entityToken)
        {
            return new AllFunctionsElementProviderSearchToken();
        }



        public XmlReader GetSearchFormDefinition(EntityToken entityToken)
        {
            IFormMarkupProvider markupProvider = new FormDefinitionFileMarkupProvider("/Administrative/AllFunctionsElementProviderSearchForm.xml");

            return markupProvider.GetReader();
        }



        public Dictionary<string, object> GetSearchFormBindings(EntityToken entityToken)
        {
            Dictionary<string, object> bindings = new Dictionary<string, object>();

            Dictionary<string, string> types = new Dictionary<string, string>();

            types.Add("__None__", "None");

            foreach (Type type in this.MetaFunctionSupprtedTypes)
            {
                types.Add(TypeManager.SerializeType(type), type.Name);
            }

            bindings.Add("Types", types);

            return bindings;
        }



        private IEnumerable<string> MetaFunctionNames
        {
            get
            {
                switch (_providerType)
                {
                    case FunctionsProviderType:
                        return FunctionFacade.FunctionNames;

                    case WidgetFunctionsProviderType:
                        return FunctionFacade.WidgetFunctionNames;

                    default:
                        throw new NotImplementedException();
                }
            }
        }



        private IMetaFunction GetMetaFunction(string metaFunctionName)
        {
            switch (_providerType)
            {
                case FunctionsProviderType:
                    return FunctionFacade.GetFunction(metaFunctionName);

                case WidgetFunctionsProviderType:
                    return FunctionFacade.GetWidgetFunction(metaFunctionName);

                default:
                    throw new NotImplementedException();
            }
        }



        private IEnumerable<Type> MetaFunctionSupprtedTypes
        {
            get
            {
                switch (_providerType)
                {
                    case FunctionsProviderType:
                        return FunctionFacade.FunctionSupportedTypes;

                    case WidgetFunctionsProviderType:
                        return FunctionFacade.WidgetFunctionSupportedTypes;

                    default:
                        throw new NotImplementedException();
                }
            }
        }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class AllFunctionsElementProviderSearchToken : SearchToken
    {
        /// <exclude />
        public static AllFunctionsElementProviderSearchToken Build(Type[] functionReturnValueAccetableTypes)
        {
            var token = new AllFunctionsElementProviderSearchToken();

            var sb = new StringBuilder();
            for (int i = 0; i < functionReturnValueAccetableTypes.Length; i++)
            {
                Type type = functionReturnValueAccetableTypes[i];
                if (i > 0)
                {
                    sb.Append(";");
                }
                sb.Append(TypeManager.SerializeType(type));
            }

            token.AcceptableTypes = sb.ToString();
            return token;
        }

        /// <exclude />
        public string AcceptableTypes { get; set; }
    }




    [Assembler(typeof(AllFunctionsElementProviderAssembler))]
#pragma warning disable 612
    internal sealed class AllFunctionsElementProviderData : HooklessElementProviderData
#pragma warning restore 612
    {
        private const string _providerTypePropertyName = "providerType";
        [ConfigurationProperty(_providerTypePropertyName, IsRequired = true)]
        public string ProviderType
        {
            get { return (string)base[_providerTypePropertyName]; }
            set { base[_providerTypePropertyName] = value; }
        }
    }



#pragma warning disable 612
    internal sealed class AllFunctionsElementProviderAssembler : IAssembler<IHooklessElementProvider, HooklessElementProviderData>
    {
        public IHooklessElementProvider Assemble(IBuilderContext context, HooklessElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
#pragma warning restore 612
            AllFunctionsElementProviderData data = (AllFunctionsElementProviderData)objectConfiguration;

            AllFunctionsElementProvider provider = new AllFunctionsElementProvider(data.ProviderType);

            return provider;
        }
    }
}
