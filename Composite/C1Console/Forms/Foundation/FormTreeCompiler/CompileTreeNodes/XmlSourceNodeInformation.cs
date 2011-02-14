namespace Composite.C1Console.Forms.Foundation.FormTreeCompiler.CompileTreeNodes
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public sealed class XmlSourceNodeInformation
    {
        private int _depth;
        private string _name;
        private string _tagName;
        private string _namespaceURI;
        private string _xPath;

        /// <exclude />
        public XmlSourceNodeInformation(int depth, string name, string tagName, string namespaceURI)
        {
            _depth = depth;
            _name = name;
            _tagName = tagName;
            _namespaceURI = namespaceURI;
            _xPath = "";
        }

        /// <exclude />
        public int Depth
        {
            get { return _depth; }
        }

        /// <exclude />
        public string Name
        {
            get { return _name; }
        }

        /// <exclude />
        public string TagName
        {
            get { return _tagName; }
        }

        /// <exclude />
        public string NamespaceURI
        {
            get { return _namespaceURI; }
            set { _namespaceURI = value; }
        }

        /// <exclude />
        public string XPath
        {
            get { return _xPath; }
            set { _xPath = value; }
        }
    }
}
