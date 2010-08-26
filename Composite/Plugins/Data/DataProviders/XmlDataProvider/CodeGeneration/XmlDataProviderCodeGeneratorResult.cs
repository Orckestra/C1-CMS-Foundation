using System;
using System.Collections.Generic;
using System.Text;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider.CodeGeneration
{
    internal sealed class XmlDataProviderCodeGeneratorResult
    {
        private Dictionary<Type, XmlDataProviderCodeGeneratorStoreResult> _storeResults = new Dictionary<Type, XmlDataProviderCodeGeneratorStoreResult>();
        private List<KeyValuePair<Type, List<string>>> _storeErrors = new List<KeyValuePair<Type, List<string>>>();

        public IEnumerable<Type> ConfiguredInterfaceTypes { get; internal set; }
        public IEnumerable<Type> AllInterfaceTypes { get; internal set; }


        public XmlDataProviderCodeGeneratorStoreResult GetInterfaceResult(Type interfaceType)
        {
            XmlDataProviderCodeGeneratorStoreResult result;

            if (_storeResults.TryGetValue(interfaceType, out result) == false)
            {
                throw new ArgumentException(string.Format("The interface type '{0}' is not supported", interfaceType));
            }

            List<string> errors = this.GetErrors(interfaceType);
            if (errors != null)
            {
                StringBuilder sb = new StringBuilder();
                sb.AppendLine(string.Format("The interface type '{0}' was not configured correctly with the following errors:", interfaceType));
                foreach (string error in errors)
                {
                    sb.AppendLine(error);
                }

                throw new InvalidOperationException(sb.ToString());
            }

            return result;
        }


        public List<string> GetErrors(Type interfaceType)
        {
            List<string> errors = null;

            foreach (KeyValuePair<Type, List<string>> kvp in _storeErrors)
            {
                if (kvp.Key == interfaceType)
                {
                    if (errors == null)
                    {
                        errors = new List<string>();
                    }

                    errors.AddRange(kvp.Value);
                }
            }

            return errors;
        }


        internal void AddStoreResult(Type interfaceType, XmlDataProviderCodeGeneratorStoreResult storeResult)
        {
            _storeResults.Add(interfaceType, storeResult);
        }



        internal void AddStoreError(Type interfaceType, List<string> errors)
        {
            List<string> errorList = null;
            foreach (KeyValuePair<Type, List<string>> kvp in _storeErrors)
            {
                if (kvp.Key == interfaceType)
                {
                    errorList = kvp.Value;
                }
            }

            if (errorList == null)
            {
                _storeErrors.Add(new KeyValuePair<Type, List<string>>(interfaceType, errors));
            }
            else
            {
                errorList.AddRange(errors);
            }
        }
    }
}
