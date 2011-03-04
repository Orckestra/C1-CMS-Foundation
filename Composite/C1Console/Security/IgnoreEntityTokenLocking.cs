using System;


namespace Composite.C1Console.Security
{
    /// <summary>
    /// If this attribute is specified on an ActionToken, then the action will ignore EntityToken locking
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public sealed class IgnoreEntityTokenLocking : Attribute
	{
	}
}
