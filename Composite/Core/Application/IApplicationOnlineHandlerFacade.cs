namespace Composite.Core.Application
{
	internal interface IApplicationOnlineHandlerFacade
	{
        /// <summary>
        /// 
        /// </summary>
        /// <param name="softTurnOff">
        /// Setting softTurnOff to true will only make the application offline to the client, but 
        /// not actually turning off the application. Setting this to false will turn off the 
        /// application.
        /// </param>
        /// <param name="recompileCompositeGenerated">
        /// Settings this to true will result in a recompilation of assemblies at startup
        /// </param>
        void TurnApplicationOffline(bool softTurnOff, bool recompileCompositeGenerated);

        void TurnApplicationOnline();

        bool IsApplicationOnline { get; }
	}
}
