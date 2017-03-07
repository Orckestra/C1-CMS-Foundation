using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Web;
using System.Xml.Linq;
using Composite.Core.Xml;
using Composite.C1Console.Security;



namespace Composite.Functions.Foundation.PluginFacades
{
    /// <summary>
    /// This class is used for catching exceptions from plugins and handling them correctly
    /// </summary>
    [DebuggerDisplay("Name = {Name}, Namespace = {Namespace}")]
    internal sealed class FunctionWrapper : IDowncastableFunction, ICompoundFunction, IFunctionInitializationInfo
    {
        private static readonly string LogTitle = typeof (FunctionWrapper).Name;
        private readonly IFunction _functionToWrap;


        internal FunctionWrapper(IFunction functionToWrap)
        {
            _functionToWrap = functionToWrap;
        }


        public IFunction InnerFunction
        {
            get { return _functionToWrap; }
        }


        public string Name
        {
            get
            {
                return _functionToWrap.Name;
            }
        }



        public string Namespace
        {
            get
            {
                return _functionToWrap.Namespace;
            }
        }



        public string Description
        {
            get
            {
                return _functionToWrap.Description;
            }
        }



        public Type ReturnType
        {
            get
            {
                return _functionToWrap.ReturnType;
            }
        }



        public IEnumerable<ParameterProfile> ParameterProfiles
        {
            get
            {
                if (_functionToWrap.ParameterProfiles == null)
                {
                    return new ParameterProfile[0];
                }

                return _functionToWrap.ParameterProfiles;
            }
        }




        public object Execute(ParameterList parameters, FunctionContextContainer context)
        {
            try
            {
                var dynamicMethod = DynamicMethodHelper.GetDynamicMethod("<C1 function> " + _functionToWrap.CompositeName());

                return dynamicMethod(() => _functionToWrap.Execute(parameters, context));
            }
            catch (Exception ex)
            {
                if (_functionToWrap.ReturnType == typeof(XhtmlDocument) || (_functionToWrap.ReturnType == typeof(void) && ex is HttpCompileException))
                {
                    XElement errorBoxHtml;
                    if (context.ProcessException(_functionToWrap.CompositeName(), ex, LogTitle, out errorBoxHtml))
                    {
                        XhtmlDocument errorInfoDocument = new XhtmlDocument();
                        errorInfoDocument.Body.Add(errorBoxHtml);
                        return errorInfoDocument;
                    }
                }
                
                throw;
            }
        }

        public EntityToken EntityToken
        {
            get
            {
                return _functionToWrap.EntityToken;
            }
        }

        public bool ReturnValueIsDowncastable
        {
            get
            {
                if (_functionToWrap is IDowncastableFunction)
                {
                    return ((IDowncastableFunction)_functionToWrap).ReturnValueIsDowncastable;
                }
                
                return false;
            }
        }


        public bool AllowRecursiveCall
        {
            get
            {
                return _functionToWrap is ICompoundFunction
                    && (_functionToWrap as ICompoundFunction).AllowRecursiveCall;
            }
        }


        bool IFunctionInitializationInfo.FunctionInitializedCorrectly
        {
            get
            {
                if(!(_functionToWrap is IFunctionInitializationInfo))
                {
                    return true;
                }
                return ((IFunctionInitializationInfo) _functionToWrap).FunctionInitializedCorrectly;
            }
        }
    }
}
