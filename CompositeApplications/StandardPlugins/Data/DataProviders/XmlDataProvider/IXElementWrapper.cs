using System.Xml.Linq;


namespace Composite.StandardPlugins.Data.DataProviders.XmlDataProvider
{
    public interface IXElementWrapper
    {
        void CommitData(XElement element);
    }
}
