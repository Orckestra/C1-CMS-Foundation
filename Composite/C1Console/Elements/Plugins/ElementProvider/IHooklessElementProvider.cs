using System.Collections.Generic;
using Composite.C1Console.Elements.Plugins.ElementProvider.Runtime;
using Composite.C1Console.Security;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Elements.Plugins.ElementProvider
{
    /// <summary>    
    /// This interface is implemented by element providers - plug-ins that can decorate the C1 Console tree structure with elements.
    /// </summary>
    [CustomFactory(typeof(HooklessElementProviderCustomFactory))]
    [ConfigurationNameMapper(typeof(HooklessElementProviderDefaultNameRetriever))]
    public interface IHooklessElementProvider
    {
        /// <summary>
        /// The system will supply an ElementProviderContext to the provider
        /// to use for creating <see cref="ElementHandle"/>-s
        /// </summary>
        ElementProviderContext Context { set; }


        /// <summary>
        /// Gets the provider's root elements 
        /// </summary>
        /// <param name="seachToken">
        /// If this is null the provider should not do any filtering. If this is not null the provider
        /// should do the appropriate filtering on its elements. 
        /// If the provider does not want to be a part of a search and this variable is not null,
        /// the provider should return an empty list
        /// </param>
        /// <returns>Root elements</returns>
        IEnumerable<Element> GetRoots(SearchToken seachToken);


        /// <summary>
        /// Gets the children of a given element
        /// </summary>
        /// <param name="entityToken">The parent element of the elements to return</param>
        /// <param name="seachToken">
        /// If this is <value>null</value> the provider should not do any filtering. If this is not null the provider
        /// should do the appropriate filtering on its elements. 
        /// If the provider does not want to be a part of a search and this variable is not null,
        /// the provider should return an empty list
        /// </param>
        /// <returns>Child elements</returns>
        IEnumerable<Element> GetChildren(EntityToken entityToken, SearchToken seachToken);        
    }
}
