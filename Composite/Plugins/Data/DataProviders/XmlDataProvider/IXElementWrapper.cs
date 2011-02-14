using System.Xml.Linq;


namespace Composite.Plugins.Data.DataProviders.XmlDataProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IXElementWrapper
    {
        /// <exclude />
        void CommitData(XElement element);
    }
}
