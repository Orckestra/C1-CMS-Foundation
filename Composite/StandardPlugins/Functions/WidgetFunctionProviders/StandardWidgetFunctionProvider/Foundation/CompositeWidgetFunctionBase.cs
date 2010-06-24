using System;
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.Xml;
using Composite.Security;


namespace Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation
{
    public abstract class CompositeWidgetFunctionBase : IWidgetFunction
	{
        protected const string CommonNamespace = "Composite.Widgets";
        protected const string InternalCommonNamespace = "Composite.Widgets.Internal"; // not exposed by provider
        private EntityTokenFactory _entityTokenFactory;

        protected CompositeWidgetFunctionBase(string compositeName, Type returnType, EntityTokenFactory entityTokenFactory)
        {
            if (string.IsNullOrEmpty(compositeName) == true) throw new ArgumentNullException("compositeName");

            this.Namespace = compositeName.Substring(0,compositeName.LastIndexOf('.'));
            this.Name = compositeName.Substring(compositeName.LastIndexOf('.')+1);
            this.ReturnType = returnType;
            this.ParameterProfiles = new List<ParameterProfile>();
            _entityTokenFactory = entityTokenFactory;
        }


        protected void AddParameterProfile(ParameterProfile pp)
        {
            ((List<ParameterProfile>)this.ParameterProfiles).Add(pp);
        }



        public virtual string Name { get; private set; }


        public string Namespace{ get; private set; }


        public virtual string Description { get { return ""; } }


        public Type ReturnType { get; private set; }


        public IEnumerable<ParameterProfile> ParameterProfiles { get; private set; }


        public abstract XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName);


        protected XElement BuildBasicWidgetMarkup(string uiControlName, string bindingPropertyName, string label, HelpDefinition help, string bindingSourceName)
        {
            return StandardWidgetFunctions.BuildBasicFormsMarkup(Namespaces.BindingFormsStdUiControls10, uiControlName, bindingPropertyName, label, help, bindingSourceName);
        }


        public EntityToken EntityToken
        {
            get { return _entityTokenFactory.CreateEntityToken(this); }
        }
    }
}
