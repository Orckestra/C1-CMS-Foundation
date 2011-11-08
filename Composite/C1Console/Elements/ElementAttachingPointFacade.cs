using Composite.C1Console.Security;


namespace Composite.C1Console.Elements
{
    /// <exclude />
    public static class ElementAttachingPointFacade
    {
        /// <exclude />
        public static bool IsAttachingPoint(EntityToken entityToken, AttachingPoint attachingPoint)
        {
            if (attachingPoint.EntityTokenType != entityToken.GetType()) return false;
            if (attachingPoint.Id != entityToken.Id) return false;
            if (attachingPoint.Source != entityToken.Source) return false;

            return true;
        }



        /// <exclude />
        public static bool IsAttachingPoint(EntityToken leftEntityToken, EntityToken rightEntityToken)
        {
            if (leftEntityToken.GetType() != rightEntityToken.GetType()) return false;
            if (leftEntityToken.Id != rightEntityToken.Id) return false;
            if (leftEntityToken.Type != rightEntityToken.Type) return false;
            if (leftEntityToken.Source != rightEntityToken.Source) return false;

            return true;
        }



        /// <exclude />
        public static AttachingPoint GetAttachingPoint(EntityToken entityToken)
        {
            if (IsAttachingPoint(entityToken, AttachingPoint.PerspectivesRoot) == true) return AttachingPoint.PerspectivesRoot;
            if (IsAttachingPoint(entityToken, AttachingPoint.ContentPerspective) == true) return AttachingPoint.ContentPerspective;
            if (IsAttachingPoint(entityToken, AttachingPoint.DataPerspective) == true) return AttachingPoint.DataPerspective;
            if (IsAttachingPoint(entityToken, AttachingPoint.DesignPerspective) == true) return AttachingPoint.DesignPerspective;
            if (IsAttachingPoint(entityToken, AttachingPoint.FunctionPerspective) == true) return AttachingPoint.FunctionPerspective;
            if (IsAttachingPoint(entityToken, AttachingPoint.MediaPerspective) == true) return AttachingPoint.MediaPerspective;
            if (IsAttachingPoint(entityToken, AttachingPoint.SystemPerspective) == true) return AttachingPoint.SystemPerspective;
            if (IsAttachingPoint(entityToken, AttachingPoint.UserPerspective) == true) return AttachingPoint.UserPerspective;

            return null;
        }
    }
}
