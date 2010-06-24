using System.Collections.Generic;
using Composite.Elements.Plugins.ElementAttachingProvider;
using Composite.Security;


namespace Composite.Trees.Foundation.AttachmentPoints
{
    internal abstract class BaseAttachmentPoint : IAttachmentPoint
    {
        public abstract bool IsAttachmentPoint(EntityToken parentEntityToken);
        public ElementAttachingProviderPosition Position { get; set; }
        public abstract IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext);
        public abstract void Log(string title, string indention = "");
    }

}
