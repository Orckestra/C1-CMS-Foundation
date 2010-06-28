using System;
using System.Linq; 
using System.Xml.Linq;
using System.Collections.Generic;

using Composite.Functions;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.Data;
using System.Reflection;
using Composite.Types;
using Composite.Data.Types;


namespace Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider
{
	internal sealed class MediaFileFolderSelectorWidget : CompositeWidgetFunctionBase
    {
        private const string _functionName = "MediaFileFolderSelector";
        public const string CompositeName = CompositeWidgetFunctionBase.CommonNamespace + "." + _functionName;


        public MediaFileFolderSelectorWidget(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(DataReference<IMediaFileFolder>), entityTokenFactory)
        {
        }


        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition help, string bindingSourceName)
        {
            XElement widgetMarkup = base.BuildBasicWidgetMarkup("DataReferenceSelector", "Selected", label, help, bindingSourceName);
            widgetMarkup.Add(new XElement("DataReferenceSelector.DataType", typeof(IMediaFileFolder).AssemblyQualifiedName));

            return widgetMarkup;
        }
    }
}