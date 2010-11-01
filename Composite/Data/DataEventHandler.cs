

namespace Composite.Data
{
    /// <summary>    
    /// The event handle type for several storage events.
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="dataEventArgs"></param>    
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1003:UseGenericEventHandlerInstances", Justification = "We had to be backwards compatible")]
    public delegate void DataEventHandler(object sender, DataEventArgs dataEventArgs);
}
