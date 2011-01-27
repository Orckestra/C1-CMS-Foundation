using System;


namespace Composite.C1Console.Forms
{
    /// <summary>
    /// If the "inner value" is a bindings read, then this defines an property that will be assigned to.
    /// This is an overload/special case handling of <see cref="ControlValuePropertyAttribute"/>
    /// </summary>
    [AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
    internal sealed class ReadBindingControlValueOverload : Attribute
    {
        public ReadBindingControlValueOverload(string propertyName)
        {
            this.PropertyName = propertyName;
        }

        public string PropertyName
        {
            get;
            private set;
        }
    }
}
