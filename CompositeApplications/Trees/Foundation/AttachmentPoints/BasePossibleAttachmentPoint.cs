using Composite.Elements.Plugins.ElementAttachingProvider;
using Composite.Security;


namespace Composite.Trees.Foundation.AttachmentPoints
{
    internal abstract class BasePossibleAttachmentPoint : IPossibleAttachmentPoint
    {
        public abstract bool IsPossibleAttachmentPoint(EntityToken parentEntityToken);

        public ElementAttachingProviderPosition Position { get; set; }

        public abstract void Log(string title, string indention = "");
    }
}
