using System.Collections.Generic;
using Composite.Elements.Plugins.ElementAttachingProvider;
using Composite.Security;


namespace Composite.Trees.Foundation.AttachmentPoints
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IBaseAttachmentPoint
    {
        ElementAttachingProviderPosition Position { get; set; }

        void Log(string title, string indention = "");
    }




    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IAttachmentPoint : IBaseAttachmentPoint
    {
        bool IsAttachmentPoint(EntityToken parentEntityToken);                
       
        IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext);
    }
}
