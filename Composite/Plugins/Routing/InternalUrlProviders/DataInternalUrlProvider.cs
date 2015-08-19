using System;
using System.Linq;
using Composite.Core.Extensions;
using Composite.Core.Routing;
using Composite.Core.Types;
using Composite.Data;

namespace Composite.Plugins.Routing.InternalUrlProviders
{
    class DataInternalUrlProvider : IInternalUrlProvider
    {
        private readonly string _shortTypeName;
        private readonly Type _type;
        //private readonly Type _keyType;

        public DataInternalUrlProvider(string shortTypeName, Type type)
        {
            _type = type;
            //_keyType = type.GetKeyProperties().Single().PropertyType;
            _shortTypeName = shortTypeName;
        }

        public string BuildInternalUrl(IDataReference reference)
        {
            Verify.That(reference.ReferencedType == _type, "Incorrect type of referenced data");

            string serializedKey = ValueTypeConverter.Convert<string>(reference.KeyValue);
            if (string.IsNullOrEmpty(serializedKey))
            {
                return null;
            }

            return "~/{0}({1})".FormatWith(_shortTypeName, serializedKey);
        }
    }
}
