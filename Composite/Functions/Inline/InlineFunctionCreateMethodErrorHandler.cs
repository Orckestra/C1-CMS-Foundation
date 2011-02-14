

namespace Composite.Functions.Inline
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)]
    public class InlineFunctionCreateMethodErrorHandler
    {
        /// <exclude />
        public virtual bool HasErrors { get { return false; } }

        /// <exclude />
        public virtual void OnCompileError(int line, string errorNumber, string message) { }

        /// <exclude />
        public virtual void OnMissingContainerType(string message) { }

        /// <exclude />
        public virtual void OnNamespaceMismatch(string message) { }

        /// <exclude />
        public virtual void OnMissionMethod(string message) { }
    }
}
