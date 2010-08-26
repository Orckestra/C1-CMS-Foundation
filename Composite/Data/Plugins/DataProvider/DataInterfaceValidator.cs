using System;
using System.Text;
using System.Reflection;
using System.Collections.Generic;
using Composite.Core.Types;
using Composite.Core.ResourceSystem;


namespace Composite.Data.Plugins.DataProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public static class DataInterfaceValidator
    {
        public static bool TryValidate(Type interfaceType, out IEnumerable<string> errorMessages)
        {
            List<string> errors = new List<string>();
            errorMessages = errors;


            if (interfaceType.IsInterface == false)
            {
                string errorMessage = StringResourceSystemFacade.GetString("Composite.Management", "DataInterfaceValidator.TypeNotAnInterface");
                errors.Add(string.Format(errorMessage, interfaceType));
            }


            if (typeof(IData).IsAssignableFrom(interfaceType) == false)
            {
                string errorMessage = StringResourceSystemFacade.GetString("Composite.Management", "DataInterfaceValidator.TypeDoesNotImplementInterface");
                errors.Add(string.Format(errorMessage, interfaceType, typeof(IData)));
            }


            PropertyInfo[] properties = interfaceType.GetProperties();
            foreach (PropertyInfo propertyInfo in properties)
            {
                bool acceptedType = PrimitiveTypes.IsPrimitiveOrNullableType(propertyInfo.PropertyType);                

                if (acceptedType == false)
                {
                    string errorMessage = StringResourceSystemFacade.GetString("Composite.Management", "DataInterfaceValidator.NotAcceptedType");
                    errors.Add(string.Format(errorMessage, propertyInfo.PropertyType, interfaceType));
                }
            }

            return errors.Count == 0;
        }



        public static bool TryValidate(Type interfaceType)
        {
            IEnumerable<string> errorMessages;

            return TryValidate(interfaceType, out errorMessages);
        }



        public static bool TryValidate<T>(out IEnumerable<string> errorMessages)
            where T : class, IData
        {
            return TryValidate(typeof(T), out errorMessages);
        }



        public static bool TryValidate<T>()
            where T : class, IData
        {
            IEnumerable<string> errors;

            return TryValidate(typeof(T), out errors);
        }



        public static void Validate(Type interfaceType)
        {
            IEnumerable<string> errors;
            bool res = TryValidate(interfaceType, out errors);

            if (res == false)
            {
                StringBuilder sb = new StringBuilder();

                string errorMessage = StringResourceSystemFacade.GetString("Composite.Management", "DataInterfaceValidator.NotValidIDataInterface");
                sb.AppendLine(string.Format(errorMessage, interfaceType));

                foreach (string error in errors)
                {
                    sb.AppendLine(error);
                }

                throw new ArgumentException(sb.ToString());
            }
        }



        public static void Validate<T>()
            where T : class, IData
        {
            Validate(typeof(T));
        }      
    }
}
