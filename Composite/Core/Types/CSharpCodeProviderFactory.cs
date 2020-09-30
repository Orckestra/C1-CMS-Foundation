using System.CodeDom.Compiler;
using Microsoft.CSharp;

namespace Composite.Core.Types
{
    internal class CSharpCodeProviderFactory
    {
        public static CSharpCodeProvider CreateCompiler()
        {
            return (CSharpCodeProvider)CodeDomProvider.CreateProvider("c#");
        }
    }
}
