namespace Composite.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class FlowToken
    {
        public virtual string Serialize() { return ""; }
    }
}
