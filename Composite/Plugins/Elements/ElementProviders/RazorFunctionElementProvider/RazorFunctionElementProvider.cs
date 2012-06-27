using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Composite.AspNet.Razor.Security;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.C1Console.Security;
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
        private readonly string _functionProviderName;

        public RazorFunctionElementProvider(string functionProvider)
        {
            _functionProviderName = functionProvider;
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

                return new RazorFunctionElementProvider(data.RazorFunctionProviderName);
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
        }

        #endregion Configuration

        protected override string RootFolderLabel
        {
            get { return SR.GetString("Composite.Plugins.RazorFunction", "RootElement.Label"); }
        }

        protected override string RootFolderToolTip
        {
            get { return SR.GetString("Composite.Plugins.RazorFunction", "RootElement.ToolTip"); }
        }
    }
}
