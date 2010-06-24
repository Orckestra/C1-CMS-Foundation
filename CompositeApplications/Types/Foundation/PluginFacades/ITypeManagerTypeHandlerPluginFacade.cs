using System;


namespace Composite.Types.Foundation.PluginFacades
{
	internal interface ITypeManagerTypeHandlerPluginFacade
	{
        Type GetType(string providerName, string fullName);
        string SerializedType(string providerName, Type type);
        bool HasTypeWithName(string providerName, string typeFullname);
        void OnFlush();
	}
}
