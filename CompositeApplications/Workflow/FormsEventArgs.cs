using System;
using System.Workflow.Activities;
using System.Collections.Generic;


namespace Composite.Workflow
{
    [Serializable]
    internal sealed class FormEventArgs : ExternalDataEventArgs
    {
        private string _workflowResult;

        [NonSerialized]
        private Dictionary<string, object> _bindings;

        public FormEventArgs(Guid instanceId, string workflowResult)
            : this(instanceId, workflowResult, null)
        {
        }


        public FormEventArgs(Guid instanceId, Dictionary<string, object> bindings)
            : this(instanceId, null, bindings)
        {
        }


        public FormEventArgs(Guid instanceId, string workflowResult, Dictionary<string, object> bindings)
            : base(instanceId)
        {
            _workflowResult = workflowResult;
            _bindings = bindings;
        }



        public string WorkflowResult
        {
            get { return _workflowResult; }
            set { _workflowResult = value; }
        }


        
        public Dictionary<string, object> Bindings
        {
            get { return _bindings; }
            set { _bindings = value; }
        }
    }
}
