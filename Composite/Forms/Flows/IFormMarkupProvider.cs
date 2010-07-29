using System.Xml;


namespace Composite.Forms.Flows
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IFormMarkupProvider
    {
        XmlReader GetReader();
    }
}
