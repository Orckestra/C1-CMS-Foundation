using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Composite.Data
{
    /// <summary>
    /// Define the scope of data in relation to publication status. Data which support publication should always be maintained 
    /// in the “Unpublihed” scope, while reading data on the public website should always be done in the “Published” scope. 
    /// Correct setting of the PublicationScope is typically handled by C1 CMS and should in general not be changed by developers. 
    /// Setting an explicit PublicationScope is typically only needed on new service end-points or 
    /// if specific features relating to data updating / publication is desired.
    /// See <see cref="Composite.Data.DataConnection"/>    
    /// </summary>
    ///// <seealso cref="Composite.Data.PageDataConnection"/>
    public enum PublicationScope
    {
        /// <summary>
        /// Only show data that has been published.
        /// </summary>
        Published = 1,

        /// <summary>
        /// Show / update unpublished data.
        /// </summary>
        Unpublished = 0
    }
}
