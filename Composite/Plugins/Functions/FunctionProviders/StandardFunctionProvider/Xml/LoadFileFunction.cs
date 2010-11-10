using System.Collections.Generic;
using System.Xml;
using System.Xml.Linq;
using Composite.Core.IO;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using System.IO;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Xml
{
    internal sealed class LoadFileFunction : StandardFunctionBase
    {
        public LoadFileFunction(EntityTokenFactory entityTokenFactory)
            : base("LoadFile", "Composite.Xml", typeof(XElement), entityTokenFactory)
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
                    return XElement.Load(reader);
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
