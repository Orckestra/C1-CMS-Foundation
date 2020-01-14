namespace Composite.Functions
{
    /// <summary>
    /// Allows defining whether function results should be cached during the donut caching.
    /// </summary>
    public interface IDynamicFunction : IFunction
    {
        /// <summary>
        /// Indicates whether the function output can be cached.
        /// </summary>
        bool PreventFunctionOutputCaching { get; }
    }
}