using System;
using Microsoft.Extensions.DependencyInjection;
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
        void ConfigureServices(IServiceCollection serviceCollection);

        /// <summary>
        /// This handler will be called before Composite initialization. The data layer cannot be used here.
        /// </summary>
        void OnBeforeInitialize(IServiceProvider serviceProvider);

        /// <summary>
        /// This handler will be called after initialization of Composite core.
        /// </summary>
        void OnInitialized(IServiceProvider serviceProvider);
	}
}
