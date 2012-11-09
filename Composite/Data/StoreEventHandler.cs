

namespace Composite.Data
{
    /// <summary>    
    /// The event handle type for data store change events. These events may be both internally and externally provoked.
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="storeEventArgs"></param>    
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1003:UseGenericEventHandlerInstances", Justification = "We keep handler in line tiwh DataEventHandler")]
    public delegate void StoreEventHandler(object sender, StoreEventArgs storeEventArgs);
}
