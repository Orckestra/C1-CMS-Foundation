using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;
using Composite.C1Console.Security;


namespace Composite.C1Console.Trees.Foundation.AttachmentPoints
{
    internal abstract class BasePossibleAttachmentPoint : IPossibleAttachmentPoint
    {
        public abstract bool IsPossibleAttachmentPoint(EntityToken parentEntityToken);

        public ElementAttachingProviderPosition Position { get; set; }

        public abstract void Log(string title, string indention = "");
    }
}
