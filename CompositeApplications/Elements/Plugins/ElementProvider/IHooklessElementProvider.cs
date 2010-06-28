using System.Collections.Generic;
using Composite.Elements.Plugins.ElementProvider.Runtime;
using Composite.Security;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Elements.Plugins.ElementProvider
{ 
    [CustomFactory(typeof(HooklessElementProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(HooklessElementProviderDefaultNameRetriever))]
    internal interface IHooklessElementProvider
    {
        /// <summary>
        /// The system will supply an ElementProviderContext to the provider
        /// to use for creating ElementHandles
        /// </summary>
        ElementProviderContext Context { set; }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="seachToken">
        /// If this is null the provider should not do any filtering. If this is not null the provider
        /// should do the appropriate filtering on its elements. 
        /// If the provider does not want to be a part of a search and this variable is not null,
        /// the provider should return an empty list
        /// </param>
        /// <returns></returns>
        IEnumerable<Element> GetRoots(SearchToken seachToken);


        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityToken"></param>
        /// <param name="seachToken">See GetRoots</param>
        /// <returns></returns>
        IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken seachToken);        
    }
}
