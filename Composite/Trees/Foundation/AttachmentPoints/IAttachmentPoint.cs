using System.Collections.Generic;
using Composite.Elements.Plugins.ElementAttachingProvider;
using Composite.Security;


namespace Composite.Trees.Foundation.AttachmentPoints
{
    internal interface IBaseAttachmentPoint
    {
        ElementAttachingProviderPosition Position { get; set; }

        void Log(string title, string indention = "");
    }



    internal interface IAttachmentPoint : IBaseAttachmentPoint
    {
        bool IsAttachmentPoint(EntityToken parentEntityToken);                
       
        IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext);
    }
}
