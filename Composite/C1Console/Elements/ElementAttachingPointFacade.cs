using Composite.C1Console.Security;
using Composite.Plugins.Elements.ElementProviders.VirtualElementProvider;


namespace Composite.C1Console.Elements
{
    /// <exclude />
    public static class ElementAttachingPointFacade
    {
        /// <exclude />
        public static bool IsAttachingPoint(EntityToken entityToken, AttachingPoint attachingPoint)
        {
            return attachingPoint.Id == entityToken.Id
                   && attachingPoint.Source == entityToken.Source
                   && attachingPoint.EntityTokenType == entityToken.GetType();

        }



        /// <exclude />
        public static bool IsAttachingPoint(EntityToken leftEntityToken, EntityToken rightEntityToken)
        {
            return leftEntityToken.GetType() == rightEntityToken.GetType()
                   && leftEntityToken.Id == rightEntityToken.Id
                   && leftEntityToken.Type == rightEntityToken.Type
                   && leftEntityToken.Source == rightEntityToken.Source;
        }



        /// <exclude />
        public static AttachingPoint GetAttachingPoint(EntityToken entityToken)
        {
            if (entityToken is VirtualElementProviderEntityToken)
            {
                return AttachingPoint.VirtualElementAttachingPoint(entityToken.Id, entityToken.Source);
            }

            if (IsAttachingPoint(entityToken, AttachingPoint.ContentPerspectiveWebsiteItems))
            {
                return AttachingPoint.ContentPerspectiveWebsiteItems;
            }

            return null;
        }
    }
}
