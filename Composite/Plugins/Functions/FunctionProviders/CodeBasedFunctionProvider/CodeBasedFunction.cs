using System;
using System.Collections.Generic;
using System.Reflection;
using Composite.C1Console.Security;
using Composite.Core;
using Composite.Functions;
using Composite.Plugins.Functions.FunctionProviders.MethodBasedFunctionProvider;
using Microsoft.Extensions.DependencyInjection;

namespace Composite.Plugins.Functions.FunctionProviders.CodeBasedFunctionProvider
{
    internal class CodeBasedFunction : MethodBasedFunction
    {
        public static CodeBasedFunction Create(Type type, string methodName, string userNamespace, string userMethodName, string description)
        {
            var methodInfo = GetMethodInfo(type, methodName, userNamespace, userMethodName, out _);

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
            var arguments = new List<object>();
            foreach (ParameterProfile paramProfile in ParameterProfiles)
            {
                arguments.Add(parameters.GetParameter(paramProfile.Name, paramProfile.Type));
            }

            var instance = MethodInfo.IsStatic ? null : ActivatorUtilities.GetServiceOrCreateInstance(ServiceLocator.ServiceProvider, Type);

            return MethodInfo.Invoke(instance, arguments.ToArray());
        }
    }
}