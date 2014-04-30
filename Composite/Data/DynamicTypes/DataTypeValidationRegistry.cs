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
    internal static class DataTypeValidationRegistry
    {
        private static readonly ConcurrentDictionary<Type, string> _typeSpecificValidations = new ConcurrentDictionary<Type, string>();
        private static readonly ConcurrentDictionary<string, ConcurrentDictionary<Type, string>> _providerSpecificValidations = new ConcurrentDictionary<string, ConcurrentDictionary<Type, string>>();


        static DataTypeValidationRegistry()
        {
            GlobalEventSystemFacade.SubscribeToFlushEvent(args => Flush());
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="interfaceType"></param>
        /// <param name="existingDataTypeDescriptor">Use null to get existing data type descriptor</param>
        /// <returns></returns>
        public static bool Validate(Type interfaceType, DataTypeDescriptor existingDataTypeDescriptor)
        {
            string errorMessage;

            return Validate(interfaceType, existingDataTypeDescriptor, out errorMessage);
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="interfaceType"></param>
        /// <param name="existingDataTypeDescriptor">Use null to get existing data type descriptor</param>
        /// <param name="errorMessage"></param>
        /// <returns></returns>
        public static bool Validate(Type interfaceType, DataTypeDescriptor existingDataTypeDescriptor, out string errorMessage)
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

                    var sb = new StringBuilder();
                    sb.AppendLine(string.Format("The data type interface '{0}' did not validate and can't be used at the moment.", interfaceType));
                    sb.AppendLine(message);

                    return sb.ToString();
                }
            );

            return errorMessage == null;
        }



        public static bool IsValidForProvider(Type interfaceType, string providerName)
        {
            string errorMessage;

            return IsValidForProvider(interfaceType, providerName, out errorMessage);
        }

        public static bool IsValidForProvider(Type interfaceType, string providerName, out string errorMessage)
        {
            return !_providerSpecificValidations
                .GetOrAdd(providerName, s => new ConcurrentDictionary<Type, string>())
                .TryGetValue(interfaceType, out errorMessage);
        }


        public static void ClearValidationError(Type interfaceType, string providerName)
        {
            ConcurrentDictionary<Type, string> cd;
            if (!_providerSpecificValidations.TryGetValue(providerName, out cd))
            {
                return;
            }

            string error;
            cd.TryRemove(interfaceType, out error);
        }


        public static void AddValidationError(Type interfaceType, string providerName, string errorMessage)
        {
            var providerErrors = _providerSpecificValidations
                .GetOrAdd(providerName, s => new ConcurrentDictionary<Type, string>());

            providerErrors.AddOrUpdate(interfaceType, t => errorMessage, (type, s) => s + errorMessage);
        }


        private static void Flush()
        {
            _typeSpecificValidations.Clear();
            _providerSpecificValidations.Clear();
        }
    }
}
