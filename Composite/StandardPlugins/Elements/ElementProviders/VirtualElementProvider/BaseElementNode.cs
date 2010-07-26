using System.Collections.Generic;
using System.Diagnostics;


namespace Composite.StandardPlugins.Elements.ElementProviders.VirtualElementProvider
{
    [DebuggerDisplay("Id = {Id}, Label={Label}")]
    internal class BaseElementNode
    {   
        private List<BaseElementNode> _children = new List<BaseElementNode>();


        public string Id { get; set; }
        public string Label { get; set; }
        public string Tag { get; set; }
        public string OpenFolderIconName { get; set; }
        public string CloseFolderIconName { get; set; }
        
        public List<BaseElementNode> Children
        {
            get { return _children; }
        }
    }
}
