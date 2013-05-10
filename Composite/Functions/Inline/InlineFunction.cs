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
    internal class InlineFunction : IFunction, IFunctionInitializationInfo
    {
        protected readonly IInlineFunction _function;
        private IEnumerable<ParameterProfile> _parameterProfile;


        protected InlineFunction(IInlineFunction info, MethodInfo methodInfo)
        {
            Verify.ArgumentNotNull(info, "info");

            _function = info; 
            MethodInfo = methodInfo;
        }



        public static IFunction Create(IInlineFunction info)
        {
            var errors = new StringInlineFunctionCreateMethodErrorHandler();

            MethodInfo methodInfo = InlineFunctionHelper.Create(info, null, errors);

            if (methodInfo == null) return new NotLoadedInlineFunction(info, errors);

            return new InlineFunction(info, methodInfo);
        }



        public virtual object Execute(ParameterList parameters, FunctionContextContainer context)
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



        public virtual Type ReturnType
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




        virtual protected  MethodInfo MethodInfo
        {
            get; set;
        }



        public EntityToken EntityToken
        {
            get
            {
                return _function.GetDataEntityToken();
            }
        }
    
        bool IFunctionInitializationInfo.FunctionInitializedCorrectly
        {
	        get { return true; }
        }
}

    internal class LazyInitializedInlineFunction : InlineFunction, IFunctionInitializationInfo
    {
        private readonly Type _cachedReturnType;

        private bool _initialized;
        private NotLoadedInlineFunction _notLoadedInlineFunction;
        
        public LazyInitializedInlineFunction(IInlineFunction inlineFunction)
            : base(inlineFunction, null)
        {
        }

        public LazyInitializedInlineFunction(IInlineFunction inlineFunction, Type cachedReturnType)
            : base(inlineFunction, null)
        {
            this._cachedReturnType = cachedReturnType;
        }

        public override Type ReturnType
        {
            get
            {
                return _initialized ? base.ReturnType : _cachedReturnType;
            }
        }

        private void EnsureInitialized()
        {
            if (!_initialized)
                lock (this)
                    if (!_initialized)
                    {
                        Initialize();

                        _initialized = true;
                    }
        }

        private void Initialize()
        {
            var errors = new StringInlineFunctionCreateMethodErrorHandler();

            MethodInfo methodInfo = InlineFunctionHelper.Create(_function, null, errors);

            if (methodInfo == null) 
            {
                _notLoadedInlineFunction = new NotLoadedInlineFunction(_function, errors);
            }
            else
            {
                MethodInfo = methodInfo;
            }
        }

        protected override MethodInfo MethodInfo
        {
            get
            {
                EnsureInitialized();

                if (_notLoadedInlineFunction != null)
                {
                    throw new InvalidOperationException("Function hasn't been initialized");
                }

                return base.MethodInfo;
            }
        }

        public override object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (_notLoadedInlineFunction != null)
            {
                return (_notLoadedInlineFunction as IFunction).Execute(parameters, context);
            }

            return base.Execute(parameters, context);
        }

        bool IFunctionInitializationInfo.FunctionInitializedCorrectly
        {
            get
            {
                EnsureInitialized();

                return _notLoadedInlineFunction == null;
            }
        }

    }
}
