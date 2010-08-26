using Composite.C1Console.Actions;
using Composite.C1Console.Security;


namespace Composite.C1Console.Elements.Plugins.ElementProvider
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
