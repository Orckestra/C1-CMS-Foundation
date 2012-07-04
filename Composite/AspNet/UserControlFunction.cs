using System;
using System.Web.UI;

namespace Composite.AspNet
{
    /// <summary>
    /// Base class for a UserControls that represents a C1 function
    /// </summary>
    public abstract class UserControlFunction : UserControl
    {
        /// <summary>
        /// Gets the function description.
        /// </summary>
        public virtual string FunctionDescription
        {
            get { return string.Empty; }
        }
    }
}
