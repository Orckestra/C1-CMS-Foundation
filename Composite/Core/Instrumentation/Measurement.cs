using System;
using System.Collections.Generic;
using Composite.C1Console.Security;


namespace Composite.Core.Instrumentation
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class Measurement
    {
        private List<Measurement> _nodes;
        private List<Measurement> _parallelNodes;

        /// <exclude />
        public Measurement(string name)
        {
            Name = name;
        }

        /// <summary>
        /// Total execution time in microseconds (10^-6)
        /// </summary>
        public long TotalTime;

        /// <exclude />
        public long MemoryUsage;

        /// <exclude />
        public string Name { get; set; }

        /// <exclude />
        public Func<EntityToken> EntityTokenFactory  { get; set; }

        /// <exclude />
        public List<Measurement> Nodes 
        { 
            get
            {
                if(_nodes == null)
                {
                    _nodes = new List<Measurement>();
                }

                return _nodes;
            }
        }

        /// <exclude />
        public object SyncRoot { get { return this; } }

        /// <exclude />
        public List<Measurement> ParallelNodes
        {
            get
            {
                if (_parallelNodes == null)
                {
                    _parallelNodes = new List<Measurement>();
                }

                return _parallelNodes;
            }
        }
    }
}