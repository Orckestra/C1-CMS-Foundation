using System.Collections.Generic;
using Composite.C1Console.Elements.Plugins.ElementAttachingProvider;
using Composite.Core.Logging;
using Composite.C1Console.Security;


namespace Composite.C1Console.Trees.Foundation.AttachmentPoints
{
    internal sealed class CustomAttadchmentPoint : BaseAttachmentPoint
    {
        private EntityToken _parentEntityToken;


        public CustomAttadchmentPoint(EntityToken parentEntityToken)
        {
            _parentEntityToken = parentEntityToken;
            this.Position = ElementAttachingProviderPosition.Top;
        }


        public CustomAttadchmentPoint(EntityToken parentEntityToken, ElementAttachingProviderPosition position)
            :this(parentEntityToken)
        {
            this.Position = position;
        }


        public override bool IsAttachmentPoint(EntityToken parentEntityToken)
        {
            return parentEntityToken.Equals(_parentEntityToken);
        }



        public override IEnumerable<EntityToken> GetEntityTokens(EntityToken childEntityToken, TreeNodeDynamicContext dynamicContext)
        {
            yield return _parentEntityToken;
        }



        public override void Log(string title, string indention = "")
        {
            LoggingService.LogVerbose(title, string.Format("{0}Custom: Position = {1}, EntityTokenType = {2}, EntityToken = {1}", indention, this.Position, _parentEntityToken.GetType(), _parentEntityToken));
        }
    }
}
