using System;
using System.Collections.Generic;
using System.Xml.Linq;
using Composite.C1Console.Security;
using Composite.Core.Xml;
using Composite.Functions;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class CompositeWidgetFunctionBase : IWidgetFunction
	{
        /// <exclude />
        protected const string CommonNamespace = "Composite.Widgets";

        /// <exclude />
        protected const string InternalCommonNamespace = "Composite.Widgets.Internal"; // not exposed by provider
        
        private EntityTokenFactory _entityTokenFactory;


        /// <exclude />
        protected CompositeWidgetFunctionBase(string compositeName, Type returnType, EntityTokenFactory entityTokenFactory)
        {
            if (string.IsNullOrEmpty(compositeName) == true) throw new ArgumentNullException("compositeName");

            this.Namespace = compositeName.Substring(0,compositeName.LastIndexOf('.'));
            this.Name = compositeName.Substring(compositeName.LastIndexOf('.')+1);
            this.ReturnType = returnType;
            this.ParameterProfiles = new List<ParameterProfile>();
            _entityTokenFactory = entityTokenFactory;
        }


        /// <exclude />
        protected void AddParameterProfile(ParameterProfile pp)
        {
            ((List<ParameterProfile>)this.ParameterProfiles).Add(pp);
        }


        /// <exclude />
        public virtual string Name { get; private set; }


        /// <exclude />
        public string Namespace{ get; private set; }


        /// <exclude />
        public virtual string Description { get { return ""; } }


        /// <exclude />
        public Type ReturnType { get; private set; }


        /// <exclude />
        public IEnumerable<ParameterProfile> ParameterProfiles { get; private set; }


        /// <exclude />
        public abstract XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName);


        /// <exclude />
        protected XElement BuildBasicWidgetMarkup(string uiControlName, string bindingPropertyName, string label, HelpDefinition help, string bindingSourceName)
        {
            return StandardWidgetFunctions.BuildBasicFormsMarkup(Namespaces.BindingFormsStdUiControls10, uiControlName, bindingPropertyName, label, help, bindingSourceName);
        }


        /// <exclude />
        public EntityToken EntityToken
        {
            get { return _entityTokenFactory.CreateEntityToken(this); }
        }
    }
}
