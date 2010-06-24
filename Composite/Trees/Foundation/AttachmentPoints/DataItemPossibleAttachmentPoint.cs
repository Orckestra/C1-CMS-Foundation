using System;
using Composite.Data;
using Composite.Logging;
using Composite.Security;


namespace Composite.Trees.Foundation.AttachmentPoints
{
    internal sealed class DataItemPossibleAttachmentPoint : BasePossibleAttachmentPoint, IDataItemAttachmentPoint
    {
        public Type InterfaceType { get; set; }


        public override bool IsPossibleAttachmentPoint(EntityToken parentEntityToken)
        {
            DataEntityToken dataEntityToken = parentEntityToken as DataEntityToken;
            if (dataEntityToken == null) return false;

            if (dataEntityToken.InterfaceType != this.InterfaceType) return false;

            return true;
        }


        public override void Log(string title, string indention = "")
        {
            LoggingService.LogVerbose(title, string.Format("{0}DataType: Position = {1}, InterfaceType = {2}", indention, this.Position, this.InterfaceType));
        }
    }
}
