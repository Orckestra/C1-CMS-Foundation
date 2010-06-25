using System;
using Composite.Data;
using Composite.EventSystem;
using Microsoft.Practices.EnterpriseLibrary.Validation;


namespace Composite.Validation
{
    internal static class ValidationFacade
    {
        private static IValidationFacade _implementation = new ValidationFacadeImpl();

        internal static IValidationFacade Implementation { get { return _implementation; } set { _implementation = value; } }



        static ValidationFacade()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        public static ValidationResults Validate<T>(T data)
            where T : class, IData
        {
            return _implementation.Validate<T>(data);
        }



        // Overload
        public static ValidationResults Validate(IData data)
        {
            return Validate(data.DataSourceId.InterfaceType, data);
        }



        public static ValidationResults Validate(Type interfaceType, IData data)
        {
            return _implementation.Validate(interfaceType, data);
        }




        private static void OnFlushEvent(FlushEventArgs args)
        {
            _implementation.OnFlush();
        }
    }
}
