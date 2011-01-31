using System.Collections.Generic;


namespace Composite.Core.Profiling
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class Measurement
    {
        private List<Measurement> _nodes;
        private List<Measurement> _parallelNodes;

        public Measurement(string name)
        {
            Name = name;
        }

        /// <summary>
        /// Total execution time in microseconds (10^-6)
        /// </summary>
        public long TotalTime;

        public string Name { get; set; }
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

        public object SyncRoot { get { return this; } }

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