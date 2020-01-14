using System;
using System.Collections.Generic;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Xml.Linq;
using Composite.Core;
using Composite.Core.Types;
using Composite.Core.Xml;

namespace Composite.Functions
{
    /// <summary>    
    /// Context for evaluating function calls. Functions:
    /// 1) Container for embedded <see cref="Control"/>-s 
    /// 2) Passing parameters into nested function calls. Applicable in xml template rendering logic.
    /// 3) Suppressing exceptions from XHTML functions.
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public sealed class FunctionContextContainer
    {
        private readonly ParameterList _parameterList;
        private readonly Dictionary<string, object> _parameterDictionary;

        internal bool ExceptionsSuppressed { get; private set; }

        #region constructors
        /// <exclude />
        public FunctionContextContainer()
        {
        }



        /// <exclude />
        public FunctionContextContainer(ParameterList parameterList)
        {
            _parameterList = parameterList;
        }



        /// <exclude />
        public FunctionContextContainer(Dictionary<string, object> parameterDictionary)
        {
            _parameterDictionary = parameterDictionary;
        }



        /// <exclude />
        public FunctionContextContainer(FunctionContextContainer inheritFromContainer, Dictionary<string, object> parameterDictionary)
        {
            _parameterDictionary = parameterDictionary;
            this.XEmbedableMapper = inheritFromContainer.XEmbedableMapper;
            this.SuppressXhtmlExceptions = inheritFromContainer.SuppressXhtmlExceptions;
        }
        #endregion



        /// <summary>
        /// Used for embedding ASP.NET controls into xhtml markup.
        /// </summary>
        public IFunctionResultToXEmbedableMapper XEmbedableMapper { get; set; }

        /// <summary>
        /// When set to <value>True</value>, exceptions from C1 functions which results are rendered into xhtml will 
        /// be caught, logged and the result xhtml  will contain an error description element.
        /// </summary>
        public bool SuppressXhtmlExceptions { get; set; }

        /// <exclude />
        public object GetParameterValue(string parameterName, Type targetType)
        {
            Verify.ArgumentNotNullOrEmpty(parameterName, "parameterName");

            if (_parameterList != null)
            {
                return _parameterList.GetParameter(parameterName, targetType);
            }

            if (_parameterDictionary != null)
            {
                Verify.That(_parameterDictionary.ContainsKey(parameterName), "Parameter '{0}' hasn't been defined.", parameterName);

                object value = _parameterDictionary[parameterName];

                if (value != null && !targetType.IsInstanceOfType(value))
                {
                    return ValueTypeConverter.Convert(value, targetType);
                }

                return value;
            }

            throw new InvalidOperationException("Unable to get parameter values. This context has been constructed without parameters.");
        }



        /// <exclude />
        public object MakeXEmbedable(object resultObject)
        {
            if (this.XEmbedableMapper != null)
            {
                XNode resultElement;
                if (this.XEmbedableMapper.TryMakeXEmbedable(this, resultObject, out resultElement))
                {
                    return resultElement;
                }
            }

            if (resultObject is XDocument)
            {
                return ((XDocument)resultObject).Root;
            }

            return resultObject;
        }

        /// <summary>
        /// Checks whether an exception has to be re-thrown, if not - writes it to the log 
        /// and returns markup that should be inserted as function's result.
        /// </summary>
        /// <param name="functionName">The name of the function</param>
        /// <param name="exception">The exception</param>
        /// <param name="logTitle">The log entry title.</param>
        /// <param name="errorBoxHtml">The markup that should be inserted instead of the function call</param>
        /// <returns><value>True</value> if the exception has to be re-thrown, <value>False</value> otherwise.</returns>
        public bool ProcessException(string functionName, Exception exception, string logTitle, out XElement errorBoxHtml)
        {
            if (!SuppressXhtmlExceptions
                || exception is ThreadAbortException 
                || exception is ThreadInterruptedException 
                || exception is AppDomainUnloadedException
                || exception is OutOfMemoryException
                || IsHttpException(exception))
            {
                errorBoxHtml = null;
                return false;
            }

            Log.LogError("Function: " + functionName, exception);

            errorBoxHtml = XhtmlErrorFormatter.GetErrorDescriptionHtmlElement(exception, functionName);
            ExceptionsSuppressed = true;

            return true;
        }

        private bool IsHttpException(Exception exception)
        {
            return (!(exception is HttpCompileException) && exception is HttpException) || (exception.InnerException != null && IsHttpException(exception.InnerException));
        }
    }
}
