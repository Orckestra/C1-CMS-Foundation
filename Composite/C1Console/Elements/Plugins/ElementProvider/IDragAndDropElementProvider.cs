using Composite.C1Console.Actions;
using Composite.C1Console.Security;


namespace Composite.C1Console.Elements.Plugins.ElementProvider
{
    /// <summary>
    /// You can implement this interface on your element provider to handle the "drag and drop" event.
    /// </summary>
    public interface IDragAndDropElementProvider : IHooklessElementProvider
    {
        /// <summary>
        /// Invoked when an element is dropped
        /// </summary>
        /// <param name="draggedEntityToken">The <see cref="EntityToken"/> of the element being dragged</param>
        /// <param name="newParentEntityToken">The <see cref="EntityToken"/> of the element receiving the dragged item</param>
        /// <param name="dropIndex">The index (position) the element was dropped</param>
        /// <param name="dragAndDropType">The type identifying the drang and drop action</param>
        /// <param name="draggedElementFlowControllerServicesContainer">handle that let you communicate to client via services (like popping a dialog)</param>
        /// <returns>True is action completed as expected and tree should be updated on the client</returns>
        bool OnElementDraggedAndDropped(EntityToken draggedEntityToken, EntityToken newParentEntityToken, int dropIndex, DragAndDropType dragAndDropType, FlowControllerServicesContainer draggedElementFlowControllerServicesContainer);
    }


    /// <summary>
    /// Specifies the kind of action that should happen on drop
    /// </summary>
    public enum DragAndDropType
    {
        /// <summary>
        /// The element is moved
        /// </summary>
        Move,
        /// <summary>
        /// The element is copied
        /// </summary>
        Copy
    }
}
