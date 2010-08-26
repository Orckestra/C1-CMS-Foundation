using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Foundation;
using Composite.Core.ResourceSystem;
using Composite.Core.Xml;


namespace Composite.Plugins.Functions.FunctionProviders.StandardFunctionProvider.Constant
{
    internal sealed class XhtmlDocumentFunction : StandardFunctionBase
    {
        public XhtmlDocumentFunction(EntityTokenFactory entityTokenFactory)
            : base("XhtmlDocument", "Composite.Constant", typeof(XhtmlDocument), entityTokenFactory)
        {
        }


        protected override IEnumerable<StandardFunctionParameterProfile> StandardFunctionParameterProfiles
        {
            get
            {
                WidgetFunctionProvider editorWidget = StandardWidgetFunctions.VisualXhtmlDocumentEditorWidget;

                yield return new StandardFunctionParameterProfile("Constant", typeof(XhtmlDocument), true, new NoValueValueProvider(), editorWidget);
            }
        }


        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            return parameters.GetParameter<XhtmlDocument>("Constant");
        }
    }
}
