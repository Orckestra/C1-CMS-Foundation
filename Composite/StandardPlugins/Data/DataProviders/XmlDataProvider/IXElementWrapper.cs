using System.Xml.Linq;


namespace Composite.StandardPlugins.Data.DataProviders.XmlDataProvider
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IXElementWrapper
    {
        void CommitData(XElement element);
    }
}
