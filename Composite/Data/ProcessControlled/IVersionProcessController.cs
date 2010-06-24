using System;

namespace Composite.Data.ProcessControlled
{
    [Obsolete("To be removed")]
	public interface IVersionProcessController : IProcessController
	{
        void OnBeforeDataAdded(IData data);
        void OnBeforeDataUpdated(IData data);
	}
}
