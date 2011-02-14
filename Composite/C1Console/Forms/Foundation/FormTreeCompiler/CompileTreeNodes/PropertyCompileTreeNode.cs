using Composite.Data.Validation.ClientValidationRules;
using System.Collections.Generic;


namespace Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompileTreeNodes
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

        /// <exclude />
        public PropertyCompileTreeNode(string name, XmlSourceNodeInformation sourceInformation)
            : base(sourceInformation)
        {
            _name = name;
        }


        /// <exclude />
        public string Name
        {
            get { return _name; }
        }


        /// <exclude />
        public object Value
        {
            get { return _value; }
            set { _value = value; }
        }


        /// <exclude />
        public string InclosingProducerName
        {
            get { return _inclosingProducerName; }
            set { _inclosingProducerName = value; }
        }


        /// <exclude />
        public List<ClientValidationRule> ClientValidationRules
        {
            get;
            set;
        }
    }
}
