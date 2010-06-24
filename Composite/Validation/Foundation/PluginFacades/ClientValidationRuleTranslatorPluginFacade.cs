using System;
using System.Collections.Generic;
using Composite.EventSystem;
using Composite.Validation.ClientValidationRules;


namespace Composite.Validation.Foundation.PluginFacades
{
    internal static class ClientValidationRuleTranslatorPluginFacade
    {
        private static IClientValidationRuleTranslatorPluginFacade _implementation = new ClientValidationRuleTranslatorPluginFacadeImpl();

        internal static IClientValidationRuleTranslatorPluginFacade Implementation { get { return _implementation; } set { _implementation = value; } }



        static ClientValidationRuleTranslatorPluginFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static IEnumerable<Type> GetSupportedAttributeTypes(string translatorName)
        {
            return _implementation.GetSupportedAttributeTypes(translatorName);
        }



        public static ClientValidationRule Translate(string translatorName, Attribute attribute)
        {
            return _implementation.Translate(translatorName, attribute);
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            _implementation.OnFlush();
        }
    }
}
