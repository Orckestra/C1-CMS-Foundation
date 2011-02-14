namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ActionResult
    {
        /// <exclude />
        public ActionResultResponseType ResponseType { get; set; }

        /// <exclude />
        public string Url { get; set; }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum ActionResultResponseType
    {
        /// <exclude />
        None,

        /// <exclude />
        OpenDocument,

        /// <exclude />
        OpenModalDialog
    }
}
