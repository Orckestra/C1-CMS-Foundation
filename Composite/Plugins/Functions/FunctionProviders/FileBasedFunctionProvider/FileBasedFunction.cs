using System;
using System.Collections.Generic;
using Composite.AspNet.Security;
using Composite.C1Console.Security;
using Composite.Functions;
using Composite.Core.Extensions;

namespace Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider
{
	internal abstract class FileBasedFunction<T> : IFunction where T : FileBasedFunction<T>
	{
		private readonly FileBasedFunctionProvider<T> _provider;

		internal string VirtualPath { get; private set; }
		protected IDictionary<string, FunctionParameter> Parameters { get; set; }

		public string Namespace { get; private set; }
		public string Name { get; private set; }
		public Type ReturnType { get; private set; }
		public virtual string Description { get; private set; }

		public EntityToken EntityToken
		{
			get { return new FileBasedFunctionEntityToken(_provider.Name, String.Join(".", Namespace, Name)); }
		}

	    protected abstract void InitializeParameters();

		public virtual IEnumerable<ParameterProfile> ParameterProfiles
		{
			get
			{
                if (Parameters == null)
                {
                    lock (this)
                    {
                        if (Parameters == null)
                        {
                            InitializeParameters();
                            Verify.IsNotNull(Parameters, "Parameters collection is null");
                        }
                    }
			    }
			    
			    foreach (var param in Parameters.Values)
			    {
			        BaseValueProvider defaultValueProvider = new NoValueValueProvider();
			        WidgetFunctionProvider widgetProvider = null;
			        string label = param.Name;
			        bool isRequired = true;
			        string helpText = String.Empty;

			        if (param.Attribute != null)
			        {
			            if (!param.Attribute.Label.IsNullOrEmpty())
			            {
			                label = param.Attribute.Label;
			            }

			            if (!param.Attribute.Help.IsNullOrEmpty())
			            {
			                helpText = param.Attribute.Help;
			            }

			            isRequired = !param.Attribute.HasDefaultValue;
			            if (!isRequired)
			            {
			                defaultValueProvider = new ConstantValueProvider(param.Attribute.DefaultValue);
			            }

			            widgetProvider = param.WidgetProvider;
			        }

			        if (widgetProvider == null)
			        {
			            widgetProvider = StandardWidgetFunctions.GetDefaultWidgetFunctionProviderByType(param.Type);
			        }

			        yield return new ParameterProfile(param.Name, param.Type, isRequired, defaultValueProvider, widgetProvider, label,
                        new HelpDefinition(helpText));
			        
			    }
			}
		}

		protected FileBasedFunction(string ns, string name, string description, IDictionary<string, FunctionParameter> parameters, Type returnType, string virtualPath, FileBasedFunctionProvider<T> provider)
            :this(ns, name, description, returnType, virtualPath, provider)
		{
			Parameters = parameters;
		}

        protected FileBasedFunction(string ns, string name, string description, Type returnType, string virtualPath, FileBasedFunctionProvider<T> provider)
        {
            _provider = provider;

            Namespace = ns;
            Name = name;
            Description = description;
            ReturnType = returnType;
            VirtualPath = virtualPath;
        }

		public abstract object Execute(ParameterList parameters, FunctionContextContainer context);
	}
}
