using System;
using System.Collections.Generic;
using Composite.Functions;
using Composite.C1Console.Security;
using Composite.Core.Logging;

namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation
{
    internal abstract class StandardFunctionBase : IFunction
    {
        private EntityTokenFactory _entityTokenFactory;

        internal StandardFunctionBase(string name, string namespaceName, Type returnType, EntityTokenFactory entityTokenFactory)
        {
            if (string.IsNullOrEmpty(name)) throw new ArgumentNullException("name");
            if (string.IsNullOrEmpty(namespaceName)) throw new ArgumentNullException("namespaceName");
            if (entityTokenFactory == null) throw new ArgumentNullException("entityTokenFactory");

            this.Namespace = namespaceName;
            this.Name = name;
            this.ReturnType = returnType;
            
            _entityTokenFactory = entityTokenFactory;

            this.ResourceHandleNameStem = string.Format("{0}.{1}", this.Namespace, this.Name);
        }



        public string Name { get; private set; }

        public string Namespace { get; protected set; }

        public string Description
        {
            get
            {
                return LocalizationToken("description");
            }
        }

        public Type ReturnType { get; private set; }


        public IEnumerable<ParameterProfile> ParameterProfiles
        {
            get
            {

                foreach (StandardFunctionParameterProfile param in this.StandardFunctionParameterProfiles)
                {
                    string labelString;
                    string helpString;

                    if (string.IsNullOrEmpty(param.CustomLabel) == false)
                    {
                        labelString = param.CustomLabel;
                    }
                    else
                    {
                        labelString = LocalizationToken(string.Format("param.{0}.label", param.Name));
                    }

                    if (string.IsNullOrEmpty(param.CustomHelpText) == false)
                    {
                        helpString = param.CustomHelpText;
                    }
                    else
                    {
                        helpString = LocalizationToken(string.Format("param.{0}.help", param.Name));
                    }

                    yield return new ParameterProfile(param.Name, param.Type, param.IsRequired, param.FallbackValueProvider,
                        param.WidgetFunctionProvider, labelString, new HelpDefinition(helpString));
                }
            }
        }

        protected virtual IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles 
        {
            get
            {
                yield break;
            }
        }

        public abstract object Execute(ParameterList parameters, FunctionContextContainer context);

        public EntityToken EntityToken
        {
            get { return _entityTokenFactory.CreateEntityToken(this); }
        }

        private string LocalizationToken(string functionLocalPart)
        {
            return string.Format( "${{Composite.Plugins.StandardFunctions,{0}.{1}}}", this.ResourceHandleNameStem, functionLocalPart ); 
        }

        public string ResourceHandleNameStem {get; protected set; }
    }
}
