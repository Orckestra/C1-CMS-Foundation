using System.Xml;


namespace Composite.Forms.Flows
{
    public interface IFormMarkupProvider
    {
        XmlReader GetReader();
    }
}
