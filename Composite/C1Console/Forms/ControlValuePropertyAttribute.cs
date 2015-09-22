using System;


namespace Composite.C1Console.Forms
{
    /// <summary>
    /// Defines the default property of a UiControl that "inner values" will be assigned to.
    /// </summary>
    [AttributeUsage(AttributeTargets.Class,AllowMultiple=false,Inherited=true)]
    internal sealed class ControlValuePropertyAttribute : Attribute
    {
        public ControlValuePropertyAttribute(string propertyName)
        {
            _propertyName = propertyName;
        }

        private readonly string _propertyName;

        public string PropertyName
        {
            get { return _propertyName; }
        }
    }
}
