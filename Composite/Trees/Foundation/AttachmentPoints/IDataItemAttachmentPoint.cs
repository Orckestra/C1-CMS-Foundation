using System;


namespace Composite.Trees.Foundation.AttachmentPoints
{
    internal interface IDataItemAttachmentPoint : IBaseAttachmentPoint
    {
        Type InterfaceType { get; set; }
    }
}
