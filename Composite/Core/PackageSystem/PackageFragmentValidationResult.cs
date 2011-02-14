using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Diagnostics;
using System.Xml.Linq;
using Composite.Core.Xml;
using System.Reflection;


namespace Composite.Core.PackageSystem
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DebuggerDisplay("ValidationResult = {ValidationResult}, Message = {Message}")]
	public sealed class PackageFragmentValidationResult
	{
        /// <exclude />
        public PackageFragmentValidationResult(PackageFragmentValidationResultType validationResult, Exception exception)
        {
            if (exception == null) throw new ArgumentNullException("exception");

            if (exception.GetType() == typeof(TargetInvocationException))
            {
                exception = exception.InnerException;
            }

            this.ValidationResult = validationResult;
            this.Message = exception.Message;
            this.Exception = exception;
        }



        /// <exclude />
        public PackageFragmentValidationResult(PackageFragmentValidationResultType validationResult, string message)
            : this(validationResult, message, null)
        {
        }



        /// <exclude />
        public PackageFragmentValidationResult(PackageFragmentValidationResultType validationResult, string message, XObject configurationObject)
        {
            if (string.IsNullOrEmpty(message) == true) throw new ArgumentNullException("message");

            this.ValidationResult = validationResult;
            this.Message = message;

            if (configurationObject != null)
            {
                this.XPath = configurationObject.GetXPath();
            }

            this.Message = message;
        }


        /// <exclude />
        public PackageFragmentValidationResultType ValidationResult { get; private set; }

        /// <exclude />
        public string Message { get; private set; }

        /// <exclude />
        public Exception Exception { get; private set; }

        /// <exclude />
        public string XPath { get; private set; }

        /// <exclude />
        public IEnumerable<PackageFragmentValidationResult> InnerResult { get; set; }
	}
}
