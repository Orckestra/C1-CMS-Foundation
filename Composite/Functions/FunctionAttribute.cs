using System;


namespace Composite.Functions
{
    /// <summary>
    /// Adds a desctiotion about a C1 Function.
    /// 
    /// Different C1 Function providers let developers create new C1 Functions by creating artifacts like static funtions in C#,
    /// Razor Web Pages, User Controls etc. These C1 Functions can have descriptions and this attribute let you control this
    /// description.
    /// 
    /// The use of this attribute is relative to the C1 Function provider being used.
    /// </summary>
    /// <example>
    /// Here is an example of how to use <see cref="FunctionAttribute" />:
    /// <code>
    /// [Function(Description="The description goes here")]
    /// public static int GetItemCount() 
    /// { 
    ///     // more code here
    /// }
    /// </code>
    /// </example>
    /// <example>
    /// Here is an example of how to use <see cref="FunctionAttribute" /> to annotate a class:
    /// <code>
    /// [FunctionParameter(Label="Item count", DefaultValue=10)]
    /// public int ItemCount { get; set; } 
    /// </code>
    /// Note that <see cref="P:Composite.Functions.FunctionParameterAttribute.Name" /> is not expected when <see cref="FunctionParameterAttribute" /> is used this way.
    /// </example>
    [AttributeUsage(AttributeTargets.Method | AttributeTargets.Class, AllowMultiple = false)]
	public sealed class FunctionAttribute : Attribute
	{
        /// <summary>
        /// Describe a function for use in the C1 Function system. 
        /// </summary>
        public FunctionAttribute()
        {
        }


        /// <summary>
        /// The description of the function.
        /// </summary>
        public string Description
        {
            get;
            set;
        }
    }
}
