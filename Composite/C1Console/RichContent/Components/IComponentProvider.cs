using System.Collections.Generic;

namespace Composite.C1Console.RichContent.Components
{
    /// <summary>
    /// Component provider interface
    /// </summary>
    public interface IComponentProvider
    {
        /// <summary>
        /// Unique id for this provider. Use this id to signal Component changes via <see cref="ComponentChangeNotifier"/>.
        /// </summary>
        string ProviderId { get; }

        /// <summary>
        /// Return Component items known by the implemented provider. 
        /// The ComponentManager will only call this once and then cache components for the duration of the process lifetime.
        /// If your list of components change, use the <see cref="ComponentChangeNotifier"/> service and signal changes 
        /// via <see cref="ComponentChangeNotifier.ProviderChange(string)"/>.
        /// </summary>
        /// <returns>One or more Component insances</returns>
        IEnumerable<Component> GetComponents();
    }
}
