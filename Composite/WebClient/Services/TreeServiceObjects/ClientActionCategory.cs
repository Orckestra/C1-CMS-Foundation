namespace Composite.WebClient.Services.TreeServiceObjects
{
    public sealed class ClientActionCategory
    {
        public string GroupId { get; set; }
        public string Name { get; set; }
        public bool IsInToolbar { get; set; }
        public bool IsInFolder { get; set; }
        public string FolderName { get; set; }
    }
}
