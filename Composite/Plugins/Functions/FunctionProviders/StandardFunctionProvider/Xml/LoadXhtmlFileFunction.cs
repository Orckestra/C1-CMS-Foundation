using System.Collections.Generic;
using System.IO;
using System.Xml;
using System.Xml.Linq;
using Composite.Core.IO;
using Composite.Core.Xml;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Xml
{
    internal sealed class LoadXhtmlFileFunction : StandardFunctionBase
    {
        public LoadXhtmlFileFunction(EntityTokenFactory entityTokenFactory)
            : base("LoadXhtmlFile", "Composite.Xml", typeof(XhtmlDocument), entityTokenFactory)
        {
        }

        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            string relativePath = parameters.GetParameter<string>("RelativePath");

            string path = Path.Combine(PathUtil.Resolve("~"), relativePath);
            if (!C1File.Exists(path))
            {
                throw new FileNotFoundException("File not found. Ensure path is relative (that it does not start with '/').", path);
            }

            using (var streamReader = new Composite.Core.IO.StreamReader(path))
            {
                using (var reader = XmlReader.Create(streamReader))
                {
                    return new XhtmlDocument(XDocument.Load(reader));
                }
            }
        }

        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider textboxWidget = StandardWidgetFunctions.TextBoxWidget;

                yield return new StandardFunctionParameterProfile(
                    "RelativePath", typeof(string), true, new NoValueValueProvider(), textboxWidget);
            }
        }
    }
}
