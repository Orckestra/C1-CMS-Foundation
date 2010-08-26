using Composite.C1Console.Elements;


namespace Composite.C1Console.Trees.Foundation.AttachmentPoints
{
    internal interface INamedAttachmentPoint : IBaseAttachmentPoint
    {
        AttachingPoint AttachingPoint { get; set; }
    }
}
