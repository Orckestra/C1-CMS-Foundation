using System;
using System.Collections.Generic;
using Composite.Elements.Plugins.ElementProvider.Runtime;
using Composite.Security;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Elements.Plugins.ElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Obsolete]
    [CustomFactory(typeof(ElementProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(ElementProviderDefaultNameRetriever))]
    public interface IElementProvider : IHooklessElementProvider
    {
        /// <summary>
        /// Hooks are not affected by searches.
        /// </summary>
        /// <returns></returns>
        List<EntityTokenHook> GetHooks();
    }
}
