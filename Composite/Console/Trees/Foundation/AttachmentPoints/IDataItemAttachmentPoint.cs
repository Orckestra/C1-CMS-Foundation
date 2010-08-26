using System;


namespace Composite.C1Console.Trees.Foundation.AttachmentPoints
{
    /// <summary>    
    /// </summary>
    /// <exclude />
    [System.ComponentModel.EditorBrowsable(System.ComponentModel.EditorBrowsableState.Never)] 
    public interface IDataItemAttachmentPoint : IBaseAttachmentPoint
    {
        Type InterfaceType { get; set; }
    }
}
