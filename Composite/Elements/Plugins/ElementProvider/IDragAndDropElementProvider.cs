using Composite.Actions;
using Composite.Security;


namespace Composite.Elements.Plugins.ElementProvider
{
    internal interface IDragAndDropElementProvider : IHooklessElementProvider
    {
        bool OnElementDraggedAndDropped(EntityToken draggedEntityToken, EntityToken newParentEntityToken, int dropIndex, DragAndDropType dragAndDropType, FlowControllerServicesContainer draggedElementFlowControllerServicesContainer);
    }



    internal enum DragAndDropType
    {
        Move,
        Copy
    }
}
