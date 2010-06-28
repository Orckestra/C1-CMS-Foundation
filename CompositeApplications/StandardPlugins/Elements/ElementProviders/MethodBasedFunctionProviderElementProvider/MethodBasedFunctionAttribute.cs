using System;

namespace Composite.StandardPlugins.Elements.ElementProviders.MethodBasedFunctionProviderElementProvider
{
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    [Obsolete("The MethodBasedFunction attribute is no longer required and will be removed. Please remove this attribute from your class.")]
    internal sealed class MethodBasedFunctionAttribute : Attribute
	{
	}
}
