namespace Composite.Core.Caching
{
    internal enum CacheType
    {
        Undefined = 0,
        /// <summary>
        /// For "lightweight" objects
        /// </summary>
        Lightweight = 1, 
        /// <summary>
        /// Standard ASP .NET cache
        /// </summary>
        AspNet = 2,      
        /// <summary>
        /// For "heavy" objects - based on weak references + asp.net caching
        /// </summary>
        Mixed = 3,       
    }
}
