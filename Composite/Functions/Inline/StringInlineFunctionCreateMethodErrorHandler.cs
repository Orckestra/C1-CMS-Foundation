using System;
using System.Collections.Generic;


namespace Composite.Functions.Inline
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class StringInlineFunctionCreateMethodErrorHandler : InlineFunctionCreateMethodErrorHandler
    {
        bool _hasErrors;

        /// <exclude />
        public StringInlineFunctionCreateMethodErrorHandler()
        {
            _hasErrors = false;
            this.CompileErrors = new List<Tuple<int, string, string>>();
        }


        /// <exclude />
        public List<Tuple<int, string, string>> CompileErrors { get; set; }

        /// <exclude />
        public string MissingContainerType { get; set; }

        /// <exclude />
        public string NamespaceMismatch { get; set; }

        /// <exclude />
        public string MissionMethod { get; set; }

        /// <exclude />
        public Exception LoadingException { get; set; }

        /// <exclude />
        public override bool HasErrors { get { return _hasErrors; } }


        /// <exclude />
        public override void OnCompileError(int line, string errorNumber, string message)
        {
            _hasErrors = true;
            this.CompileErrors.Add(new Tuple<int, string, string>(line, errorNumber, message));
        }


        /// <exclude />
        public override void OnMissingContainerType(string message)
        {
            _hasErrors = true;
            this.MissingContainerType = message;
        }


        /// <exclude />
        public override void OnNamespaceMismatch(string message)
        {
            _hasErrors = true;
            this.NamespaceMismatch = message;
        }


        /// <exclude />
        public override void OnMissionMethod(string message)
        {
            _hasErrors = true;
            this.MissionMethod = message;
        }


        /// <exclude />
        public override void OnLoadSourceError(Exception exception)
        {
            _hasErrors = true;
            LoadingException = exception;
        }
    }
}
