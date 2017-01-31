using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Web;
using Composite.AspNet.Security;
using Composite.C1Console.Security;
using Composite.Core.IO;
using Composite.Core.Xml;
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
                            try
                            {
                                InitializeParameters();
                            }
                            catch (HttpException ex)
                            {
                                EmbedSourceCodeInformation(ex);
                                throw;
                            }
                            
                            Verify.IsNotNull(Parameters, "Parameters collection is null");
                        }
                    }
			    }
			    
			    foreach (var param in Parameters.Values)
			    {
			        BaseValueProvider defaultValueProvider = new NoValueValueProvider();
			        WidgetFunctionProvider widgetProvider = param.WidgetProvider;
			        string label = param.Name;
			        bool isRequired = true;
			        string helpText = String.Empty;
			        bool hideInSimpleView = false;

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

			            hideInSimpleView = param.Attribute.HideInSimpleView;
			        }

			        if (widgetProvider == null)
			        {
			            widgetProvider = StandardWidgetFunctions.GetDefaultWidgetFunctionProviderByType(param.Type, isRequired);
			        }

			        yield return new ParameterProfile(param.Name, param.Type, isRequired, defaultValueProvider, widgetProvider, label,
                        new HelpDefinition(helpText),
                        hideInSimpleView);
			        
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

        protected void EmbedSourceCodeInformation(HttpException ex)
        {
            if (ex is HttpParseException)
            {
                EmbedSourceCodeInformation(ex as HttpParseException);
            }
            else if (ex is HttpCompileException)
            {
                EmbedSourceCodeInformation(ex as HttpCompileException);
            }
        }
	    
        private void EmbedSourceCodeInformation(HttpParseException ex)
	    {
            // Not showing source code of not related files
	        if (!ex.FileName.StartsWith(PathUtil.Resolve(VirtualPath), StringComparison.OrdinalIgnoreCase))
	        {
	            return;
	        }

            string[] sourceCode = C1File.ReadAllLines(ex.FileName);

            XhtmlErrorFormatter.EmbedSourceCodeInformation(ex, sourceCode, ex.Line);
        }

        private void EmbedSourceCodeInformation(HttpCompileException ex)
        {
            var compilationErrors = ex.Results.Errors;
            if (!compilationErrors.HasErrors)
            {
                return;
            }
            
            CompilerError firstError = null;
            
            for (int i = 0; i < compilationErrors.Count; i++)
            {
                if (!compilationErrors[i].IsWarning)
                {
                    firstError = compilationErrors[i];
                    break;
                }
            }

            Verify.IsNotNull(firstError, "Failed to finding an error in the compiler results.");

            // Not showing source code of not related files
	        if (!firstError.FileName.StartsWith(PathUtil.Resolve(VirtualPath), StringComparison.OrdinalIgnoreCase))
	        {
	            return;
	        }

	        string[] sourceCode = C1File.ReadAllLines(firstError.FileName);

	        XhtmlErrorFormatter.EmbedSourceCodeInformation(ex, sourceCode, firstError.Line);
        }

		public abstract object Execute(ParameterList parameters, FunctionContextContainer context);
	}
}
