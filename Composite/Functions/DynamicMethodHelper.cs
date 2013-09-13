using System;
using System.Reflection;
using System.Reflection.Emit;

namespace Composite.Functions
{
    internal class DynamicMethodHelper
    {
        public delegate object FunctionCall(Func<object> body);

        private static readonly MethodInfo FuncObject_InvokeMethodInfo = typeof(Func<object>).GetMethod("Invoke");

        /// <summary>
        /// Creates a dynamic method with the specified name. To be used for adding information into StackTrace.
        /// </summary>
        public static FunctionCall GetDynamicMethod(string methodName)
        {
            var wrapper = new DynamicMethod(
                methodName,
                typeof(object),
                new[] { typeof(Func<object>) },
                typeof(FunctionFacade).Module);

            var wrapperBody = wrapper.GetILGenerator();

            wrapperBody.Emit(OpCodes.Ldarg_0);
            wrapperBody.EmitCall(OpCodes.Callvirt, FuncObject_InvokeMethodInfo, null);
            wrapperBody.Emit(OpCodes.Ret);

            return (FunctionCall)wrapper.CreateDelegate(typeof(FunctionCall));
        }
    }
}
