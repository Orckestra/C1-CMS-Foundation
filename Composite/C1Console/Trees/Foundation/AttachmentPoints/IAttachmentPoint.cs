using System.Collections.Generic;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;
using Composite.C1Console.Security;


namespace Composite.C1Console.Trees.Foundation.AttachmentPoints
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IBaseAttachmentPoint
    {
        /// <exclude />
        ElementAttachingProviderPosition Position { get; set; }

        /// <exclude />
        void Log(string title, string indention = "");
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IAttachmentPoint : IBaseAttachmentPoint
    {
        /// <exclude />
        bool IsAttachmentPoint(EntityToken parentEntityToken);

        /// <exclude />
        IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext);
    }
}
