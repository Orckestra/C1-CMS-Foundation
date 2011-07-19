using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Composite.C1Console.Security;
using Composite.Core.Linq;
using Composite.Data;
using Composite.Data.Types;
using Composite.Functions.ManagedParameters;


namespace Composite.Functions.Inline
{
    internal sealed class InlineFunction : IFunction
    {
        private IInlineFunction _function;
        private MethodInfo _methodInfo;
        private IEnumerable<ParameterProfile> _parameterProfile = null;


        private InlineFunction(IInlineFunction info, MethodInfo methodInfo)
        {
            if (info == null) throw new ArgumentNullException("info");
            if (methodInfo == null) throw new ArgumentNullException("methodInfo");

            _function = info;
            _methodInfo = methodInfo;
        }



        public static IFunction Create(IInlineFunction info)
        {
            MethodInfo methodInfo = InlineFunctionHelper.Create(info);

            if (methodInfo == null) return new NotLoadedInlineFunction(info, "Function weren't loaded correctly, check log for details");

            return new InlineFunction(info, methodInfo);
        }



        public object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            IList<object> arguments = new List<object>();
            foreach (ParameterProfile paramProfile in ParameterProfiles)
            {
                arguments.Add(parameters.GetParameter(paramProfile.Name, paramProfile.Type));
            }

            return this.MethodInfo.Invoke(null, arguments.ToArray());
        }



        public string Name
        {
            get { return _function.Name; }
        }



        public string Namespace
        {
            get { return _function.Namespace; }
        }



        public string Description 
        { 
            get 
            {
                return _function.Description;
            } 
        }



        public Type ReturnType
        {
            get { return MethodInfo.ReturnType; }
        }



        public IEnumerable<ParameterProfile> ParameterProfiles
        {
            get
            {
                if (_parameterProfile == null)
                {
                    _parameterProfile = ManagedParameterManager.GetParameterProfiles(_function.Id).Evaluate();
                }

                return _parameterProfile;
            }
        }




        private MethodInfo MethodInfo
        {
            get
            {
                return _methodInfo;
            }
        }



        public EntityToken EntityToken
        {
            get
            {
                return _function.GetDataEntityToken();
            }
        }
    }   
}
