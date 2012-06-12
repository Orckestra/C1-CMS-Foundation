using System;
using System.Linq;
using System.Web.WebPages;
using Composite.AspNet.Razor;
using Composite.AspNet.Razor.Parser;
using Composite.Core.Xml;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;

namespace Composite.Plugins.Functions.FunctionProviders.RazorFunctionProvider
{
	[ConfigurationElementType(typeof(RazorFunctionProviderData))]
	internal class RazorFunctionProvider : FileBasedFunctionProvider<RazorFunction>
	{
		protected override string FileExtension
		{
			get { return "cshtml"; }
		}

		protected override Type BaseType
		{
			get { return typeof(CompositeC1WebPage); }
		}

		public RazorFunctionProvider(string name, string folder) : base(name, folder) { }

		protected override Type GetReturnType(object obj)
		{
			var attr = obj.GetType().GetCustomAttributes(typeof(FunctionReturnTypeAttribute), false).Cast<FunctionReturnTypeAttribute>().FirstOrDefault();
			if (attr != null)
			{
				return attr.ReturnType;
			}

			return typeof(XhtmlDocument);
		}

		protected override object InstantiateFile(string virtualPath)
		{
			return WebPage.CreateInstanceFromVirtualPath(virtualPath);
		}

		protected override bool HandleChange(string path)
		{
			return path.EndsWith(".cshtml");
		}
	}
}
