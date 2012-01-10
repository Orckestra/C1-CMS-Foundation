using System;
using System.Collections.Concurrent;
using System.ComponentModel;
using System.Text;
using Composite.C1Console.Events;


namespace Composite.Data.DynamicTypes
{
    /// <summary>    
    /// Used to keep information about the validation state of data types.
    /// </summary>
    /// <exclude />
    [EditorBrowsable(EditorBrowsableState.Never)]
    internal static class DataTypeValidationRegitry
    {
        private static ConcurrentDictionary<Type, string> _typeSpecificValidations = new ConcurrentDictionary<Type, string>();
        private static ConcurrentDictionary<Type, ConcurrentDictionary<string, string>> _providerSpecificValidations = new ConcurrentDictionary<Type, ConcurrentDictionary<string, string>>();


        static DataTypeValidationRegitry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(OnFlushEvent);
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="interfaceType"></param>
        /// <param name="existingDataTypeDescriptor">Use null to get existing data type descriptor</param>
        /// <returns></returns>
        public static bool IsValidate(Type interfaceType, DataTypeDescriptor existingDataTypeDescriptor)
        {
            string errorMessage;

            return IsValidate(interfaceType, existingDataTypeDescriptor, out errorMessage);
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="interfaceType"></param>
        /// <param name="existingDataTypeDescriptor">Use null to get existing data type descriptor</param>
        /// <param name="errorMessage"></param>
        /// <returns></returns>
        public static bool IsValidate(Type interfaceType, DataTypeDescriptor existingDataTypeDescriptor, out string errorMessage)
        {
            if (existingDataTypeDescriptor == null)
            {
                existingDataTypeDescriptor = DataMetaDataFacade.GetDataTypeDescriptor(interfaceType.GetImmutableTypeId());

                if (existingDataTypeDescriptor == null)
                {
                    errorMessage = null;
                    return true;
                }
            }

            errorMessage = _typeSpecificValidations.GetOrAdd(
                interfaceType,
                f =>
                {
                    string message;
                    bool isValid = DataTypeValidator.Validate(interfaceType, existingDataTypeDescriptor, out message);

                    if (isValid) return null;

                    StringBuilder sb = new StringBuilder();
                    sb.AppendLine(string.Format("The data type interface '{0}' did not validate and can't be used at the moment.", interfaceType));
                    sb.AppendLine(message);

                    return sb.ToString();
                }
            );

            return errorMessage == null;
        }



        public static bool IsValidateForProvider(Type interfaceType, string providerName, out string errorMessage)
        {
            ConcurrentDictionary<string, string> dic;
            if (_providerSpecificValidations.TryGetValue(interfaceType, out dic))
            {
                string error;
                if (dic.TryGetValue(providerName, out error))
                {
                    errorMessage = error;
                    return false;
                }
            }

            errorMessage = null;
            return true;
        }



        public static void AddValidationError(Type interfaceType, string providerName, string errorMessage)
        {
            Func<Type, ConcurrentDictionary<string, string>> adder =
                t =>
                {
                    ConcurrentDictionary<string, string> dic = new ConcurrentDictionary<string, string>();
                    dic.TryAdd(providerName, errorMessage);
                    return dic;
                };

            Func<Type, ConcurrentDictionary<string, string>, ConcurrentDictionary<string, string>> updater =
                (t, d) =>
                {
                    d.AddOrUpdate(providerName, errorMessage, (p, s) => s + errorMessage);
                    return d;
                };

            _providerSpecificValidations.AddOrUpdate(interfaceType, adder, updater);
        }



        private static void Flush()
        {
            _typeSpecificValidations = new ConcurrentDictionary<Type, string>();
            _providerSpecificValidations = new ConcurrentDictionary<Type, ConcurrentDictionary<string, string>>();
        }



        private static void OnFlushEvent(FlushEventArgs args)
        {
            Flush();
        }
    }
}
