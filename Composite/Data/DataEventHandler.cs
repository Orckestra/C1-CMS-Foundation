

namespace Composite.Data
{
    /// <summary>    
    /// The event handle type for detailed data change events which fire in-process. See also 
    /// </summary>
    /// <param name="sender"></param>
    /// <param name="dataEventArgs"></param>    
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Design", "CA1003:UseGenericEventHandlerInstances", Justification = "We had to be backwards compatible")]
    public delegate void DataEventHandler(object sender, DataEventArgs dataEventArgs);
}
