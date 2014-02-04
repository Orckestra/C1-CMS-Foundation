using System;
using System.Collections.Generic;
using Composite.C1Console.Elements.Plugins.ElementProvider.Runtime;
using Composite.C1Console.Security;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Elements.Plugins.ElementProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    [Obsolete("Use interfaces IElementAttachingProvider and IAuxiliarySecurityAncestorProvider instead")]
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
