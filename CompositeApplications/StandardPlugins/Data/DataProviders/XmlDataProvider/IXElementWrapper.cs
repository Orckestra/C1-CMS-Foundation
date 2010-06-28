using System.Xml.Linq;


namespace Composite.StandardPlugins.Data.DataProviders.XmlDataProvider
{
    internal interface IXElementWrapper
    {
        void CommitData(XElement element);
    }
}
