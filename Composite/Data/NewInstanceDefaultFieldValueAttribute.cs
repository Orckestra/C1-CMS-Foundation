using System;
using System.Xml.Linq;
using Composite.Functions;



namespace Composite.Data
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public abstract class NewInstanceDefaultFieldValueAttribute : Attribute
    {
        /// <exclude />
        public abstract bool HasValue { get; }


        /// <exclude />
        public abstract object GetValue();
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class FunctionBasedNewInstanceDefaultFieldValueAttribute : NewInstanceDefaultFieldValueAttribute
    {
        /// <exclude />
        public string FunctionDescription { get; private set; }


        /// <exclude />
        public FunctionBasedNewInstanceDefaultFieldValueAttribute(string functionDescription)
        {
            this.FunctionDescription = functionDescription;
        }


        /// <exclude />
        public override bool HasValue
        {
            get { return (string.IsNullOrEmpty(this.FunctionDescription) == false); }
        }


        /// <exclude />
        public override object GetValue()
        {
            BaseRuntimeTreeNode node = FunctionFacade.BuildTree(XElement.Parse(this.FunctionDescription));

            return node.GetValue();
        }
    }

}
