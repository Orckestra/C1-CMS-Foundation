using System;
using Composite.C1Console.Events;


namespace Composite.Data.Validation.Foundation
{
    internal static class ClientValidationRuleTranslatorRegistry
    {
        private static IClientValidationRuleTranslatorRegistry _implementation = new ClientValidationRuleTranslatorRegistryImpl();

        internal static IClientValidationRuleTranslatorRegistry Implementation { get { return _implementation; } set { _implementation = value; } }



        static ClientValidationRuleTranslatorRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static string GetTranslatorName(Type attributeType)
        {
            return _implementation.GetTranslatorName(attributeType);
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            _implementation.OnFlush();
        }
    }
}
