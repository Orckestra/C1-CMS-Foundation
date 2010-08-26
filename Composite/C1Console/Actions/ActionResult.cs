namespace Composite.C1Console.Actions
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ActionResult
    {
        public ActionResultResponseType ResponseType { get; set; }
        public string Url { get; set; }
    }



    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public enum ActionResultResponseType
    {
        None,
        OpenDocument,
        OpenModalDialog
    }
}
