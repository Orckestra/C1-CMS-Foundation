using System.Threading.Tasks;

namespace Composite.AspNet.Razor
{
    /// <summary>
    /// A base class for c1 functions based on razor, that supports async/await code.
    /// </summary>
    public abstract class AsyncRazorFunction : RazorFunction
    {
        /// <summary>
        /// An abstract function that is executed after the function parameters are set and before the function's body is executed.
        /// </summary>
        /// <returns>An awaitable task</returns>
        public virtual Task InitializeAsync() { return Task.CompletedTask; }
    }
}
