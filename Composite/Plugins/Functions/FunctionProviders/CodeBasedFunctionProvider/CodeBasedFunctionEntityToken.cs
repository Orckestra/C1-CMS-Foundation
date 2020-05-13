using Composite.C1Console.Security;
using Composite.Functions;

namespace Composite.Plugins.Functions.FunctionProviders.CodeBasedFunctionProvider
{
    [SecurityAncestorProvider(typeof(StandardFunctionSecurityAncestorProvider))]
    internal class CodeBasedFunctionEntityToken : EntityToken
    {
        internal CodeBasedFunctionEntityToken(CodeBasedFunction function)
        {
            Id = string.Concat(function.Namespace, ".", function.Name);
        }

        public CodeBasedFunctionEntityToken(string fullName)
        {
            Id = fullName;
        }

        public override string Id { get; }
        public static EntityToken Deserialize(string serializedData)
        {
            DoDeserialize(serializedData, out _, out _, out var id);
            return new CodeBasedFunctionEntityToken(id);
        }
        public override string Serialize() => DoSerialize();

        public override string Source => string.Empty;

        public override string Type => string.Empty;
    }
}