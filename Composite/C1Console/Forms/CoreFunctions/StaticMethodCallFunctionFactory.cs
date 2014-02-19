using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Forms.Plugins.FunctionFactory;
using Composite.Core.Types;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration;
using Microsoft.Practices.EnterpriseLibrary.Common.Configuration.ObjectBuilder;


namespace Composite.C1Console.Forms.CoreFunctions
{
    [ControlValueProperty("Parameters")]
    internal sealed class StaticMethodCall : IFormFunction
    {
        public StaticMethodCall()
        {
            this.Parameters = null;
        }

        [FormsProperty()]
        public Type Type { get; set; }

        [FormsProperty()]
        public string Method { get; set; }

        [FormsProperty()]
        public Object Parameters { 
            get; 
            set; }

        public object Execute()
        {
            MethodInfo methodToCall;
            List<object> preparedParameters = new List<object>();
            object result;

            try
            {
                methodToCall = this.Type.GetMethod(this.Method, BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static);

                if (methodToCall == null) throw new InvalidOperationException("No such method found");
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(string.Format("Failed to locate a static method named '{0}' on the type '{1}'", this.Method, this.Type.FullName), ex);
            }

            ParameterInfo[] parameterInfos = methodToCall.GetParameters();

            if (parameterInfos != null && parameterInfos.Length > 0)
            {
                if (this.Parameters == null)
                {
                    throw new InvalidOperationException(string.Format("Missing parameters for static method named '{0}' on the type '{1}'.", this.Method, this.Type.FullName));
                }

                if (parameterInfos.Length > 1)
                {
                    throw new InvalidOperationException(string.Format("Static method named '{0}' on the type '{1}' take more than one parameter which is not supported.", this.Method, this.Type.FullName));
                }

                var parameterInfo = parameterInfos.First();

                object currentSuppliedParameter = this.Parameters;

                if (currentSuppliedParameter == null)
                {
                    preparedParameters.Add(null);
                }
                else
                {
                    if (currentSuppliedParameter.GetType() == parameterInfo.ParameterType)
                    {
                        preparedParameters.Add(currentSuppliedParameter);
                    }
                    else
                    {
                        var converted = ValueTypeConverter.Convert(currentSuppliedParameter, parameterInfo.ParameterType);
                        preparedParameters.Add(converted);
                    }
                }
            }
            else
            {
                if (this.Parameters != null)
                {
                    throw new InvalidOperationException(string.Format("Parameters were supplied for static method named '{0}' on the type '{1}'. This method takes no parameters", this.Method, this.Type.FullName));
                }
            }

            try
            {
                result = methodToCall.Invoke(null, preparedParameters.ToArray());
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException(string.Format("Failed while executing static method '{0}' on the type '{1}'.", this.Method, this.Type.FullName), ex);
            }

            return result;
        }

    }


    [ConfigurationElementType(typeof(StaticMethodCallFunctionFactoryData))]
    internal sealed class StaticMethodCallFunctionFactory : IFormFunctionFactory
    {
        public IFormFunction CreateFunction()
        {
            return new StaticMethodCall();
        }
    }


    [Assembler(typeof(NonConfigurableFunctionFactoryAssembler))]
    internal sealed class StaticMethodCallFunctionFactoryData : FunctionFactoryData
    {
    }
}
