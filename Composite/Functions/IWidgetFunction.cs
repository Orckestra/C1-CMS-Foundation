using System;
using System.Xml.Linq;
using System.Collections.Generic;


namespace Composite.Functions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public interface IWidgetFunction : IMetaFunction
	{
        /// <exclude />
        XElement GetWidgetMarkup(ParameterList parameters, string label, HelpDefinition helpDefinition, string bindingSourceName); 
	}
}
