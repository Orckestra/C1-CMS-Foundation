namespace Composite.Actions
{
    public sealed class ActionResult
    {
        public ActionResultResponseType ResponseType { get; set; }
        public string Url { get; set; }
    }


    public enum ActionResultResponseType
    {
        None,
        OpenDocument,
        OpenModalDialog
    }
}
