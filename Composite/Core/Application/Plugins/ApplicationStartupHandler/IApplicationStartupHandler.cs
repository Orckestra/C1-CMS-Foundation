using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.Core.Application.Plugins.ApplicationStartupHandler.Runtime;


namespace Composite.Core.Application.Plugins.ApplicationStartupHandler
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [CustomFactory(typeof(ApplicationStartupHandlerCustomFactory))]
    [ConfigurationNameMapper(typeof(ApplicationStartupHandlerDefaultNameRetriever))]
	public interface IApplicationStartupHandler
	{
        /// <summary>
        /// This handler will be called before Composite initialization. The data layer cannot be used here.
        /// </summary>
        void OnBeforeInitialize();

        /// <summary>
        /// This handler will be called after initialization of Composite core.
        /// </summary>
        void OnInitialized();
	}
}
