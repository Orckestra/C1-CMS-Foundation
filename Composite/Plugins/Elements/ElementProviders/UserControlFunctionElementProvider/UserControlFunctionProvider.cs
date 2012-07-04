using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using Composite.AspNet.Security;
using Composite.C1Console.Elements;
using Composite.C1Console.Elements.Plugins.ElementProvider;
using Composite.C1Console.Security;
using Composite.Functions;
using Composite.Plugins.Elements.ElementProviders.BaseFunctionProviderElementProvider;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Microsoft.Practices.ObjectBuilder;
using SR = Composite.Core.ResourceSystem.StringResourceSystemFacade;

namespace Composite.Plugins.Elements.ElementProviders.UserControlFunctionElementProvider
{
    [ConfigurationElementType(typeof(UserControlFunctionProviderElementProviderData))]
    internal class UserControlFunctionElementProvider : BaseFunctionProviderElementProvider.BaseFunctionProviderElementProvider
    {
        private readonly string _functionProviderName;

        public UserControlFunctionElementProvider(string functionProvider)
        {
            _functionProviderName = functionProvider;
        }

        protected override IEnumerable<IFunctionTreeBuilderLeafInfo> OnGetFunctionInfos(SearchToken searchToken)
        {
            var functions = FunctionFacade.GetFunctionsByProvider(_functionProviderName);

            if (searchToken != null && !string.IsNullOrEmpty(searchToken.Keyword))
            {
                string keyword = searchToken.Keyword.ToLowerInvariant();

                functions = functions.Where(f => f.Namespace.IndexOf(keyword, StringComparison.OrdinalIgnoreCase) > 0
                                                 || f.Name.IndexOf(keyword, StringComparison.OrdinalIgnoreCase) > 0);
            }

            return functions.Select(f => new UserControlFunctionTreeBuilderLeafInfo(f));
        }

        protected override IEnumerable<Type> OnGetEntityTokenTypes()
        {
            return new[] { typeof(FileBasedFunctionEntityToken) };
        }

        protected override IFunctionTreeBuilderLeafInfo OnIsEntityOwner(EntityToken entityToken)
        {
            if (entityToken is FileBasedFunctionEntityToken && entityToken.Source == _functionProviderName)
            {
                string functionFullName = entityToken.Id;

                IFunction function = FunctionFacade.GetFunctionsByProvider(_functionProviderName)
                        .FirstOrDefault(func => func.Namespace + "." + func.Name == functionFullName);

                return function == null ? null : new UserControlFunctionTreeBuilderLeafInfo(function);
            }

            return null;
        }

        private sealed class UserControlFunctionTreeBuilderLeafInfo : IFunctionTreeBuilderLeafInfo
        {
            private readonly IFunction _function;

            public UserControlFunctionTreeBuilderLeafInfo(IFunction function)
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

        internal sealed class UserControlFunctionElementProviderAssembler : IAssembler<IHooklessElementProvider, HooklessElementProviderData>
        {
            [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1062:ValidateArgumentsOfPublicMethods")]
            public IHooklessElementProvider Assemble(IBuilderContext context, HooklessElementProviderData objectConfiguration, IConfigurationSource configurationSource, ConfigurationReflectionCache reflectionCache)
            {
                var data = (UserControlFunctionProviderElementProviderData)objectConfiguration;

                return new UserControlFunctionElementProvider(data.UserControlFunctionProviderName);
            }
        }

        [Assembler(typeof(UserControlFunctionElementProviderAssembler))]
        internal sealed class UserControlFunctionProviderElementProviderData : HooklessElementProviderData
        {
            private const string _UserControlFunctionProviderNameProperty = "userControlFunctionProviderName";
            [ConfigurationProperty(_UserControlFunctionProviderNameProperty, IsRequired = true)]
            public string UserControlFunctionProviderName
            {
                get { return (string)base[_UserControlFunctionProviderNameProperty]; }
                set { base[_UserControlFunctionProviderNameProperty] = value; }
            }
        }

        #endregion Configuration

        protected override string RootFolderLabel
        {
            get { return SR.GetString("Composite.Plugins.UserControlFunction", "RootElement.Label"); }
        }

        protected override string RootFolderToolTip
        {
            get { return SR.GetString("Composite.Plugins.UserControlFunction", "RootElement.ToolTip"); }
        }
    }
}
