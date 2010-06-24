using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;


namespace Composite.EventSystem
{
    /// <summary>
    /// This attribute registres a method that can be called to make a local flush
    /// </summary>
    [AttributeUsage(AttributeTargets.Class)]
    public class FlushAttribute : Attribute
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="methodName">The name of the method to call when doing a local flush. Must be of type: static void() </param>
        public FlushAttribute(string methodName)
        {
            this.MethodName = methodName;            
        }


        public string MethodName { get; private set; }
    }
}
