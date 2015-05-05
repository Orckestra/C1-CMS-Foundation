using System;
using System.Collections.Generic;
using System.IO;
using Composite.Core.Configuration;
using Composite.Core.Extensions;
using Composite.Core.IO;
using Composite.Core.Xml;
using Composite.Data;
using Composite.Data.Types;

namespace Composite.Functions.Inline
{
    internal class NotLoadedInlineFunction : IFunction, IFunctionInitializationInfo
    {
        private readonly IInlineFunction _function;
        private string[] _sourceCode;

        private readonly StringInlineFunctionCreateMethodErrorHandler _errors;

        public NotLoadedInlineFunction(IInlineFunction functionInfo, StringInlineFunctionCreateMethodErrorHandler errors)
        {
            Verify.ArgumentCondition(errors.HasErrors, "errors", "No errors information provided");

            _function = functionInfo;
            _errors = errors;
        }

        object IFunction.Execute(ParameterList parameters, FunctionContextContainer context)
        {
            if (_errors.CompileErrors.Count > 0)
            {
                var error = _errors.CompileErrors[0];
                var exception = new InvalidOperationException("{1} Line {0}: {2}".FormatWith(error.Item1, error.Item2, error.Item3));

                if (_sourceCode == null)
                {
                    string filepath = Path.Combine(PathUtil.Resolve(GlobalSettingsFacade.InlineCSharpFunctionDirectory), _function.CodePath);

                    if (C1File.Exists(filepath))
                    {
                        _sourceCode = C1File.ReadAllLines(filepath);
                    }
                    else
                    {
                        _sourceCode = new string[0];
                    }
                }
                
                if (_sourceCode.Length > 0)
                {
                    XhtmlErrorFormatter.EmbedSourceCodeInformation(exception, _sourceCode, error.Item1);
                }

                throw exception;
            }

            if (_errors.LoadingException != null)
            {
                throw _errors.LoadingException;
            }

            throw new InvalidOperationException("Function wasn't loaded due to compilation errors");
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
                if (_errors.CompileErrors.Count > 0)
                {
                    var error = _errors.CompileErrors[0];
                    return "{1} Line {0}: {2}".FormatWith(error.Item1, error.Item2, error.Item3);
                }

                if (_errors.LoadingException != null)
                {
                    return _errors.LoadingException.Message;
                }

                return _function.Description;
            }
        }

        Type IMetaFunction.ReturnType
        {
            get { return typeof(void); }
        }

        IEnumerable<ParameterProfile> IMetaFunction.ParameterProfiles
        {
            get
            {
                return new ParameterProfile[0];
            }
        }

        bool IFunctionInitializationInfo.FunctionInitializedCorrectly
        {
            get { return false; }
        }


        public C1Console.Security.EntityToken EntityToken
        {
            get { return _function.GetDataEntityToken(); }
        }
    }
}
