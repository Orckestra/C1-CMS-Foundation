using Composite.Security;
using Composite.Elements.Plugins.ElementAttachingProvider;


namespace Composite.Trees.Foundation.AttachmentPoints
{
    internal interface IPossibleAttachmentPoint : IBaseAttachmentPoint
    {
        bool IsPossibleAttachmentPoint(EntityToken parentEntityToken);        
    }
}
