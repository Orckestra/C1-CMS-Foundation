using System.Collections.Generic;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;
using Composite.C1Console.Security;


namespace Composite.C1Console.Trees.Foundation.AttachmentPoints
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public abstract class BaseAttachmentPoint : IAttachmentPoint
    {
        /// <exclude />
        public abstract bool IsAttachmentPoint(EntityToken parentEntityToken);

        /// <exclude />
        public ElementAttachingProviderPosition Position { get; set; }

        /// <exclude />
        public abstract IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext);

        /// <exclude />
        public abstract void Log(string title, string indention = "");
    }

}
