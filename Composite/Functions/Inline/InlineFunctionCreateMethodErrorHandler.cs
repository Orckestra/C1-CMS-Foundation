

namespace Composite.Functions.Inline
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class InlineFunctionCreateMethodErrorHandler
    {
        public virtual bool HasErrors { get { return false; } }
        public virtual void OnCompileError(int line, string errorNumber, string message) { }
        public virtual void OnMissingContainerType(string message) { }
        public virtual void OnNamespaceMismatch(string message) { }
        public virtual void OnMissionMethod(string message) { }
    }
}
