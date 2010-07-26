using Composite.Application.Plugins.ApplicationOnlineHandler.Runtime;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.Application.Plugins.ApplicationOnlineHandler
{
    [CustomFactory(typeof(ApplicationOnlineHandlerCustomFactory))]
    [ConfigurationNameMapper(typeof(ApplicationOnlineHandlerDefaultNameRetriever))]
	internal interface IApplicationOnlineHandler
	{
        void TurnApplicationOffline();
        void TurnApplicationOnline();
        bool IsApplicationOnline();
	}
}
