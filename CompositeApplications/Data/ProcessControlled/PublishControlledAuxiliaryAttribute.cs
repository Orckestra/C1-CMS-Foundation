using System;


namespace Composite.Data.ProcessControlled
{
    public class PublishControlledAuxiliaryAttribute : Attribute
    {
        public PublishControlledAuxiliaryAttribute(Type publishControlledAuxiliaryType)
        {
            this.PublishControlledAuxiliaryType = publishControlledAuxiliaryType;
        }



        public Type PublishControlledAuxiliaryType
        {
            get;
            private set;
        }
    }
}
