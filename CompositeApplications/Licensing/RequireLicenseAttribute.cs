using System;


namespace Composite.Licensing
{
    /// <summary>
    /// IData and Plugins types decorated with this attribute will be checked if maybe used in system
    /// according to licence.
    /// </summary>
    [Obsolete]
    [AttributeUsage(AttributeTargets.Interface | AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    public sealed class RequireLicenseAttribute : Attribute
    {
        public RequireLicenseAttribute()
        {
        }
    }
}
