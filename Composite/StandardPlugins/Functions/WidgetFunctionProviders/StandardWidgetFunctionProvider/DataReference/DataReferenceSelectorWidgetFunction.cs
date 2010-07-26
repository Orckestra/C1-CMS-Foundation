using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Xml.Linq;
using Composite.Data;
using Composite.Data.DynamicTypes;
using Composite.EventSystem;
using Composite.Functions;
using Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;
using Composite.Types;
using Composite.Logging;
using Composite.Data.Types;
using Composite.Renderings.Page;


namespace Composite.StandardPlugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataReference
{
    internal sealed class DataReferenceSelectorWidgetFunction<T> : CompositeWidgetFunctionBase
         where T : class, IData
    {
        public static IEnumerable GetOptions(string typeManagerName)
        {
            return GetOptionsCommon.GetOptions(typeManagerName);
        }


        public static string CompositeName
        {
            get
            {
                return _compositeNameBase + typeof(T).FullName.Replace(".", "") + ".Selector";
            }
        }


        private const string _compositeNameBase = CompositeWidgetFunctionBase.CommonNamespace + ".DataReference.";

        public DataReferenceSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(DataReference<T>), entityTokenFactory)
        {
        }

        public override XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName)
        {
            return StandardWidgetFunctions.BuildStaticCallPopulatedSelectorFormsMarkup(
                    parameters,
                    label,
                    helpDefinition,
                    bindingSourceName,
                    this.GetType(),
                    "GetOptions",
                    TypeManager.SerializeType(typeof(T)),
                    "Key",
                    "Label",
                    false,
                    true,
                    true,
                    false);
        }
    }
}
