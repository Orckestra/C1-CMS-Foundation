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

        public StringInlineFunctionCreateMethodErrorHandler()
        {
            _hasErrors = false;
            this.CompileErrors = new List<Tuple<int, string, string>>();
        }


        public List<Tuple<int, string, string>> CompileErrors { get; set; }
        public string MissingContainerType { get; set; }
        public string NamespaceMismatch { get; set; }
        public string MissionMethod { get; set; }


        public override bool HasErrors { get { return _hasErrors; } }


        public override void OnCompileError(int line, string errorNumber, string message)
        {
            _hasErrors = true;
            this.CompileErrors.Add(new Tuple<int, string, string>(line, errorNumber, message));
        }


        public override void OnMissingContainerType(string message)
        {
            _hasErrors = true;
            this.MissingContainerType = message;
        }


        public override void OnNamespaceMismatch(string message)
        {
            _hasErrors = true;
            this.NamespaceMismatch = message;
        }


        public override void OnMissionMethod(string message)
        {
            _hasErrors = true;
            this.MissionMethod = message;
        }
    }
}
