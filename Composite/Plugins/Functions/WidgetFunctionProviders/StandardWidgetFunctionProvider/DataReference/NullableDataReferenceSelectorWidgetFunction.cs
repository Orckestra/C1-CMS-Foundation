using System.Collections;
using System.Xml.Linq;
using Composite.Core.Types;
using Composite.Data;
using Composite.Functions;
using Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.Foundation;


namespace Composite.Plugins.Functions.WidgetFunctionProviders.StandardWidgetFunctionProvider.DataReference
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class NullableDataReferenceSelectorWidgetFunction<T> : CompositeWidgetFunctionBase
         where T : class, IData
    {
        private const string _compositeNameBase = CompositeWidgetFunctionBase.CommonNamespace + ".DataReference.";

        /// <exclude />
        public NullableDataReferenceSelectorWidgetFunction(EntityTokenFactory entityTokenFactory)
            : base(CompositeName, typeof(NullableDataReference<T>), entityTokenFactory)
        {
        }

        internal static string CompositeName
        {
            get
            {
                return _compositeNameBase + typeof(T).FullName.Replace(".", "") + ".OptionalSelector";
            }
        }

        /// <exclude />
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

        /// <summary>
        /// To be called through reflection
        /// </summary>
        /// <exclude />
        public static IEnumerable GetOptions(string typeManagerName)
        {
            return GetOptionsCommon.GetOptions(typeManagerName);
        }
    }
}
