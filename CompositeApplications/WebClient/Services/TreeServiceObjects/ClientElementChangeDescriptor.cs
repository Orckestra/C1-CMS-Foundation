using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;

/// <summary>
/// Describes a set of changed elements by listing their ElementHandles
/// The latest sequence change number is returned as well.
/// </summary>
namespace Composite.WebClient.Services.TreeServiceObjects
{
    public class ClientElementChangeDescriptor
    {
        public ClientElementChangeDescriptor()
        {
            this.ElementHandles = new List<string>();
        }

        /// <summary>
        /// The client should use the "current sequence number" the next time it queries for changes
        /// </summary>
        public int CurrentSequenceNumber { get; set; }
        public List<string> ElementHandles { get; set; }
    }
}
