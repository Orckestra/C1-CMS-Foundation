namespace Composite.Core.WebClient.Services.TreeServiceObjects
{
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class ClientActionCategory
    {
        public string GroupId { get; set; }
        public string Name { get; set; }
        public bool IsInToolbar { get; set; }
        public bool IsInFolder { get; set; }
        public string FolderName { get; set; }
    }
}
