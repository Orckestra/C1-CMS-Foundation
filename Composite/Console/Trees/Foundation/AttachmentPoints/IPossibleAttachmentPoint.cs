using Composite.C1Console.Security;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;


namespace Composite.C1Console.Trees.Foundation.AttachmentPoints
{
    internal interface IPossibleAttachmentPoint : IBaseAttachmentPoint
    {
        bool IsPossibleAttachmentPoint(EntityToken parentEntityToken);        
    }
}
