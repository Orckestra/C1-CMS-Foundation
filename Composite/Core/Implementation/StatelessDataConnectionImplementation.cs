using System.Collections.Generic;
using System.Globalization;
using Composite.Data;

namespace Composite.Core.Implementation
{
    /// <summary>
    /// Base class for the implementation of the static methods on the <see cref="DataConnection "/> class.
    /// </summary>
    public class StatelessDataConnectionImplementation
    {
        /// <summary>
        /// Creates a new data object of the given type.
        /// </summary>
        /// <typeparam name="TData">The data type.</typeparam>
        /// <returns></returns>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Naming", "CA1716:IdentifiersShouldNotMatchKeywords", MessageId = "New", Justification = "This is what we want")]
        public virtual TData New<TData>()
            where TData : class, IData
        {
            return DataFacade.BuildNew<TData>();
        }


        /// <summary>
        /// All locales added to C1.
        /// </summary>
        public virtual IEnumerable<CultureInfo> AllLocales => 
            DataLocalizationFacade.ActiveLocalizationCultures;
    }
}
