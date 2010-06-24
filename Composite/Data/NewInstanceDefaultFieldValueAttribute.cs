using System;
using System.Xml.Linq;
using Composite.Functions;



namespace Composite.Data
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public abstract class NewInstanceDefaultFieldValueAttribute : Attribute
    {
        public abstract bool HasValue { get; }


        public abstract object GetValue();
    }



    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class FunctionBasedNewInstanceDefaultFieldValueAttribute : NewInstanceDefaultFieldValueAttribute
    {
        public string FunctionDescription { get; private set; }


        public FunctionBasedNewInstanceDefaultFieldValueAttribute(string functionDescription)
        {
            this.FunctionDescription = functionDescription;
        }


        public override bool HasValue
        {
            get { return (string.IsNullOrEmpty(this.FunctionDescription) == false); }
        }


        public override object GetValue()
        {
            BaseRuntimeTreeNode node = FunctionFacade.BuildTree(XElement.Parse(this.FunctionDescription));

            return node.GetValue();
        }
    }

}
