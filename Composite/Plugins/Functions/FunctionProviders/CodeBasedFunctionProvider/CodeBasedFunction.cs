using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.MethodBasedFunctionProvider;

namespace Composite.Plugins.Functions.FunctionProviders.CodeBasedFunctionProvider
{
    internal class CodeBasedFunction : MethodBasedFunction, IFunction
    {
        public static CodeBasedFunction Create(Type type, string methodName, string userNamespace, string userMethodName, string description)
        {
            var methodInfo = GetMethodInfo(type, methodName, userNamespace, userMethodName, out string _);
            return methodInfo == null ? null : new CodeBasedFunction(type, methodInfo, userNamespace, userMethodName, description);
        }

        protected CodeBasedFunction(Type type, MethodInfo methodInfo, string userNamespace, string userMethodName, string description)
            : base(typeof(CodeBasedFunction).Name)
        {
            Name = userMethodName;
            Namespace = userNamespace;
            Type = type;
            MethodInfo = methodInfo;
            Description = description;
        }
        public override string Description { get; }
        protected override MethodInfo MethodInfo { get; }
        public override string Name { get; }
        public override string Namespace { get; }
        private Type Type { get; }

        public override EntityToken EntityToken => new CodeBasedFunctionEntityToken(this);

        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            IList<object> arguments = new List<object>();
            foreach (ParameterProfile paramProfile in ParameterProfiles)
            {
                arguments.Add(parameters.GetParameter(paramProfile.Name, paramProfile.Type));
            }
            if (MethodInfo.IsStatic)
            {
                return MethodInfo.Invoke(null, arguments.ToArray());
            }

            var serviceObject = ServiceLocator.GetService(Type);
            return serviceObject == null
                ? MethodInfo.Invoke(Activator.CreateInstance(Type), arguments.ToArray())
                : MethodInfo.Invoke(serviceObject, arguments.ToArray());
        }
    }
}