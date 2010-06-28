using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Xml;
using Composite.Collections;
using Composite.Elements;
using Composite.Elements.Plugins.ElementProvider;
using Composite.Forms.DataServices;
using Composite.Forms.Flows;
using Composite.Functions;
using Composite.ResourceSystem;
using Composite.ResourceSystem.Icons;
using Composite.Security;
using Composite.StandardPlugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Composite.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;


namespace Composite.StandardPlugins.Elements.ElementProviders.AllFunctionsElementProvider
{
    [ConfigurationElementType(typeof(AllFunctionsElementProviderData))]
#pragma warning disable 612
    internal sealed class AllFunctionsElementProvider : BaseFunctionProviderElementProvider.BaseFunctionProviderElementProvider, ICustomSearchElementProvider, IElementProvider
#pragma warning restore 612
    {
        private List<EntityTokenHook> _currentEntityTokenHooks = null;

        private const string _functionsProviderType = "functions";
        private const string _widgetFunctionsProviderType = "widgetFunctions";

        public static ResourceHandle DocumentFunctionsIcon { get { return GetIconHandle("all-functions-generatedocumentation"); } }
        private static ResourceHandle GetIconHandle(string name) { return new ResourceHandle(BuildInIconProviderName.ProviderName, name); }

        private static readonly ActionGroup PrimaryActionGroup = new ActionGroup(ActionGroupPriority.PrimaryHigh);

        private string _providerType;


        public AllFunctionsElementProvider(string providerType)
        {
            _providerType = providerType;

            if ((_providerType != "functions") && (_providerType != "widgetFunctions"))
            {
                throw new ArgumentException(string.Format("The provider type should be 'functions' or 'widgetFunctions'"), providerType);
            }

            FunctionEventSystemFacade.SubscribeToFunctionsAddedEvent(OnFunctionsAdded);
            FunctionEventSystemFacade.SubscribeToFunctionsRemovedEvent(OnFunctionsRemoved);
            FunctionEventSystemFacade.SubscribeToWidgetFunctionsAddedEvent(OnWidgetFunctionsAdded);
            FunctionEventSystemFacade.SubscribeToWidgetFunctionsRemovedEvent(OnWidgetFunctionsRemoved);
        }



        protected override string RootFolderLabel
        {
            get
            {
                if (_providerType == _functionsProviderType)
                {
                    return StringResourceSystemFacade.GetString("Composite.StandardPlugins.AllFunctionsElementProvider", "StandardPlugins.AllFunctionsElementProvider.FunctionRootFolderLabel");
                }
                else if (_providerType == _widgetFunctionsProviderType)
                {
                    return StringResourceSystemFacade.GetString("Composite.StandardPlugins.AllFunctionsElementProvider", "StandardPlugins.AllFunctionsElementProvider.WidgetFunctionRootFolderLabel");
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
                if (_providerType == _functionsProviderType)
                {
                    return StringResourceSystemFacade.GetString("Composite.StandardPlugins.AllFunctionsElementProvider", "StandardPlugins.AllFunctionsElementProvider.FunctionRootFolderToolTip");
                }
                if (_providerType == _widgetFunctionsProviderType)
                {
                    return StringResourceSystemFacade.GetString("Composite.StandardPlugins.AllFunctionsElementProvider", "StandardPlugins.AllFunctionsElementProvider.WidgetFunctionRootFolderToolTip");
                }
                throw new NotImplementedException();
            }
        }


        protected override IEnumerable<IFunctionTreeBuilderLeafInfo> OnGetFunctionInfos(SearchToken searchToken)
        {
            var castedSearchToken = (AllFunctionsElementProviderSearchToken)searchToken;

            string loweredKeyword = null;
            if(searchToken != null)
            {
                loweredKeyword = (searchToken.Keyword ?? string.Empty).ToLower();
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
                    if (!metaFunction.CompositeName().ToLower().Contains(loweredKeyword))
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



        protected override IEnumerable<Type> OnGetEntityTokenTypes()
        {
            yield break; // See GetHooks() /MRJ
        }



        protected override IFunctionTreeBuilderLeafInfo OnIsEntityOwner(EntityToken entityToken)
        {
            return null; // See GetHooks() /MRJ
        }



        protected override IEnumerable<ElementAction> OnGetFolderActions()
        {
            yield return new ElementAction(new ActionHandle(new DocumentFunctionsActionToken()))
            {
                VisualData = new ActionVisualizedData
                {
                    Label = StringResourceSystemFacade.GetString("Composite.StandardPlugins.AllFunctionsElementProvider", "AllFunctionsElementProvider.GenerateDocumentation"),
                    ToolTip = StringResourceSystemFacade.GetString("Composite.StandardPlugins.AllFunctionsElementProvider", "AllFunctionsElementProvider.GenerateDocumentationTooltip"),
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



        protected override TreeLockBehavior OnGetTreeLockBehavior()
        {
            return TreeLockBehavior.None;
        }



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
                    case _functionsProviderType:
                        return FunctionFacade.FunctionNames;

                    case _widgetFunctionsProviderType:
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
                case _functionsProviderType:
                    return FunctionFacade.GetFunction(metaFunctionName);

                case _widgetFunctionsProviderType:
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
                    case _functionsProviderType:
                        return FunctionFacade.FunctionSupportedTypes;

                    case _widgetFunctionsProviderType:
                        return FunctionFacade.WidgetFunctionSupportedTypes;

                    default:
                        throw new NotImplementedException();
                }
            }
        }

        #region Hook methods
        public List<EntityTokenHook> GetHooks()
        {
            return this.CurrentEntityTokenHooks;
        }



        private List<EntityTokenHook> CurrentEntityTokenHooks
        {
            get
            {
                if (_currentEntityTokenHooks == null)
                {
                    _currentEntityTokenHooks = CreateHooks();
                }

                return _currentEntityTokenHooks;
            }
        }



        private List<EntityTokenHook> CreateHooks()
        {
            NamespaceTreeBuilder builder = new NamespaceTreeBuilder(OnGetFunctionInfos(null).Cast<INamespaceTreeBuilderLeafInfo>());

            List<EntityTokenHook> hooks = new List<EntityTokenHook>();

            FindHooks(builder.RootFolder, hooks);

            return hooks;
        }



        private void FindHooks(NamespaceTreeBuilderFolder node, List<EntityTokenHook> hooks)
        {
            EntityTokenHook hook = new EntityTokenHook(new BaseFunctionFolderElementEntityToken(CreateId(node, this.GetContext().ProviderName)));

            foreach (IFunctionTreeBuilderLeafInfo functionInfo in node.Leafs)
            {
                hook.AddHookie(functionInfo.EntityToken);
            }

            if (node.Leafs.Count > 0)
            {
                hooks.Add(hook);
            }

            foreach (NamespaceTreeBuilderFolder childNode in node.SubFolders)
            {
                FindHooks(childNode, hooks);
            }
        }



        private void UpdateHooks()
        {
            HookingFacade.RemoveHooks(this.CurrentEntityTokenHooks);

            _currentEntityTokenHooks = CreateHooks();

            HookingFacade.AddHooks(this.CurrentEntityTokenHooks);
        }


        private void OnFunctionsAdded(FunctionsAddedEventArgs eventArgs)
        {
            UpdateHooks();
        }

        private void OnFunctionsRemoved(FunctionsRemovedEventArgs eventArgs)
        {
            UpdateHooks();
        }

        private void OnWidgetFunctionsAdded(WidgetFunctionsAddedEventArgs eventArgs)
        {
            UpdateHooks();
        }

        private void OnWidgetFunctionsRemoved(WidgetFunctionsRemovedEventArgs eventArgs)
        {
            UpdateHooks();
        }
        #endregion
    }



    public sealed class AllFunctionsElementProviderSearchToken : SearchToken
    {
        public static AllFunctionsElementProviderSearchToken Build(Type[] functionReturnValueAccetableTypes)
        {
            var token = new AllFunctionsElementProviderSearchToken();

            var sb = new StringBuilder();
            for (int i = 0; i < functionReturnValueAccetableTypes.Length; i++ )
            {
                Type type = functionReturnValueAccetableTypes[i];
                if(i > 0)
                {
                    sb.Append(";");
                }
                sb.Append(TypeManager.SerializeType(type));
            }

            token.AcceptableTypes = sb.ToString();
            return token;
        }

        public string AcceptableTypes { get; set; }
    }




    [Assembler(typeof(AllFunctionsElementProviderAssembler))]
#pragma warning disable 612
    internal sealed class AllFunctionsElementProviderData : ElementProviderData
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
    internal sealed class AllFunctionsElementProviderAssembler : IAssembler<IElementProvider, ElementProviderData>
    {
        public IElementProvider Assemble(IBuilderContext context, ElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
        {
#pragma warning restore 612
            AllFunctionsElementProviderData data = (AllFunctionsElementProviderData)objectConfiguration;

            AllFunctionsElementProvider provider = new AllFunctionsElementProvider(data.ProviderType);

            return provider;
        }
    }
}
