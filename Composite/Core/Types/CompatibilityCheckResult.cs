using System;
using System.CodeDom.Compiler;
using Composite.Core.Extensions;


namespace Composite.Core.Types
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
	public class CompatibilityCheckResult
	{
        internal CompatibilityCheckResult()
        {
            Successful = true;
        }

        internal CompatibilityCheckResult(CompilerResults compilerResults)
        {
            Successful = !compilerResults.Errors.HasErrors;
            CompilerResults = compilerResults;
        }

        public bool Successful { get; private set; }

        public CompilerResults CompilerResults { get; private set; }

	    public string ErrorMessage
	    {
	        get
	        {
                var compilationErrors = CompilerResults.Errors;
                if (compilationErrors.HasErrors)
                {
                    for(int i=0; i<compilationErrors.Count; i++)
                    {
                        if(!compilationErrors[i].IsWarning)
                        {
                            CompilerError firstError = compilationErrors[i];
                            return "(File name: '{0}', line: {1}, column: {2}, message: {3})".FormatWith(firstError.FileName, firstError.Line, firstError.Column, firstError.ErrorText);
                        }
                    }
                    throw new InvalidOperationException("Failed to parse error");
                    
                }
	            return string.Empty;
	        }
	    }
	}
}
