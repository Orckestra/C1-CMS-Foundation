using System;
using System.Workflow.Activities;
using System.Collections.Generic;


namespace Composite.C1Console.Workflow
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [Serializable]
    public sealed class FormEventArgs : ExternalDataEventArgs
    {
        private string _workflowResult;

        [NonSerialized]
        private Dictionary<string, object> _bindings;

        /// <exclude />
        public FormEventArgs(Guid instanceId, string workflowResult)
            : this(instanceId, workflowResult, null)
        {
        }


        /// <exclude />
        public FormEventArgs(Guid instanceId, Dictionary<string, object> bindings)
            : this(instanceId, null, bindings)
        {
        }


        /// <exclude />
        public FormEventArgs(Guid instanceId, string workflowResult, Dictionary<string, object> bindings)
            : base(instanceId)
        {
            _workflowResult = workflowResult;
            _bindings = bindings;
        }


        /// <exclude />
        public string WorkflowResult
        {
            get { return _workflowResult; }
            set { _workflowResult = value; }
        }



        /// <exclude />
        public Dictionary<string, object> Bindings
        {
            get { return _bindings; }
            set { _bindings = value; }
        }
    }
}
