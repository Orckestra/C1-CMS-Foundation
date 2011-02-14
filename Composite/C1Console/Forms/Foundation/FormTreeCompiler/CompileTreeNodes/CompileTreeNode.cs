using System.Collections.Generic;
using System.Diagnostics;


namespace Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompileTreeNodes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    [DebuggerDisplay("Name {_xmlSourceNodeInformation.Name}")]
    public class CompileTreeNode
    {
        private static int _compilerIdCounter = 0;
        private int _compilerId;
        private XmlSourceNodeInformation _xmlSourceNodeInformation;
        private List<ElementCompileTreeNode> _childNodes = new List<ElementCompileTreeNode>();
        private List<PropertyCompileTreeNode> _defaultProperties = new List<PropertyCompileTreeNode>();
        private Dictionary<string, List<PropertyCompileTreeNode>> _namedProperties = new Dictionary<string, List<PropertyCompileTreeNode>>();

        /// <exclude />
        public CompileTreeNode(XmlSourceNodeInformation xmlSourceNodeInformation)
        {
            _compilerId = _compilerIdCounter++;

            _xmlSourceNodeInformation = xmlSourceNodeInformation;
        }


        /// <exclude />
        public XmlSourceNodeInformation XmlSourceNodeInformation
        {
            get { return _xmlSourceNodeInformation; }
        }


        /// <exclude />
        public List<ElementCompileTreeNode> Children
        {
            get { return _childNodes; }
        }


        /// <exclude />
        public List<PropertyCompileTreeNode> DefaultProperties
        {
            get { return _defaultProperties; }
        }


        /// <exclude />
        public Dictionary<string, List<PropertyCompileTreeNode>> NamedProperties
        {
            get { return _namedProperties; }
        }


        /// <exclude />
        public void AddNamedProperty(PropertyCompileTreeNode property)
        {
            AddNamedProperty(property.Name, property);
        }


        /// <exclude />
        public void AddNamedProperty(string name, PropertyCompileTreeNode property)
        {
            if (false == _namedProperties.ContainsKey(name))
            {
                _namedProperties.Add(name, new List<PropertyCompileTreeNode>());
            }

            _namedProperties[name].Add(property);
        }


        /// <exclude />
        public IEnumerable<PropertyCompileTreeNode> AllNamedProperties
        {
            get
            {
                foreach (List<PropertyCompileTreeNode> namedProperties in NamedProperties.Values)
                {
                    foreach (PropertyCompileTreeNode namedProperty in namedProperties) yield return namedProperty;
                }
            }
        }


        /// <exclude />
        public IEnumerable<CompileTreeNode> AllSubNodes
        {
            get
            {
                foreach (CompileTreeNode child in Children) yield return child;

                foreach (List<PropertyCompileTreeNode> namedProperties in NamedProperties.Values)
                {
                    foreach (CompileTreeNode namedProperty in namedProperties) yield return namedProperty;
                }

                foreach (CompileTreeNode defaultProperty in DefaultProperties) yield return defaultProperty;
            }
        }


        /// <exclude />
        public int CompilerId
        {
            get { return _compilerId; }
        }


        /// <exclude />
        public override int GetHashCode()
        {
            return _compilerId;
        }


        /// <exclude />
        public override bool Equals(object obj)
        {
            if (null == obj) return false;

            CompileTreeNode node = obj as CompileTreeNode;
            if (null == node) return false;

            return node._compilerId == _compilerId;
        }


        /// <exclude />
        public bool Equals(CompileTreeNode node)
        {
            if (null == node) return false;

            return node._compilerId == _compilerId;
        }
    }

}
