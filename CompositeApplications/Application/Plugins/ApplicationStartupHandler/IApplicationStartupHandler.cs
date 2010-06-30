using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;
using Composite.Application.Plugins.ApplicationStartupHandler.Runtime;


namespace Composite.Application.Plugins.ApplicationStartupHandler
{
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
