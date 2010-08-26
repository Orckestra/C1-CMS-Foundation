using System.Collections.Generic;
using Composite.C1Console.Elements;
using Composite.Core.Logging;
using Composite.C1Console.Security;


namespace Composite.C1Console.Trees.Foundation.AttachmentPoints
{
    internal sealed class NamedAttachmentPoint : BaseAttachmentPoint, INamedAttachmentPoint
    {
        public AttachingPoint AttachingPoint { get; set; }


        public override IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext) 
        { 
            yield return this.AttachingPoint.EntityToken; 
        }


        public override bool IsAttachmentPoint(EntityToken parentEntityToken)
        {
            return ElementAttachingPointFacade.IsAttachingPoint(parentEntityToken, this.AttachingPoint);
        }


        public override void Log(string title, string indention = "")
        {
            LoggingService.LogVerbose(title, string.Format("{0}Named: Position = {1}, Id = {2}, EntityTokenType = {3}, EntityToken = {4}", indention, this.Position, this.AttachingPoint.Id, this.AttachingPoint.EntityTokenType, this.AttachingPoint.EntityToken));
        }
    }




    internal sealed class EntityTokenAttachmentPoint : BaseAttachmentPoint
    {
        public EntityToken EntityToken { get; set; }


        public override IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            yield return this.EntityToken;
        }


        public override bool IsAttachmentPoint(EntityToken parentEntityToken)
        {
            return ElementAttachingPointFacade.IsAttachingPoint(parentEntityToken, this.EntityToken);
        }


        public override void Log(string title, string indention = "")
        {
            LoggingService.LogVerbose(title, string.Format("{0}EntityToken: Position = {1}, EntityToken = {2}", indention, this.Position, this.EntityToken));
        }
    }    
}
