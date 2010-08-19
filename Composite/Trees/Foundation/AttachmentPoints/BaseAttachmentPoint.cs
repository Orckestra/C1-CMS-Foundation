using System.Collections.Generic;
using Composite.Elements.Plugins.ElementAttachingProvider;
using Composite.Security;


namespace Composite.Trees.Foundation.AttachmentPoints
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class BaseAttachmentPoint : IAttachmentPoint
    {
        public abstract bool IsAttachmentPoint(EntityToken parentEntityToken);
        public ElementAttachingProviderPosition Position { get; set; }
        public abstract IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext);
        public abstract void Log(string title, string indention = "");
    }

}
