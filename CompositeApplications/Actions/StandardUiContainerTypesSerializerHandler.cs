using System;
using Composite.Serialization;


namespace Composite.Actions
{
    internal sealed class StandardUiContainerTypesSerializerHandler : ISerializerHandler
    {
        public string Serialize(object objectToSerialize)
        {
            IFlowUiContainerType flowUiContainerType = (IFlowUiContainerType)objectToSerialize;

            if ((flowUiContainerType.ContainerName != "Document") &&
                (flowUiContainerType.ContainerName != "Wizard") &&
                (flowUiContainerType.ContainerName != "DataDialog") &&
                (flowUiContainerType.ContainerName != "ConfirmDialog") &&
                (flowUiContainerType.ContainerName != "Null"))
            {
                throw new NotSupportedException();
            }


            return flowUiContainerType.ContainerName;
        }

        public object Deserialize(string serializedObject)
        {
            switch (serializedObject)
            {
                case "Document": return StandardUiContainerTypes.Document;
                case "Wizard": return StandardUiContainerTypes.Wizard;
                case "DataDialog": return StandardUiContainerTypes.DataDialog;
                case "ConfirmDialog": return StandardUiContainerTypes.ConfirmDialog;
                case "Null": return StandardUiContainerTypes.Null;
                default: throw new NotSupportedException();
            }
        }
    }
}
