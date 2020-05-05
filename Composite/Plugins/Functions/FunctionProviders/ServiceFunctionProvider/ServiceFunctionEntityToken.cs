using System;
using Composite.C1Console.Security;
using Composite.Functions;

namespace Composite.Plugins.Functions.FunctionProviders.ServiceFunctionProvider
{
    [SecurityAncestorProvider(typeof(StandardFunctionSecurityAncestorProvider))]
    internal class ServiceFunctionEntityToken : EntityToken
    {
        public override string Id { get; }

        public override string Source => string.Empty;

        public override string Type => string.Empty;

        internal ServiceFunctionEntityToken(ServiceMethodFunction function)
        {
            Id = function.Namespace + "." + function.Name;
        }

        public ServiceFunctionEntityToken(string fullName)
        {
            Id = fullName;
        }

        public override string Serialize()
        {
            return DoSerialize();
        }

        public static EntityToken Deserialize(string serializedData)
        {
            string _;
            DoDeserialize(serializedData, out _, out _, out var id);

            return new ServiceFunctionEntityToken(id);
        }
    }
}
