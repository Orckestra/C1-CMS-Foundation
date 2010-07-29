using Composite.Validation.ClientValidationRules;
using System.Collections.Generic;


namespace Composite.Forms.Foundation.FormTreeCompiler.CompileTreeNodes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class PropertyCompileTreeNode : CompileTreeNode
    {
        private string _name = "";
        private object _value = null;
        private string _inclosingProducerName = "";

        public PropertyCompileTreeNode(string name, XmlSourceNodeInformation sourceInformation)
            : base(sourceInformation)
        {
            _name = name;
        }

        public string Name
        {
            get { return _name; }
        }

        public object Value
        {
            get { return _value; }
            set { _value = value; }
        }

        public string InclosingProducerName
        {
            get { return _inclosingProducerName; }
            set { _inclosingProducerName = value; }
        }

        public List<ClientValidationRule> ClientValidationRules
        {
            get;
            set;
        }
    }
}
