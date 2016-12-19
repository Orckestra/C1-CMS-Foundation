using System.Collections.Generic;
using System.Web.UI;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.FileBasedFunctionProvider;

namespace Composite.AspNet
{
    /// <summary>
    /// Base class for a UserControls that represents a C1 function
    /// </summary>
    public abstract class UserControlFunction : UserControl, IParameterWidgetsProvider

    {
        /// <summary>
        /// Gets the function description.
        /// </summary>
        public virtual string FunctionDescription
        {
            get { return string.Empty; }
        }

        /// <summary>
        /// Gets or sets Function Context Container
        /// </summary>
        public FunctionContextContainer FunctionContextContainer
        {
            get; 
            set;
        }

        /// <exclude />
        public virtual IDictionary<string, WidgetFunctionProvider> GetParameterWidgets()
        {
            return null;
        }

    }
}
