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
    /// Assign this attribute to a data type property to enforce a default value for the property on newly created instanced of your data type.
    /// You specify a serialized C1 Function - this C1 Function will be executed and the result will be written to this property.
    /// </summary>
    /// <example> This sample shows how to use the FunctionBasedNewInstanceDefaultFieldValue attribute.
    /// Here the current date and time is set on the Created property through the use of the C1 Function Composite.Utils.Date.Now.
    /// <code>
    /// // data interface attributes ...
    /// interface IMyDataType : IData
    /// {
    ///     [FunctionBasedNewInstanceDefaultFieldValue(@"&lt;f:function name='Composite.Utils.Date.Now' xmlns:f='http://www.composite.net/ns/function/1.0' /&gt;")]
    ///     [StoreFieldType(PhysicalStoreFieldType.DateTime)]
    ///     [ImmutableFieldId("{D75EA67F-AD14-4BAB-8547-6D87002809F1}")]
    ///     DateTime Created { get; set; }
    ///     
    ///     // more data properties ...
    ///     
    /// }
    /// </code>
    /// </example>    
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false, Inherited = true)]
    public sealed class FunctionBasedNewInstanceDefaultFieldValueAttribute : NewInstanceDefaultFieldValueAttribute
    {
        /// <summary>
        /// Specify a C1 Function call that will provide a default value for this field. The function call is expressed as XML.
        /// Example: &lt;f:function name='Composite.Utils.Date.Now' xmlns:f='http://www.composite.net/ns/function/1.0' /&gt;
        /// </summary>
        /// <param name="functionDescription">Serialized C1 Function call</param>
        public FunctionBasedNewInstanceDefaultFieldValueAttribute(string functionDescription)
        {
            this.FunctionDescription = functionDescription;
        }


        /// <exclude />
        public string FunctionDescription { get; private set; }


        /// <exclude />
        public override bool HasValue
        {
            get { return (string.IsNullOrEmpty(this.FunctionDescription) == false); }
        }


        /// <summary>
        /// Execute the C1 Function defined for this attribute and return the result.
        /// </summary>
        /// <returns>Result of C1 Function call</returns>
        public override object GetValue()
        {
            BaseRuntimeTreeNode node = FunctionFacade.BuildTree(XElement.Parse(this.FunctionDescription));

            return node.GetValue();
        }
    }

}
