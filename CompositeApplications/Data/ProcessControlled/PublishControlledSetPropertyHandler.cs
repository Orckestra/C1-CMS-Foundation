using System;


namespace Composite.Data.ProcessControlled
{
    public sealed class PublishControlledSetPropertyHandler : ISetPropertyHandler
	{
        public void Handle(IData data, object value)
        {
            if ((data is IPublishControlled) == false) throw new ArgumentException("Must be of type IPublishControlled", "data");

            ProcessControllerFacade.ValidateTransition(data, (string)value);
        }
	}
}
