using Composite.C1Console.Forms.Foundation.PluginFacades;
using Composite.C1Console.Forms.Plugins.FunctionFactory;


namespace Composite.C1Console.Forms
{
	internal static class FormFactoryService
	{
        public static IFormFunction GetFunction(string namespaceName, string name)
        {
            return FunctionFactoryPluginFacade.GetFunction(namespaceName, name);
        }



        public static IUiControl CreateControl(string channelName, string namespaceName, string name)
        {
            return UiControlFactoryPluginFacade.CreateControl(new ChannelIdentifier(channelName), namespaceName, name);
        }



        public static IUiControl CreateControl(IFormChannelIdentifier channel, string namespaceName, string name)
        {
            return UiControlFactoryPluginFacade.CreateControl(channel, namespaceName, name);
        }



        private class ChannelIdentifier : IFormChannelIdentifier
        {
            public ChannelIdentifier( string name )
            {
                this.ChannelName = name;
            }

            public string ChannelName { get; private set; }
        }
    }
}
