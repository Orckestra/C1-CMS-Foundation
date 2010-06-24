using System;


namespace Composite.Security
{
    /// <summary>
    /// If this attribute is specified on an ActionToken, then the action will ignore EntityToken locking
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public sealed class IgnoreEntityTokenLocking : Attribute
	{
	}
}
