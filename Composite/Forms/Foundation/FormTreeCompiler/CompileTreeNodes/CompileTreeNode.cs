using System.Collections.Generic;


namespace Composite.Forms.Foundation.FormTreeCompiler.CompileTreeNodes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public class CompileTreeNode
    {
        private static int _compilerIdCounter = 0;
        private int _compilerId;
        private XmlSourceNodeInformation _xmlSourceNodeInformation;
        private List<ElementCompileTreeNode> _childNodes = new List<ElementCompileTreeNode>();
        private List<PropertyCompileTreeNode> _defaultProperties = new List<PropertyCompileTreeNode>();
        private Dictionary<string, List<PropertyCompileTreeNode>> _namedProperties = new Dictionary<string, List<PropertyCompileTreeNode>>();

        public CompileTreeNode(XmlSourceNodeInformation xmlSourceNodeInformation)
        {
            _compilerId = _compilerIdCounter++;

            _xmlSourceNodeInformation = xmlSourceNodeInformation;
        }

        public XmlSourceNodeInformation XmlSourceNodeInformation
        {
            get { return _xmlSourceNodeInformation; }
        }

        public List<ElementCompileTreeNode> Children
        {
            get { return _childNodes; }
        }

        public List<PropertyCompileTreeNode> DefaultProperties
        {
            get { return _defaultProperties; }
        }

        public Dictionary<string, List<PropertyCompileTreeNode>> NamedProperties
        {
            get { return _namedProperties; }
        }

        public void AddNamedProperty(PropertyCompileTreeNode property)
        {
            AddNamedProperty(property.Name, property);
        }

        public void AddNamedProperty(string name, PropertyCompileTreeNode property)
        {
            if (false == _namedProperties.ContainsKey(name))
            {
                _namedProperties.Add(name, new List<PropertyCompileTreeNode>());
            }

            _namedProperties[name].Add(property);
        }

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

        public int CompilerId
        {
            get { return _compilerId; }
        }

        public override int GetHashCode()
        {
            return _compilerId;
        }

        public override bool Equals(object obj)
        {
            if (null == obj) return false;

            CompileTreeNode node = obj as CompileTreeNode;
            if (null == node) return false;

            return node._compilerId == _compilerId;
        }

        public bool Equals(CompileTreeNode node)
        {
            if (null == node) return false;

            return node._compilerId == _compilerId;
        }
    }

}
