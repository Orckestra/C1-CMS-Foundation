using Composite.Elements;


namespace Composite.Trees.Foundation.AttachmentPoints
{
    internal interface INamedAttachmentPoint : IBaseAttachmentPoint
    {
        AttachingPoint AttachingPoint { get; set; }
    }
}
