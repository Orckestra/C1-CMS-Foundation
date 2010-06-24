using Composite.Actions;
using Composite.Security;


namespace Composite.Elements.Plugins.ElementProvider
{
    public interface IDragAndDropElementProvider : IHooklessElementProvider
    {
        bool OnElementDraggedAndDropped(EntityToken draggedEntityToken, EntityToken newParentEntityToken, int dropIndex, DragAndDropType dragAndDropType, FlowControllerServicesContainer draggedElementFlowControllerServicesContainer);
    }



    public enum DragAndDropType
    {
        Move,
        Copy
    }
}
