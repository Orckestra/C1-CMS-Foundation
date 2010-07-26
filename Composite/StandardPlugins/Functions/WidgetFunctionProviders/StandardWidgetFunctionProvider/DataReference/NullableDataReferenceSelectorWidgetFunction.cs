
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
    internal sealed class NullableDataReferenceSelectorWidgetFunction<T> : CompositeWidgetFunctionBase
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
                return _compositeNameBase + typeof(T).FullName.Replace(".", "") + ".OptionalSelector";
            }
        }


        private const string _compositeNameBase = CompositeWidgetFunctionBase.CommonNamespace + ".DataReference.";

        public NullableDataReferenceSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(NullableDataReference<T>), entityTokenFactory)
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
                    false,
                    false);
        }
    }
}
